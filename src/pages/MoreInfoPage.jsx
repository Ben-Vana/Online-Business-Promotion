import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import BizCardComp from "components/BizCardComp";
import "./cardsPage.css";

const MoreInfoPage = () => {
  const [bizArr, setArr] = useState(null);
  const history = useHistory();
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

  const handleBack = () => {
    history.goBack();
  };

  return (
    bizArr && (
      <div className="mt-1">
        <button
          type="button"
          className="btn btn-dark mb-2 btn-new"
          onClick={handleBack}
        >
          Go Back
        </button>
        <BizCardComp
          name={bizArr.title}
          desc={bizArr.description}
          img={bizArr.image.url}
          alt={bizArr.image.alt}
          address={bizArr.address}
          phone={bizArr.phone}
          id={bizArr._id}
          show={false}
        />
      </div>
    )
  );
};

export default MoreInfoPage;
