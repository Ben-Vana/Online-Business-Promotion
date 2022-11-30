import { authActions } from "store/auth";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import LinkSort from "components/LinkSort";
import { NavLink, useHistory } from "react-router-dom";
import "components/navbar.css";

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
          history.push("/login");
        });
    }
  }, [loggedIn]);

  const changeStyle = (ev) => {
    if (ev.target.classList.value.includes("active")) {
      return;
    }
    ev.target.style.color = "#fff";
  };

  const changeStyleBack = (ev) => {
    if (ev.target.attributes.class.value.includes("active")) {
      return;
    }
    ev.target.style.color = "#fff6";
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setName("");
    dispatch(authActions.logout());
    history.push("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg nav-color">
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
          <div
            className="collapse navbar-collapse link-color"
            id="navbarSupportedContent"
          >
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
                  style={{ color: "#fff" }}
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
                      className="link-hover"
                      style={{ color: "#fff6" }}
                      onMouseEnter={changeStyle}
                      onMouseLeave={changeStyleBack}
                    >
                      {item.label}
                    </span>
                  ))
                : authLinks.loggedOut.map((item, index) => (
                    <NavLink
                      className="text-decoration-none nav-link link-hover"
                      role="button"
                      key={item.label + index}
                      to={item.link}
                      style={{ color: "#fff6" }}
                      activeStyle={{ color: "#fff" }}
                      onMouseEnter={changeStyle}
                      onMouseLeave={changeStyleBack}
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
