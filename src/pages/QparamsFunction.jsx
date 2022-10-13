import { useState } from "react";

const QpFunction = () => {
  const [input, setInput] = useState("");
  const [Qp, setQp] = useState({
    searchUrl: [],
  });

  const handleQp = () => {
    let newQp = JSON.parse(JSON.stringify(Qp));
    let link = input.split("?");
    console.log(link);
    if (link[1]) {
      newQp.searchUrl = link[1].split("&");
      setQp(newQp);
    }
  };

  return (
    <>
      <h2 className="mt-5">Qparams Function</h2>
      <div className="form-floating my-3">
        <input
          type="text"
          className="form-control"
          id="qpInput"
          placeholder="URL"
          value={input}
          onChange={(ev) => {
            setInput(ev.target.value);
          }}
        />
        <label htmlFor="qpInput">URL address</label>
      </div>
      <button className="btn btn-primary" onClick={handleQp}>
        Process
      </button>
      <div>
        {!Qp.searchUrl
          ? ""
          : Qp.searchUrl.map((item, index) => (
              <div className="my-3 display-6" key={`Qp${index}`}>
                {item}
              </div>
            ))}
      </div>
    </>
  );
};

export default QpFunction;
