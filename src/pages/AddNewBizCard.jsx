import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const AddBizCard = () => {
  const [userInput, setUserInput] = useState({
    title: "",
    subTitle: "",
    description: "",
    address: "",
    phone: "",
  });

  const history = useHistory();

  const handleUserInput = (ev) => {
    let newInput = JSON.parse(JSON.stringify(userInput));
    if (userInput.hasOwnProperty(ev.target.id)) {
      newInput[ev.target.id] = ev.target.value;
      setUserInput(newInput);
    }
  };

  const handleSubmitBtn = (ev) => {
    ev.preventDefault();
    if (/\D/.test(userInput.phone)) {
      alert("Phone number must only contain numbers");
      return;
    }
    if (
      userInput.title === "" ||
      userInput.subTitle === "" ||
      userInput.description === "" ||
      userInput.address === "" ||
      userInput.phone === ""
    ) {
      alert("Please update the empty fields");
      return;
    }
    axios.post("/cards/", userInput).then(() => {
      history.push("/mycards");
    });
  };

  return (
    <>
      <h3 className="mt-4">Add New Card</h3>
      <form>
        <div className="form-floating mb-3 mt-2">
          <input
            onChange={handleUserInput}
            type="text"
            className="form-control"
            id="title"
            value={userInput.title}
          />
          <label htmlFor="title">Title:</label>
        </div>
        <div className="form-floating mb-3">
          <input
            onChange={handleUserInput}
            type="text"
            className="form-control"
            id="subTitle"
            value={userInput.subTitle}
          />
          <label htmlFor="subTitle">SubTitle:</label>
        </div>
        <div className="form-floating mb-3">
          <input
            onChange={handleUserInput}
            type="text"
            className="form-control"
            id="description"
            value={userInput.description}
          />
          <label htmlFor="description">description:</label>
        </div>
        <div className="form-floating mb-3">
          <input
            onChange={handleUserInput}
            type="text"
            className="form-control"
            id="address"
            value={userInput.address}
          />
          <label htmlFor="address">Address:</label>
        </div>
        <div className="form-floating mb-2">
          <input
            onChange={handleUserInput}
            type="text"
            className="form-control"
            id="phone"
            value={userInput.phone}
          />
          <label htmlFor="phone">Phone Number:</label>
        </div>
        <button
          onClick={handleSubmitBtn}
          type="submit"
          className="btn btn-primary mb-1"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default AddBizCard;
