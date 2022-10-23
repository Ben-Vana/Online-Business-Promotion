import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

const nameArr = ["ken", "lily", "aria", "potch", "kelly", "luke"];

const Qsort = () => {
  const [filterArr, setArr] = useState(nameArr);
  const [qInput, setQInput] = useState("");

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    let newFilter;
    const qParam = new URLSearchParams(location.search);
    if (qParam.has("filter")) {
      let filter = qParam.get("filter");
      let rgx = new RegExp(filter, "i");
      newFilter = JSON.parse(JSON.stringify(nameArr));
      newFilter = newFilter.filter((item) => rgx.test(item));
      setArr(newFilter);
    }
    if (qParam.has("sort")) {
      let newSort = JSON.parse(JSON.stringify(nameArr));
      if (newFilter) {
        newSort = newFilter;
      }
      let sort = qParam.get("sort");
      if (sort === "down") {
        newSort = newSort.sort((a, b) => a.localeCompare(b));
        newFilter = newSort;
        setArr(newSort);
      } else if (sort === "up") {
        newSort = newSort.sort((a, b) => b.localeCompare(a));
        newFilter = newSort;
        setArr(newSort);
      }
    }
    if (qParam.has("show")) {
      let tempOdd = JSON.parse(JSON.stringify(nameArr));
      if (newFilter) {
        tempOdd = newFilter;
      }
      tempOdd = tempOdd.filter((item, index) => index % 2 === 0);
      setArr(tempOdd);
    }
  }, [location]);

  const handleKeyUp = (ev) => {
    if (ev.code === "Enter") {
      let qParam = new URLSearchParams(location.search);
      qParam.set("filter", qInput);
      history.push(`/?${qParam.toString()}`);
    }
  };

  const handleASC = () => {
    let qParam = new URLSearchParams(location.search);
    qParam.set("sort", "up");
    history.push(`/?${qParam.toString()}`);
  };

  const handleDESC = () => {
    let qParam = new URLSearchParams(location.search);
    qParam.set("sort", "down");
    history.push(`/?${qParam.toString()}`);
  };

  const handleOdd = () => {
    let qParam = new URLSearchParams(location.search);
    qParam.append("show", "odd");
    history.push(`/?${qParam.toString()}`);
  };

  return (
    <>
      <h3 className="mt-5">
        QParam Filter and Sort
        <span style={{ fontSize: 14, marginLeft: "0.5em" }}>
          {" "}
          *for sort use up and down
        </span>
      </h3>
      <div className="d-flex">
        <input
          onChange={(ev) => setQInput(ev.target.value)}
          type="text"
          className="form-control w-25 mb-3"
          id="qInput"
          value={qInput}
          onKeyUp={handleKeyUp}
        />
        <button className="btn btn-primary h-25 ms-2" onClick={handleASC}>
          ↑
        </button>
        <button className="btn btn-primary h-25 ms-1" onClick={handleDESC}>
          ↓
        </button>
        <button className="btn btn-primary h-25 ms-1" onClick={handleOdd}>
          Odd Rows
        </button>
      </div>
      {filterArr.map((item, index) => (
        <div key={"Q" + index}>{item}</div>
      ))}
    </>
  );
};

export default Qsort;
