import { useEffect, useState, useRef } from "react";
import axios from "axios";
import RegisterSchema from "validation/register.validation";
import validate from "validation/validation";
import { useHistory } from "react-router-dom";

const RegisterPage = () => {
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    password: "",
    business: false,
  });
  const [errMsg, setErrMsg] = useState({
    nameMsg: "",
    emailMsg: "",
    passwordMsg: "",
  });

  const formRef = useRef();
  const history = useHistory();

  useEffect(() => {
    formRef.current.focus();
  }, []);

  const handleUserInputChange = (ev) => {
    setErrMsg("");
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

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const { error } = validate(userInput, RegisterSchema);
    if (error) {
      let nameErr = "";
      let emailErr = "";
      let passwordErr = "";
      error.details.forEach((err) => {
        if (err.path[0] === "name") {
          switch (err.message) {
            case `"Name" is not allowed to be empty`:
              nameErr += " *You must enter a name";
              break;
            case `"Name" length must be at least 2 characters long`:
              nameErr += " *Name must be at least 2 characters long";
              break;
            case `"Name" with value "${err.context.value}" fails to match the required pattern: /^[\\D]*$/`:
              nameErr += " *Name must not contain numbers";
              break;
            default:
              nameErr = "Something went wrong";
              break;
          }
        }
        if (err.path[0] === "email") {
          emailErr = "Invalid Email";
        }
        if (err.path[0] === "password") {
          switch (err.message) {
            case `"Password" is not allowed to be empty`:
              passwordErr += " *You must enter a password";
              break;
            case `"Password" length must be at least 8 characters long`:
              passwordErr += " *Password must be at least 8 characters long";
              break;
            case `"Password" with value "${err.context.value}" fails to match the required pattern: /^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]*$/`:
              passwordErr += " *Password must contain latters and numbers";
              break;
            default:
              passwordErr = "Something went wrong";
              break;
          }
        }
        setErrMsg({
          nameMsg: nameErr,
          emailMsg: emailErr,
          passwordMsg: passwordErr,
        });
      });
    }
    if (!error) {
      axios
        .post("/users/register", {
          name: userInput.name,
          email: userInput.email,
          password: userInput.password,
          biz: userInput.business,
        })
        .then(() => {
          history.push("/login");
        })
        .catch((err) => {
          if (err.response.data) {
            setErrMsg({
              nameMsg: "",
              emailMsg: "This email is already registered",
              passwordMsg: "",
            });
          }
          if (err.message === "Network Error") {
            setErrMsg({
              nameMsg: "",
              emailMsg: "",
              passwordMsg: "Network error",
            });
          }
        });
    }
  };

  return (
    <div className="mt-3">
      <h2>Register page</h2>
      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Name"
            value={userInput.name}
            onChange={handleUserInputChange}
            ref={formRef}
          />
          <label htmlFor="name">Name</label>
          <div style={{ color: "red" }}>
            {errMsg.nameMsg ? errMsg.nameMsg : ""}
          </div>
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
          <div style={{ color: "red" }}>
            {errMsg.emailMsg ? errMsg.emailMsg : ""}
          </div>
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
          <div style={{ color: "red" }}>
            {errMsg.passwordMsg ? errMsg.passwordMsg : ""}
          </div>
        </div>
        <div className="form-check mb-2">
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
        <button className="btn btn-primary">Sign up</button>
      </form>
    </div>
  );
};

export default RegisterPage;
