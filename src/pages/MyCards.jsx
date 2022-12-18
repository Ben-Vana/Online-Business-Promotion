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
  const [cardArr, setCardArr] = useState([]);
  const [error, setError] = useState({ dataErr: false, searchErr: false });

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
        const tempError = { ...error };
        tempError.dataErr = true;
        setError(tempError);
      }
    })();
  }, []);

  useEffect(() => {
    let tempError = { ...error };
    tempError.searchErr = false;
    const qParam = new URLSearchParams(location.search);
    if (qParam.has("filter")) {
      setUserInput(qParam.get("filter"));
    }
    if (qParam.toString() !== "") {
      const searchCard = qp(qParam, bizCardArr);
      if (searchCard[0]) setCardArr(searchCard);
      else if (!searchCard[0]) {
        tempError.searchErr = true;
        setCardArr(searchCard);
      }
      setError(tempError);
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
      .then(() => {
        bizCardArr = bizCardArr.filter((item) => item._id !== id);
        setCardArr(bizCardArr);
      })
      .catch();
  };

  return (
    <>
      <div className="page-container">
        <div className="card-input-container form-floating mb-1 mt-3">
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
      </div>
      {error.dataErr && (
        <div className="mt-5" style={{ fontSize: "2rem" }} role="status">
          A problem has occured please refresh or try again later.
        </div>
      )}
      {error.searchErr && !error.dataErr && (
        <div className="mt-5" style={{ fontSize: "2rem" }} role="status">
          Card does not exist
        </div>
      )}
      <div className="row g-2 mt-2 w-100">
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
    </>
  );
};

export default MyCards;
