import { useState, useRef } from "react";
import axios from "axios";
import RegisterSchema from "validation/register.validation";
import validate from "validation/validation";
import { useHistory } from "react-router-dom";
import RegisterForm from "components/RegisterForm";
import "./RegisterForm.css";
import { CSSTransition } from "react-transition-group";

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
    errCalled: false,
  });
  const [isBusiness, setBusiness] = useState(false);

  const history = useHistory();
  const nodeRef = useRef();

  const handleUserInputChange = (ev) => {
    if (errMsg.errCalled === true) {
      setErrMsg({
        nameMsg: "",
        emailMsg: "",
        passwordMsg: "",
        errCalled: false,
      });
    }
    let newInput = JSON.parse(JSON.stringify(userInput));
    if (userInput.hasOwnProperty(ev.target.id)) {
      newInput[ev.target.id] = ev.target.value;
      setUserInput(newInput);
    }
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const { error } = validate(userInput, RegisterSchema);
    if (error) {
      let nameErr, emailErr, passwordErr;
      error.details.forEach((err) => {
        switch (err.path[0]) {
          case "name":
            nameErr = true;
            break;
          case "email":
            emailErr = true;
            break;
          case "password":
            passwordErr = true;
            break;
          default:
            break;
        }
        setErrMsg({
          nameMsg: nameErr,
          emailMsg: emailErr,
          passwordMsg: passwordErr,
          errCalled: true,
        });
      });
    }
    if (!error) {
      axios
        .post("/users/register", {
          name: userInput.name,
          email: userInput.email,
          password: userInput.password,
          biz: isBusiness,
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
              errCalled: true,
            });
          }
          if (err.message === "Network Error") {
            setErrMsg({
              nameMsg: "",
              emailMsg: "",
              passwordMsg: "Network error",
              errCalled: true,
            });
          }
        });
    }
  };

  return (
    <div className="mt-3">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <span
            type="button"
            className={`nav-link ntab-style ${
              isBusiness ? "" : "active tab-style"
            }`}
            onClick={() => setBusiness(false)}
            aria-current="page"
          >
            Register
          </span>
        </li>
        <li className="nav-item">
          <span
            type="button"
            className={`nav-link ntab-style ${
              isBusiness ? "active tab-style" : ""
            }`}
            onClick={() => setBusiness(true)}
          >
            Register for business
          </span>
        </li>
      </ul>
      <CSSTransition
        nodeRef={nodeRef}
        timeout={550}
        classNames="node"
        in={isBusiness}
      >
        <div ref={nodeRef}>
          <RegisterForm
            name={userInput.name}
            email={userInput.email}
            password={userInput.password}
            handleSubmit={handleSubmit}
            handleUserInputChange={handleUserInputChange}
            nameMsg={errMsg.nameMsg}
            emailMsg={errMsg.emailMsg}
            passwordMsg={errMsg.passwordMsg}
            isBusiness={isBusiness}
          />
        </div>
      </CSSTransition>
    </div>
  );
};

export default RegisterPage;
