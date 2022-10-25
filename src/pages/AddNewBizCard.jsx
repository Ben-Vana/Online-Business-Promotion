import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import validate from "validation/validation";
import cardSchema from "validation/card.validation";

const AddBizCard = () => {
  const [userInput, setUserInput] = useState({
    title: "",
    subTitle: "",
    description: "",
    address: "",
    phone: "",
    url: "",
  });

  const [errMsg, setErrMsg] = useState({
    titleErr: false,
    subTitleErr: false,
    descriptionErr: false,
    addressErr: false,
    phoneErr: false,
    urlErr: false,
  });

  const history = useHistory();

  const handleUserInput = (ev) => {
    setErrMsg({
      titleErr: false,
      subTitleErr: false,
      descriptionErr: false,
      addressErr: false,
      phoneErr: false,
      urlErr: false,
    });
    let newInput = JSON.parse(JSON.stringify(userInput));
    if (userInput.hasOwnProperty(ev.target.id)) {
      newInput[ev.target.id] = ev.target.value;
      setUserInput(newInput);
    }
  };

  const handleSubmitBtn = (ev) => {
    ev.preventDefault();
    const { error } = validate(
      {
        title: userInput.title,
        subTitle: userInput.subTitle,
        description: userInput.description,
        address: userInput.address,
        phone: userInput.phone,
        url: userInput.url,
      },
      cardSchema
    );
    if (error) {
      let titleMsg, subTitleMsg, descriptionMsg, addressMsg, phoneMsg, urlMsg;
      error.details.forEach((err) => {
        switch (err.path[0]) {
          case "title":
            titleMsg = true;
            break;
          case "subTitle":
            subTitleMsg = true;
            break;
          case "description":
            descriptionMsg = true;
            break;
          case "address":
            addressMsg = true;
            break;
          case "phone":
            phoneMsg = true;
            break;
          case "url":
            urlMsg = true;
            break;
          default:
            break;
        }
      });
      setErrMsg({
        titleErr: titleMsg,
        subTitleErr: subTitleMsg,
        descriptionErr: descriptionMsg,
        addressErr: addressMsg,
        phoneErr: phoneMsg,
        urlErr: urlMsg,
      });
    }
    if (!error) {
      let defaultUrl = userInput.url;
      if (userInput.url === "") {
        defaultUrl =
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
      }
      axios
        .post("/cards/", {
          title: userInput.title,
          subTitle: userInput.subTitle,
          description: userInput.description,
          address: userInput.address,
          phone: userInput.phone,
          url: `${defaultUrl}`,
          alt: userInput.title + " logo",
        })
        .then(() => {
          history.push("/mycards");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <h3 className="mt-4">Add New Business Card</h3>
      <form>
        <div className="form-floating mb-3 mt-2">
          <input
            onChange={handleUserInput}
            type="text"
            className="form-control"
            id="title"
            value={userInput.title}
          />
          <label htmlFor="title">
            Title
            <span
              style={{
                color: "red",
                fontSize: 12,
                verticalAlign: "text-top",
                padding: 2,
              }}
            >
              *Required
            </span>
          </label>
          <div style={{ color: "red", fontSize: 14 }}>
            {errMsg.titleErr
              ? "Title must contain between 2 and 256 letters or numbers"
              : ""}
          </div>
        </div>
        <div className="form-floating mb-3">
          <input
            onChange={handleUserInput}
            type="text"
            className="form-control"
            id="subTitle"
            value={userInput.subTitle}
          />
          <label htmlFor="subTitle">
            SubTitle
            <span
              style={{
                color: "red",
                fontSize: 12,
                verticalAlign: "text-top",
                padding: 2,
              }}
            >
              *Required
            </span>
          </label>
          <div style={{ color: "red", fontSize: 14 }}>
            {errMsg.subTitleErr
              ? "SubTitle must contain between 2 and 256 letters or numbers"
              : ""}
          </div>
        </div>
        <div className="form-floating mb-3">
          <input
            onChange={handleUserInput}
            type="text"
            className="form-control"
            id="description"
            value={userInput.description}
          />
          <label htmlFor="description">
            Description
            <span
              style={{
                color: "red",
                fontSize: 12,
                verticalAlign: "text-top",
                padding: 2,
              }}
            >
              *Required
            </span>
          </label>
          <div style={{ color: "red", fontSize: 14 }}>
            {errMsg.descriptionErr
              ? "Description must contain between 2 and 1024 letters or numbers"
              : ""}
          </div>
        </div>
        <div className="form-floating mb-3">
          <input
            onChange={handleUserInput}
            type="text"
            className="form-control"
            id="address"
            value={userInput.address}
          />
          <label htmlFor="address">
            Address
            <span
              style={{
                color: "red",
                fontSize: 12,
                verticalAlign: "text-top",
                padding: 2,
              }}
            >
              *Required
            </span>
          </label>
          <div style={{ color: "red", fontSize: 14 }}>
            {errMsg.addressErr
              ? "Address must contain between 2 and 256 letters or numbers"
              : ""}
          </div>
        </div>
        <div className="form-floating mb-2">
          <input
            onChange={handleUserInput}
            type="text"
            className="form-control"
            id="phone"
            value={userInput.phone}
          />
          <label htmlFor="phone">
            Phone Number
            <span
              style={{
                color: "red",
                fontSize: 12,
                verticalAlign: "text-top",
                padding: 2,
              }}
            >
              *Required
            </span>
          </label>
          <div style={{ color: "red", fontSize: 14 }}>
            {errMsg.phoneErr
              ? "Phone must contain only numbers and stay between 9 and 14 characters"
              : ""}
          </div>
        </div>
        <div className="form-floating mb-2">
          <input
            onChange={handleUserInput}
            type="text"
            className="form-control"
            id="url"
            value={userInput.url}
          />
          <label htmlFor="url">Business Image Address</label>
          <div style={{ color: "red", fontSize: 14 }}>
            {errMsg.urlErr
              ? "Image adress must contain between 2 and 1024 characters"
              : ""}
          </div>
        </div>
        <button
          onClick={handleSubmitBtn}
          type="submit"
          className="btn btn-primary mb-1"
        >
          Create Card
        </button>
      </form>
    </>
  );
};

export default AddBizCard;
