import { useState } from "react";
import axios from "axios";
import loginSchema from "../validation/register.validation";
import validate from "../validation/validation";

const RegisterPage = () => {
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    password: "",
    business: false,
  });

  const handleUserInputChange = (ev) => {
    let newInput = JSON.parse(JSON.stringify(userInput));
    if (userInput.hasOwnProperty(ev.target.id)) {
      newInput[ev.target.id] = ev.target.value;
      setUserInput(newInput);
    }
  };

  const handleBuz = (ev) => {
    let newBuz = JSON.parse(JSON.stringify(userInput));
    newBuz[ev.target.id] = ev.target.checked;
    setUserInput(newBuz);
  };

  const handleRegisterForm = () => {
    const error = validate(userInput, loginSchema);
    console.log(error);
    return;
    axios
      .post("/users/register", {
        name: userInput.name,
        email: userInput.email,
        password: userInput.password,
        biz: userInput.business,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  return (
    <div>
      <h2>Register page</h2>
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="name"
          placeholder="Name"
          value={userInput.name}
          onChange={handleUserInputChange}
        />
        <label htmlFor="name">Name</label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="name@example.com"
          value={userInput.email}
          onChange={handleUserInputChange}
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
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="business"
          onChange={handleBuz}
          checked={userInput.business}
        />
        <label className="form-check-label" htmlFor="business">
          Business Class
        </label>
      </div>
      <button className="btn btn-primary" onClick={handleRegisterForm}>
        Register
      </button>
    </div>
  );
};

export default RegisterPage;
