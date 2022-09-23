import { useState, useEffect } from "react";
import axios from "axios";
import BizCardComp from "../components/BizCardComp";

const BizCardPage = () => {
  let bizCardArr = [];
  const [cardArr, setCardArr] = useState(bizCardArr);

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

  return (
    <>
      <div className=" row row-cols-md-5 g-2 mt-2">
        {cardArr.map((item) => (
          <BizCardComp
            key={item.title + item._id}
            name={item.title}
            desc={item.description}
            img={item.image.url}
          />
        ))}
      </div>
    </>
  );
};

export default BizCardPage;
