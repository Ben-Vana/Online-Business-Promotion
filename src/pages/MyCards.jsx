import { useState, useEffect } from "react";
import axios from "axios";
import BizCardComp from "components/BizCardComp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpZA, faArrowDownAZ } from "@fortawesome/free-solid-svg-icons";

let bizCardArr = [];
const MyCards = () => {
  const [userInput, setUserInput] = useState("");
  const [cardArr, setCardArr] = useState(bizCardArr);

  useEffect(() => {
    (async () => {
      try {
        let { data } = await axios.get(`/cards/my-cards`);
        bizCardArr = data;
        setCardArr(bizCardArr);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  useEffect(() => {
    let test = new RegExp(userInput, "i");
    let tempCardArr = JSON.parse(JSON.stringify(bizCardArr));
    tempCardArr = tempCardArr.filter((item) => test.test(item.title));
    setCardArr(tempCardArr);
  }, [userInput]);

  const handleUserInput = (ev) => {
    setUserInput(ev.target.value);
  };

  const handleSort = (c) => {
    if (c === "up") {
      let tempCardArr = JSON.parse(JSON.stringify(bizCardArr));
      tempCardArr.sort((a, b) => a.title.localeCompare(b.title));
      setCardArr(tempCardArr);
    } else if (c === "down") {
      let tempCardArr = JSON.parse(JSON.stringify(bizCardArr));
      tempCardArr.sort((a, b) => b.title.localeCompare(a.title));
      setCardArr(tempCardArr);
    }
  };

  const handleDelete = (id) => {
    axios
      .delete(`cards/${id}`)
      .then((res) => console.log("deleted"))
      .catch((err) => console.log(err));

    bizCardArr = bizCardArr.filter((item) => item._id !== id);
    setCardArr(bizCardArr);
  };

  return (
    <>
      <div className="form-floating mb-3 mt-2">
        <input
          onChange={handleUserInput}
          type="text"
          className="form-control"
          id="title"
          value={userInput.title}
        />
        <label htmlFor="title">Search Card:</label>
      </div>
      <div className="btn-group" role="group" aria-label="Basic example">
        <button
          onClick={() => {
            handleSort("down");
          }}
          type="button"
          className="btn btn-primary me-1"
        >
          <FontAwesomeIcon icon={faArrowUpZA} />
        </button>
        <button
          onClick={() => {
            handleSort("up");
          }}
          type="button"
          className="btn btn-primary"
        >
          <FontAwesomeIcon icon={faArrowDownAZ} />
        </button>
      </div>
      <div className=" row row-cols-md-4 g-2 mt-2">
        {cardArr &&
          cardArr.map((item) => (
            <BizCardComp
              key={item.title + item._id}
              name={item.title}
              desc={item.description}
              img={item.image.url}
              alt={item.image.alt}
              id={item._id}
              onDelete={handleDelete}
              show={true}
            />
          ))}
      </div>
    </>
  );
};

export default MyCards;
