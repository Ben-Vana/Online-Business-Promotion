const BizCardComp = ({ name, desc, img }) => {
  return (
    <div className="col">
      <div className="card">
        <img src={img} className="card-img-top w-100 p-1" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{desc}</p>
        </div>
      </div>
    </div>
  );
};

export default BizCardComp;
