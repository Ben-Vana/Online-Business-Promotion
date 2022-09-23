import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import CardComponent from "../components/CardLayout";

const RickNMortyCardPage = () => {
  const [charArr, setArr] = useState([]);
  const [page, setPage] = useState({ next: "", prev: "" });

  useEffect(() => {
    axios
      .get("https://rickandmortyapi.com/api/character?page=1")
      .then((data) => {
        setArr(data.data.results);
        setPage({ next: data.data.info.next, prev: data.data.info.prev });
      });
  }, []);

  const handleDeletedItem = (id) => {
    let tempCharArr = charArr.filter((item) => item.id !== id);
    setArr(tempCharArr);
  };

  const display = () => {
    return (
      <Fragment>
        {charArr.map((item, index) => (
          <CardComponent
            key={"char" + index}
            name={item.name}
            image={item.image}
            id={item.id}
            onDelete={handleDeletedItem}
          />
        ))}
      </Fragment>
    );
  };

  const displayButton = () => {
    return (
      <>
        <button
          onClick={handlePrevPage}
          type="button"
          className="btn btn-primary py-2 px-3"
        >
          Prev
        </button>
        <button
          onClick={handleNextPage}
          type="button"
          className="btn btn-primary py-2 px-3"
        >
          Next
        </button>
      </>
    );
  };

  const handleNextPage = () => {
    axios.get(page.next).then((data) => {
      setArr(data.data.results);
      setPage({ next: data.data.info.next, prev: data.data.info.prev });
    });
  };

  const handlePrevPage = () => {
    axios.get(page.prev).then((data) => {
      setArr(data.data.results);
      setPage({ next: data.data.info.next, prev: data.data.info.prev });
    });
  };

  return (
    <Fragment>
      <div className="d-flex justify-content-center m-2 gap-1">
        {displayButton()}
      </div>
      <div className="row">{display()}</div>
    </Fragment>
  );
};

export default RickNMortyCardPage;
