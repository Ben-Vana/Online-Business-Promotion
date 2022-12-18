import BizCardComp from "components/BizCardComp";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

let bizCardArr = [];

const HomePage = () => {
  const [cardArr, setCardArr] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        let { data } = await axios.get("/cards/cards");
        bizCardArr = data;
        setCardArr(bizCardArr.slice(0, 4));
      } catch (err) {
        const tempError = { ...error };
        tempError.dataErr = true;
        setError(tempError);
      }
    })();
  }, []);

  return (
    <div className="d-flex flex-column mt-3">
      <h1 className="align-self-center">Add your business today</h1>
      {error && (
        <div
          className="mt-5"
          style={{ fontSize: "2rem", textAlign: "center" }}
          role="status"
        >
          A problem has occured please refresh or try again later.
        </div>
      )}
      <div className="row g-2 mt-5 w-75">
        {cardArr &&
          cardArr.map((item) => (
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
      <p className="mt-5" style={{ fontSize: "1.7rem" }}>
        Join our free service and get more customers.
        <br />
        Sign up today.
      </p>
    </div>
  );
};

export default HomePage;
