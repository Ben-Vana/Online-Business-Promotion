import { useEffect, useState, useRef } from "react";
import axios from "axios";
import RegisterSchema from "validation/register.validation";
import validate from "validation/validation";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import ReactTooltip from "react-tooltip";

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

  const formRef = useRef();
  const history = useHistory();

  useEffect(() => {
    formRef.current.focus();
  }, []);

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

  const handleBuz = (ev) => {
    let newBuz = JSON.parse(JSON.stringify(userInput));
    newBuz[ev.target.id] = ev.target.checked;
    setUserInput(newBuz);
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
      <h2>Register page</h2>
      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="form-floating my-3 d-flex">
          <input
            type="text"
            className={`form-control w-50 ${
              errMsg.nameMsg ? "is-invalid" : ""
            }`}
            style={{ background: "none" }}
            id="name"
            placeholder="Name"
            value={userInput.name}
            onChange={handleUserInputChange}
            ref={formRef}
            maxLength="256"
          />
          <label htmlFor="name">
            Name
            <span
              style={{
                color: "red",
                fontSize: 10,
                verticalAlign: "text-top",
                padding: 2,
              }}
            >
              *Required
            </span>
          </label>
          <ReactTooltip
            id="nameInfo"
            place="top"
            effect="solid"
            type="dark"
            delayShow={100}
            clickable={true}
          >
            Name should be at least 2 characters long,
            <br /> and must not contain numbers.
          </ReactTooltip>
          <FontAwesomeIcon
            style={{
              fontSize: 20,
              marginLeft: -30,
              marginBlock: "auto",
            }}
            data-for="nameInfo"
            data-tip
            icon={faCircleInfo}
          />
        </div>
        {errMsg.nameMsg ? (
          <div style={{ color: "red", marginTop: -15, fontSize: 14 }}>
            Name must be at least 2 characters long
          </div>
        ) : (
          ""
        )}
        <div className="form-floating my-3 w-50">
          <input
            type="email"
            className={`form-control ${errMsg.emailMsg ? "is-invalid" : ""}`}
            style={{ background: "none" }}
            id="email"
            placeholder="name@example.com"
            value={userInput.email}
            onChange={handleUserInputChange}
          />
          <label htmlFor="email">
            Email address
            <span
              style={{
                color: "red",
                fontSize: 10,
                verticalAlign: "text-top",
                padding: 2,
              }}
            >
              *Required
            </span>
          </label>
        </div>
        {errMsg.emailMsg ? (
          <div style={{ color: "red", marginTop: -15, fontSize: 14 }}>
            Invalid Email
          </div>
        ) : (
          ""
        )}
        <div className="form-floating my-3 d-flex w-50">
          <input
            type="password"
            className={`form-control ${errMsg.passwordMsg ? "is-invalid" : ""}`}
            style={{ background: "none" }}
            id="password"
            placeholder="Password"
            value={userInput.password}
            onChange={handleUserInputChange}
          />
          <label htmlFor="password">
            Password
            <span
              style={{
                color: "red",
                fontSize: 10,
                verticalAlign: "text-top",
                padding: 2,
              }}
            >
              *Required
            </span>
          </label>
          <ReactTooltip
            id="passwordInfo"
            place="top"
            effect="solid"
            type="dark"
            delayShow={100}
            clickable={true}
          >
            Password must have 8+ characters,
            <br /> at least 1 number, and at least one letter.
          </ReactTooltip>
          <FontAwesomeIcon
            style={{
              fontSize: 20,
              marginLeft: -30,
              marginBlock: "auto",
            }}
            data-for="passwordInfo"
            data-tip
            icon={faCircleInfo}
          />
        </div>
        {errMsg.passwordMsg ? (
          <div style={{ color: "red", marginTop: -15, fontSize: 14 }}>
            Password should be at least 8 characters long and must have letters
            and numbers
          </div>
        ) : (
          ""
        )}
        <div className="form-check my-2">
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
