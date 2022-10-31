import { authActions } from "store/auth";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import LinkSort from "components/LinkSort";
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
    let isToken = localStorage.getItem("token");
    if (isToken) {
      axios
        .get("/users/userInfo")
        .then(({ data }) => {
          if (data) {
            setName(data.name);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
      <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <NavLink to={"/"} className="navbar-brand">
            Navbar
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
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
                <span
                  style={{ color: "#000" }}
                  className="nav-link fw-semibold"
                >
                  {loggedIn ? "Welcome " + name : "Welcome guest"}{" "}
                </span>
              </li>
            </ul>
            <ul className="navbar-nav mb-lg-0">
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
                      className="text-decoration-none nav-link"
                      role="button"
                      key={item.label + index}
                      isActive={(match) => match && match.isExact}
                      to={item.link}
                    >
                      {item.label}
                    </NavLink>
                  ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBarComponent;
