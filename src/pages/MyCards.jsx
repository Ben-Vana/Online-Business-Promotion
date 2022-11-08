import { useState, useEffect } from "react";
import axios from "axios";
import BizCardComp from "components/BizCardComp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpZA, faArrowDownAZ } from "@fortawesome/free-solid-svg-icons";
import { useHistory, useLocation } from "react-router-dom";
import useQparamsFilter from "hooks/useQparamsFilter";
import "./cardsPage.css";

let bizCardArr = [];
const MyCards = () => {
  const [userInput, setUserInput] = useState("");
  const [cardArr, setCardArr] = useState(bizCardArr);
  const location = useLocation();
  const qp = useQparamsFilter();
  const history = useHistory();

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
    const qParam = new URLSearchParams(location.search);
    if (qParam.has("filter")) {
      setUserInput(qParam.get("filter"));
    }
    if (qParam.toString() !== "") {
      setCardArr(qp(qParam, bizCardArr));
    }
  }, [location, bizCardArr]);

  const handleKeyUp = (ev) => {
    if (ev.code === "Enter") {
      let qParam = new URLSearchParams(location.search);
      qParam.set("filter", userInput);
      history.push(`/mycards/?${qParam.toString()}`);
    }
  };

  const handleSort = (order) => {
    if (order === "asc") {
      let qParam = new URLSearchParams(location.search);
      qParam.set("sort", "asc");
      history.push(`/mycards/?${qParam.toString()}`);
    }
    if (order === "desc") {
      let qParam = new URLSearchParams(location.search);
      qParam.set("sort", "desc");
      history.push(`/mycards/?${qParam.toString()}`);
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
      <div className="page-container">
        <div className="input-container form-floating mb-1 mt-3">
          <input
            onChange={(ev) => setUserInput(ev.target.value)}
            type="text"
            className="form-control input-style"
            id="qFilter"
            value={userInput}
            onKeyUp={handleKeyUp}
            placeholder="Search Card:"
          />
          <label style={{ color: "#fff" }} htmlFor="qFilter">
            Search Card:
          </label>
        </div>
        <div
          className="btn-group group-style"
          role="group"
          aria-label="Basic example"
        >
          <button
            onClick={() => {
              handleSort("asc");
            }}
            type="button"
            className="btn btn-primary btn-new"
          >
            <FontAwesomeIcon icon={faArrowUpZA} />
          </button>
          <button
            onClick={() => {
              handleSort("desc");
            }}
            type="button"
            className="btn btn-primary btn-new"
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
                address={item.address}
                phone={item.phone}
                id={item._id}
                onDelete={handleDelete}
                show={true}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default MyCards;
