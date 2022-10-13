import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import BizCardComp from "../components/BizCardComp";

const MoreInfoPage = () => {
  const [bizArr, setArr] = useState(null);
  let { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        let { data } = await axios.get(`/cards/card/${id}`);
        setArr(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    bizArr && (
      <BizCardComp
        name={bizArr.title}
        desc={bizArr.description}
        img={bizArr.image.url}
        id={bizArr._id}
        show={false}
      />
    )
  );
};

export default MoreInfoPage;
