import { useDispatch } from "react-redux";
import { numActions } from "../store/numGen";

const RandomButton = () => {
  const dispatch = useDispatch();

  function handleRanNum() {
    dispatch(numActions.updateNum(Math.floor(Math.random() * (100 - 1) + 1)));
  }

  return (
    <>
      <hr />
      <button
        onClick={handleRanNum}
        type="button"
        className="mt-5 btn btn-primary"
      >
        Generate A Random Number
      </button>
    </>
  );
};

export default RandomButton;
