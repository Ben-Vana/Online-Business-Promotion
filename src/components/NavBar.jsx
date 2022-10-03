import { authActions } from "../store/auth";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import LinkSort from "./LinkSort";
import { NavLink, useHistory } from "react-router-dom";

let links = [
  {
    label: "Home",
    link: "/",
  },
  {
    label: "About Us",
    link: "/aboutus",
  },
  {
    label: "Cards",
    link: "/cardspage",
  },
];

let bizLinks = [
  {
    label: "My Cards",
    link: "/mycards/",
  },
  {
    label: "Create Card",
    link: "/createcard",
  },
];

let authLinks = {
  loggedIn: [
    {
      label: "Logout",
      link: "#",
    },
  ],
  loggedOut: [
    {
      label: "Register",
      link: "/register",
    },
    {
      label: "Login",
      link: "/login",
    },
  ],
};

const NavBarComponent = () => {
  let [name, setName] = useState("");
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.auth.logIn);
  const userData = useSelector((state) => state.auth.userData);
  const history = useHistory();

  useEffect(() => {
    axios
      .get("/users/userInfo")
      .then(({ data }) => {
        if (data) {
          dispatch(
            authActions.login(jwt_decode(localStorage.getItem("token")))
          );
          setName(data.name);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loggedIn]);

  const changeStyle = (ev) => {
    ev.target.style.color = "black";
  };

  const changeStyleBack = (ev) => {
    ev.target.style.color = "rgba(55,55,55,.5)";
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setName("");
    dispatch(authActions.logout());
    history.push("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <span className="navbar-brand" href="#">
            Navbar
          </span>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {links.map((item, index) => (
                <LinkSort
                  key={item.label + index}
                  label={item.label}
                  link={item.link}
                />
              ))}
              {userData.biz
                ? bizLinks.map((item, index) => (
                    <LinkSort
                      key={item.label + index}
                      label={item.label}
                      link={item.link}
                    />
                  ))
                : ""}
              <li className="nav-item">
                <span style={{ color: "#000" }} className="nav-link">
                  {loggedIn ? "Welcome " + name : "Welcome guest"}{" "}
                </span>
              </li>
            </ul>
            <form className="d-flex" role="search">
              {loggedIn
                ? authLinks.loggedIn.map((item, index) => (
                    <span
                      onClick={handleLogout}
                      role="button"
                      key={item.label + index}
                      style={{ color: "rgba(55,55,55,.7)" }}
                      onMouseEnter={changeStyle}
                      onMouseLeave={changeStyleBack}
                    >
                      {item.label}
                    </span>
                  ))
                : authLinks.loggedOut.map((item, index) => (
                    <NavLink
                      className="me-2 text-decoration-none text-reset"
                      role="button"
                      key={item.label + index}
                      to={item.link}
                    >
                      <span
                        style={{ color: "rgba(55,55,55,.7)" }}
                        onMouseEnter={changeStyle}
                        onMouseLeave={changeStyleBack}
                      >
                        {item.label}
                      </span>
                    </NavLink>
                  ))}
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBarComponent;
