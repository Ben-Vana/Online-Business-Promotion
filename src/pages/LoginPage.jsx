import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import useAutoLogin from "hooks/useAutoLogin";

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
      <h2 className="mt-3">Login page</h2>
      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="name@example.com"
            value={userInput.email}
            onChange={handleUserInputChange}
            ref={emailRef}
          />
          <label htmlFor="email">Email address</label>
        </div>
        <div className="form-floating  mb-3">
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            value={userInput.password}
            onChange={handleUserInputChange}
          />
          <label htmlFor="password">Password</label>
          <div style={{ color: "red" }}>{loginErr}</div>
        </div>
        <button className="btn btn-primary">Sign in</button>
      </form>
    </>
  );
};

export default LoginPage;
