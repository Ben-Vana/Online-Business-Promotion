import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const nameArr = ["ken", "lily", "aria", "potch", "kelly", "luke"];

const Qsort = () => {
  const [filterArr, setArr] = useState(nameArr);

  const location = useLocation();

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
      if (qParam.has("filter")) {
        newSort = newFilter;
      }
      let sort = qParam.get("sort");
      if (sort === "down") {
        newSort = newSort.sort((a, b) => a.localeCompare(b));
        setArr(newSort);
      } else if (sort === "up") {
        newSort = newSort.sort((a, b) => b.localeCompare(a));
        setArr(newSort);
      }
    }
  }, [location]);

  return (
    <>
      <h3 className="mt-5">QParam Filter and Sort</h3>
      {filterArr.map((item, index) => (
        <div key={"Q" + index}>{item}</div>
      ))}
    </>
  );
};

export default Qsort;
