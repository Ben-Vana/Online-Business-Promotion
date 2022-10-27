import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import BizCardComp from "components/BizCardComp";

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
          className="btn btn-dark mb-2"
          onClick={handleBack}
        >
          Go back
        </button>
        <BizCardComp
          name={bizArr.title}
          desc={bizArr.description}
          img={bizArr.image.url}
          id={bizArr._id}
          show={false}
        />
      </div>
    )
  );
};

export default MoreInfoPage;
