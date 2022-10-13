import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import BizCardComp from "../components/BizCardComp";

const EditCard = () => {
  const [userInput, setInput] = useState({
    title: "",
    subTitle: "",
    description: "",
    address: "",
    phone: "",
    url: "",
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
    let tempUserInput = JSON.parse(JSON.stringify(userInput));
    if (tempUserInput.hasOwnProperty(ev.target.id)) {
      tempUserInput[ev.target.id] = ev.target.value;
      setInput(tempUserInput);
    }
  };

  const handleUpdateCard = async () => {
    try {
      let { data } = await axios.put(`/cards/${id}`, {
        title: userInput.title,
        subTitle: userInput.subTitle,
        description: userInput.description,
        address: userInput.address,
        phone: userInput.phone,
        url: userInput.url,
      });
      if (data) {
        history.push("/mycards");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="form mb-3 mt-2">
        <label htmlFor="title" className="mb-2">
          Title:
        </label>
        <input
          onChange={handleInputChange}
          type="text"
          className="form-control w-25"
          id="title"
          value={userInput.title}
        />
        <label htmlFor="subtitle" className="mb-2 mt-4">
          SubTitle:
        </label>
        <input
          onChange={handleInputChange}
          type="text"
          className="form-control w-25"
          id="subtitle"
          value={userInput.subTitle}
        />
        <label htmlFor="description" className="mb-2 mt-4">
          Description:
        </label>
        <input
          onChange={handleInputChange}
          type="text"
          className="form-control w-25"
          id="description"
          value={userInput.description}
        />
        <label htmlFor="address" className="mb-2 mt-4">
          Address:
        </label>
        <input
          onChange={handleInputChange}
          type="text"
          className="form-control w-25"
          id="address"
          value={userInput.address}
        />
        <label htmlFor="phone" className="mb-2 mt-4">
          Phone:
        </label>
        <input
          onChange={handleInputChange}
          type="text"
          className="form-control w-25"
          id="phone"
          value={userInput.phone}
        />
      </div>
      <button
        onClick={handleUpdateCard}
        type="button"
        className="btn btn-primary"
      >
        Update
      </button>
    </>
    // name={bizArr.title}
    // desc={bizArr.description}
    // img={bizArr.image.url}
    // id={bizArr._id}
    // show={false}
  );
};

export default EditCard;
