import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CardInput from "components/CardInput";
import validate from "validation/validation";
import cardSchema from "validation/card.validation";

const EditCard = () => {
  const [userInput, setInput] = useState({
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

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    (async () => {
      try {
        let { data } = await axios.get(`/cards/card/${id}`);
        setInput({
          title: data.title,
          subTitle: data.subTitle,
          description: data.description,
          address: data.address,
          phone: data.phone,
          url: data.image.url,
        });
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const handleInputChange = (ev) => {
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
    let tempUserInput = JSON.parse(JSON.stringify(userInput));
    tempUserInput[ev.target.id] = ev.target.value;
    setInput(tempUserInput);
  };

  const handleSubmitBtn = async (ev) => {
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
      try {
        let { data } = await axios.put(`/cards/${id}`, {
          title: userInput.title,
          subTitle: userInput.subTitle,
          description: userInput.description,
          address: userInput.address,
          phone: userInput.phone,
          url: `${defaultUrl}`,
          alt: userInput.title + " logo",
        });
        if (data) {
          history.push("/mycards");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div
      className="mt-4"
      style={{
        backgroundColor: "#404258",
        width: "60vw",
        paddingBlock: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <CardInput
        pageTitle="Edit Business Card"
        title={userInput.title}
        subTitle={userInput.subTitle}
        description={userInput.description}
        address={userInput.address}
        phone={userInput.phone}
        url={userInput.url}
        handleUserInput={handleInputChange}
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

export default EditCard;
