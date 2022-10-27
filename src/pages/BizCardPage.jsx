import { useState, useEffect } from "react";
import axios from "axios";
import BizCardComp from "components/BizCardComp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpZA, faArrowDownAZ } from "@fortawesome/free-solid-svg-icons";
import { useHistory, useLocation } from "react-router-dom";
import useQparamsFilter from "hooks/useQparamsFilter";

let bizCardArr = [];
const BizCardPage = () => {
  const [userInput, setUserInput] = useState("");
  const [cardArr, setCardArr] = useState(bizCardArr);

  const location = useLocation();
  const history = useHistory();
  const qp = useQparamsFilter();

  useEffect(() => {
    (async () => {
      try {
        let { data } = await axios.get("/cards/cards");
        bizCardArr = data;
        setCardArr(bizCardArr);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  useEffect(() => {
    const qParam = new URLSearchParams(location.search);
    if (qParam.toString() !== "") {
      setCardArr(qp(qParam, bizCardArr));
    }
  }, [location]);

  const handleKeyUp = (ev) => {
    if (ev.code === "Enter") {
      let qParam = new URLSearchParams(location.search);
      qParam.set("filter", userInput);
      history.push(`/cardsPage/?${qParam.toString()}`);
    }
  };

  const handleSort = (order) => {
    if (order === "asc") {
      let qParam = new URLSearchParams(location.search);
      qParam.set("sort", "asc");
      history.push(`/cardsPage/?${qParam.toString()}`);
    }
    if (order === "desc") {
      let qParam = new URLSearchParams(location.search);
      qParam.set("sort", "desc");
      history.push(`/cardsPage/?${qParam.toString()}`);
    }
  };

  return (
    <>
      <div className="form-floating mb-3 mt-2">
        <input
          onChange={(ev) => setUserInput(ev.target.value)}
          type="text"
          className="form-control"
          id="qFilter"
          value={userInput}
          onKeyUp={handleKeyUp}
        />
        <label htmlFor="qFilter">Search Card:</label>
      </div>
      <div className="btn-group" role="group" aria-label="Basic example">
        <button
          onClick={() => {
            handleSort("desc");
          }}
          type="button"
          className="btn btn-primary me-1"
        >
          <FontAwesomeIcon icon={faArrowUpZA} />
        </button>
        <button
          onClick={() => {
            handleSort("asc");
          }}
          type="button"
          className="btn btn-primary"
        >
          <FontAwesomeIcon icon={faArrowDownAZ} />
        </button>
      </div>
      <div className=" row row-cols-md-4 g-2 mt-2">
        {cardArr.map((item) => (
          <BizCardComp
            key={item.title + item._id}
            name={item.title}
            desc={item.description}
            img={item.image.url}
            alt={item.image.alt}
            id={item._id}
            show={true}
          />
        ))}
      </div>
    </>
  );
};

export default BizCardPage;
