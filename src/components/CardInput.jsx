import "./cardInput.css";

const CardInput = ({
  pageTitle,
  title,
  subTitle,
  description,
  address,
  phone,
  url,
  handleUserInput,
  handleSubmitBtn,
  titleErr,
  subTitleErr,
  descriptionErr,
  addressErr,
  phoneErr,
  urlErr,
}) => {
  return (
    <>
      <h3>{pageTitle}</h3>
      <form className="form-style mb-2">
        <div className="form-floating mb-4 grid-node">
          <input
            onChange={handleUserInput}
            type="text"
            className="form-control card-input-new"
            id="title"
            value={title}
            placeholder="Title"
          />
          <label htmlFor="title">
            Title
            <span
              style={{
                color: "red",
                fontSize: 12,
                verticalAlign: "text-top",
                padding: 2,
              }}
            >
              *Required
            </span>
          </label>
          <div className="edit-err">
            {titleErr &&
              "Title must contain between 2 and 256 letters or numbers"}
          </div>
        </div>
        <div className="form-floating mb-4 grid-node">
          <input
            onChange={handleUserInput}
            type="text"
            className="form-control card-input-new"
            id="subTitle"
            value={subTitle}
            placeholder="SubTitle"
          />
          <label htmlFor="subTitle">
            SubTitle
            <span
              style={{
                color: "red",
                fontSize: 12,
                verticalAlign: "text-top",
                padding: 2,
              }}
            >
              *Required
            </span>
          </label>
          <div className="edit-err">
            {subTitleErr &&
              "SubTitle must contain between 2 and 256 letters or numbers"}
          </div>
        </div>
        <div className="form-floating mb-4 grid-node">
          <input
            onChange={handleUserInput}
            type="text"
            className="form-control card-input-new"
            id="description"
            value={description}
            placeholder="Description"
          />
          <label htmlFor="description">
            Description
            <span
              style={{
                color: "red",
                fontSize: 12,
                verticalAlign: "text-top",
                padding: 2,
              }}
            >
              *Required
            </span>
          </label>
          <div className="edit-err">
            {descriptionErr &&
              "Description must contain between 2 and 1024 letters or numbers"}
          </div>
        </div>
        <div className="form-floating mb-4 grid-node">
          <input
            onChange={handleUserInput}
            type="text"
            className="form-control card-input-new"
            id="address"
            value={address}
            placeholder="Address"
          />
          <label htmlFor="address">
            Address
            <span
              style={{
                color: "red",
                fontSize: 12,
                verticalAlign: "text-top",
                padding: 2,
              }}
            >
              *Required
            </span>
          </label>
          <div className="edit-err">
            {addressErr &&
              "Address must contain between 2 and 256 letters or numbers"}
          </div>
        </div>
        <div className="form-floating mb-4 grid-node">
          <input
            onChange={handleUserInput}
            type="text"
            className="form-control card-input-new"
            id="phone"
            value={phone}
            maxLength="14"
            placeholder="Phone"
          />
          <label htmlFor="phone">
            Phone Number
            <span
              style={{
                color: "red",
                fontSize: 12,
                verticalAlign: "text-top",
                padding: 2,
              }}
            >
              *Required
            </span>
          </label>
          <div className="edit-err">
            {phoneErr && "Phone must contain between 9 and 14 numbers"}
          </div>
        </div>
        <div className="form-floating mb-2 grid-node">
          <input
            onChange={handleUserInput}
            type="text"
            className="form-control card-input-new"
            id="url"
            value={url}
            placeholder="BusinessImageAddress"
          />
          <label htmlFor="url">Business Image Address</label>
          <div className="edit-err">
            {urlErr && "Image adress must not contain over 1024 characters"}
          </div>
        </div>
        <button
          onClick={handleSubmitBtn}
          type="submit"
          className="btn btn-primary grid-btn"
        >
          {pageTitle === "Add New Business Card" ? "Create Card" : "Update"}
        </button>
      </form>
    </>
  );
};

export default CardInput;
