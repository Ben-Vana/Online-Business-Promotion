import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useRef } from "react";
import useAutoLogin from "hooks/useAutoLogin";

const LoginPage = () => {
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });

  const history = useHistory();
  const emailRef = useRef();
  const isLoggedIn = useSelector((state) => state.auth.logIn);
  const autoLoginFunc = useAutoLogin();

  const handleUserInputChange = (ev) => {
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
        console.log(err);
      });
  };

  return (
    <form className="mt-4" onSubmit={handleSubmit}>
      <h2>Login page</h2>

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
      </div>
      <button className="btn btn-primary">Login</button>
    </form>
  );
};

export default LoginPage;
