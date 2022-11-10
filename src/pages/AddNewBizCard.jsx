import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import validate from "validation/validation";
import cardSchema from "validation/card.validation";
import CardInput from "components/CardInput";
import "components/cardInput.css";

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
    errCalled: false,
  });

  const history = useHistory();

  const handleUserInput = (ev) => {
    if (errMsg.errCalled === true) {
      setErrMsg({
        titleErr: false,
        subTitleErr: false,
        descriptionErr: false,
        addressErr: false,
        phoneErr: false,
        urlErr: false,
        errCalled: false,
      });
    }
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
        errCalled: true,
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
    <div className="mt-4 edit-container">
      <CardInput
        pageTitle="Add New Business Card"
        title={userInput.title}
        subTitle={userInput.subTitle}
        description={userInput.description}
        address={userInput.address}
        phone={userInput.phone}
        url={userInput.url}
        handleUserInput={handleUserInput}
        handleSubmitBtn={handleSubmitBtn}
        titleErr={errMsg.titleErr}
        subTitleErr={errMsg.subTitleErr}
        descriptionErr={errMsg.descriptionErr}
        addressErr={errMsg.addressErr}
        phoneErr={errMsg.phoneErr}
        urlErr={errMsg.urlErr}
      />
    </div>
  );
};

export default AddBizCard;
