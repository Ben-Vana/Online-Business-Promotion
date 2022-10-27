import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPenToSquare,
  faMaximize,
} from "@fortawesome/free-solid-svg-icons";

const BizCardComp = ({ name, desc, img, alt, id, onDelete, show }) => {
  return (
    <div className="col-4">
      <div className="card">
        <img src={img} className="card-img-top w-100 p-1" alt={alt} />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{desc}</p>
          {show ? (
            <Link
              to={`/moreinfo/${id}`}
              type="button"
              className="btn btn-warning"
              style={{ fontSize: 14 }}
            >
              <FontAwesomeIcon icon={faMaximize} /> Show More
            </Link>
          ) : (
            <></>
          )}
          <div className="mt-1">
            {onDelete ? (
              <Link
                to={`/editcard/${id}`}
                className="btn btn-warning me-2"
                style={{ fontSize: 14 }}
              >
                <FontAwesomeIcon icon={faPenToSquare} /> Edit
              </Link>
            ) : (
              <></>
            )}
            {onDelete ? (
              <button
                onClick={() => {
                  onDelete(id);
                }}
                type="button"
                className="btn btn-warning me-2"
                style={{ fontSize: 14 }}
              >
                <FontAwesomeIcon icon={faTrash} /> Delete
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BizCardComp;
