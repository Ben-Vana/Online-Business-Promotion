import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPenToSquare,
  faMaximize,
} from "@fortawesome/free-solid-svg-icons";

const BizCardComp = ({
  name,
  desc,
  img,
  alt,
  address,
  phone,
  id,
  onDelete,
  show,
}) => {
  return (
    <div className="col-sm-4">
      <div
        className="card"
        style={{
          backgroundColor: "#404258",
          borderRadius: "0.8rem",
          padding: "0.5rem",
        }}
      >
        <img
          style={{ borderRadius: "4rem" }}
          src={img}
          className="card-img-top w-100 p-1"
          alt={alt}
        />
        <div className="card-body" style={{ marginTop: "-0.5rem" }}>
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{desc}</p>
          <hr style={{ color: "#000" }} />
          <div style={{ marginTop: "-0.2rem" }} className="card-text mb-2">
            <span style={{ textDecoration: "underline", fontWeight: 600 }}>
              Call us:
            </span>{" "}
            {phone}
          </div>
          <div className="card-text mb-3">{address}</div>
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
