const CardComponent = ({ name, image, id, onDelete }) => {
  return (
    <div className="card col-3" styles="width: 18rem;">
      <img src={image} className="card-img-top" alt={name} />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <button
          onClick={() => {
            onDelete(id);
          }}
          type="button"
          className="btn btn-danger"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default CardComponent;
