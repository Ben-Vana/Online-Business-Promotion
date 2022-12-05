import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import ReactTooltip from "react-tooltip";
import "pages/RegisterForm.css";

const RegisterForm = ({
  name,
  email,
  password,
  handleSubmit,
  handleUserInputChange,
  nameMsg,
  emailMsg,
  passwordMsg,
  isBusiness,
}) => {
  return (
    <>
      <h3 style={{ height: "3%" }} className="mt-5">
        {isBusiness ? "Add Your Business Today!" : "Register"}
      </h3>

      <form className="mt-4 form-grid" onSubmit={handleSubmit}>
        <div
          style={{ gridRow: 1 }}
          className="input-container form-floating my-3 d-flex"
        >
          <input
            type="text"
            className={`form-control input-new ${nameMsg ? "is-invalid" : ""}`}
            style={{ background: "none" }}
            id="name"
            placeholder="Name"
            value={name}
            onChange={handleUserInputChange}
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
            globalEventOff="touchend"
            delayShow={100}
            scrollHide={false}
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
            data-event="mouseenter click"
            data-event-off="mouseleave"
            icon={faCircleInfo}
          />
        </div>
        {nameMsg && (
          <div style={{ gridRow: 1 }} className="err-grid">
            Invalid Name
          </div>
        )}
        <div
          style={{ gridRow: 2 }}
          className="input-container form-floating my-3"
        >
          <input
            type="email"
            className={`form-control input-new ${emailMsg ? "is-invalid" : ""}`}
            style={{ background: "none" }}
            id="email"
            placeholder="name@example.com"
            value={email}
            onChange={handleUserInputChange}
          />
          <label htmlFor="email">
            {isBusiness ? "Business Email" : "Email Address"}
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
        {emailMsg ? (
          <div style={{ gridRow: 2 }} className="err-grid">
            Invalid Email
          </div>
        ) : (
          ""
        )}
        <div
          style={{ gridRow: 3 }}
          className="input-container form-floating my-3 d-flex"
        >
          <input
            type="password"
            className={`form-control input-new ${
              passwordMsg ? "is-invalid" : ""
            }`}
            style={{ background: "none" }}
            id="password"
            placeholder="Password"
            value={password}
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
            effect="solid"
            type="dark"
            delayShow={100}
            globalEventOff="touchend"
            scrollHide={false}
          >
            Password must have 8+ characters,
            <br /> at least 1 number, and at least 1 letter.
          </ReactTooltip>
          <FontAwesomeIcon
            style={{
              fontSize: 20,
              marginLeft: -30,
              marginBlock: "auto",
            }}
            data-for="passwordInfo"
            data-tip
            data-event="mouseenter click"
            data-event-off="mouseleave"
            icon={faCircleInfo}
          />
        </div>
        {passwordMsg ? (
          <div style={{ gridRow: 3 }} className="err-grid">
            Invalid Password
          </div>
        ) : (
          ""
        )}
        <button className="btn btn-style btn-primary">Register</button>
      </form>
    </>
  );
};

export default RegisterForm;
