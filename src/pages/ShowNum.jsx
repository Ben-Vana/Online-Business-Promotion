import { useSelector } from "react-redux";

const ShowNum = () => {
  const num = useSelector((state) => state.randomNum.number);
  return (
    <>
      <div className="mt-4">
        {num % 2 === 0 ? num : "The number is odd thus will not be displayed."}
      </div>
    </>
  );
};

export default ShowNum;
