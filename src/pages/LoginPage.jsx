import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import useAutoLogin from "hooks/useAutoLogin";
import "./Login.css";

const LoginPage = () => {
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });

  const [loginErr, setLoginErr] = useState("");

  const history = useHistory();
  const emailRef = useRef();
  const isLoggedIn = useSelector((state) => state.auth.logIn);
  const autoLoginFunc = useAutoLogin();

  const handleUserInputChange = (ev) => {
    setLoginErr("");
    let newUserInput = JSON.parse(JSON.stringify(userInput));
    newUserInput[ev.target.id] = ev.target.value;
    setUserInput(newUserInput);
  };

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      history.push("/");
    }
  }, [isLoggedIn]);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    axios
      .post("/users/login", userInput)
      .then(({ data }) => {
        localStorage.setItem("token", data.token);
        autoLoginFunc(data.token);
        history.push("/");
      })
      .catch((err) => {
        if (err.response.data) {
          setLoginErr("Email or Password are incorrect");
        }
        if (err.message === `Network Error`) {
          setLoginErr("Sorry, Something went wrong try again later");
        }
      });
  };

  return (
    <>
      <div className="form-container mt-5">
        <h2 className="mt-5">Login page</h2>
        <form className="mt-4 w-50 form-grid" onSubmit={handleSubmit}>
          <div className="input-container form-floating mb-3">
            <input
              type="email"
              className="form-control input-new"
              id="email"
              placeholder="name@example.com"
              value={userInput.email}
              onChange={handleUserInputChange}
              ref={emailRef}
            />
            <label style={{ color: "#fff" }} htmlFor="email">
              Email address
            </label>
          </div>
          <div className="input-container form-floating mb-3">
            <input
              type="password"
              className="form-control input-new"
              id="password"
              placeholder="Password"
              value={userInput.password}
              onChange={handleUserInputChange}
            />
            <label style={{ color: "#fff" }} htmlFor="password">
              Password
            </label>
            <div style={{ color: "red" }}>{loginErr}</div>
          </div>
          <button className="btn btn-style btn-primary">Sign in</button>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
