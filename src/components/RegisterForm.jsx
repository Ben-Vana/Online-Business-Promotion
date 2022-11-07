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
      {isBusiness && <h3 className="mt-3">Add Your Business Today!</h3>}
      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="form-floating my-3 d-flex">
          <input
            type="text"
            className={`form-control input-new w-50 ${
              nameMsg ? "is-invalid" : ""
            }`}
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
        {nameMsg ? (
          <div style={{ color: "red", marginTop: -15, fontSize: 14 }}>
            Invalid Name
          </div>
        ) : (
          ""
        )}
        <div className="form-floating my-3 w-50">
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
          <div style={{ color: "red", marginTop: -15, fontSize: 14 }}>
            Invalid Email
          </div>
        ) : (
          ""
        )}
        <div className="form-floating my-3 d-flex w-50">
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
            place="top"
            effect="solid"
            type="dark"
            delayShow={100}
            clickable={true}
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
            icon={faCircleInfo}
          />
        </div>
        {passwordMsg ? (
          <div style={{ color: "red", marginTop: -15, fontSize: 14 }}>
            Invalid Password
          </div>
        ) : (
          ""
        )}
        <button className="btn btn-style btn-primary">Sign up</button>
      </form>
    </>
  );
};

export default RegisterForm;
