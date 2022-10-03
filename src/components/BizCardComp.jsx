import { Link } from "react-router-dom";

const BizCardComp = ({ name, desc, img, id, onDelete }) => {
  return (
    <div className="col-4">
      <div className="card">
        <img src={img} className="card-img-top w-100 p-1" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{desc}</p>
          {onDelete ? (
            <button
              onClick={() => {
                onDelete(id);
              }}
              type="button"
              className="btn btn-warning me-2"
            >
              Delete
            </button>
          ) : (
            <></>
          )}
          <Link
            to={`/moreinfo/${id}`}
            type="button"
            className="btn btn-warning"
          >
            Show More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BizCardComp;
