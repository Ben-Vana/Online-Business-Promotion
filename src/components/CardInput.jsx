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
      <h3 className="mt-4">{pageTitle}</h3>
      <form>
        <div className="form-floating mb-3 mt-2">
          <input
            onChange={handleUserInput}
            type="text"
            className="form-control"
            id="title"
            value={title}
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
          <div style={{ color: "red", fontSize: 14 }}>
            {titleErr &&
              "Title must contain between 2 and 256 letters or numbers"}
          </div>
        </div>
        <div className="form-floating mb-3">
          <input
            onChange={handleUserInput}
            type="text"
            className="form-control"
            id="subTitle"
            value={subTitle}
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
          <div style={{ color: "red", fontSize: 14 }}>
            {subTitleErr &&
              "SubTitle must contain between 2 and 256 letters or numbers"}
          </div>
        </div>
        <div className="form-floating mb-3">
          <input
            onChange={handleUserInput}
            type="text"
            className="form-control"
            id="description"
            value={description}
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
          <div style={{ color: "red", fontSize: 14 }}>
            {descriptionErr &&
              "Description must contain between 2 and 1024 letters or numbers"}
          </div>
        </div>
        <div className="form-floating mb-3">
          <input
            onChange={handleUserInput}
            type="text"
            className="form-control"
            id="address"
            value={address}
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
          <div style={{ color: "red", fontSize: 14 }}>
            {addressErr &&
              "Address must contain between 2 and 256 letters or numbers"}
          </div>
        </div>
        <div className="form-floating mb-3">
          <input
            onChange={handleUserInput}
            type="text"
            className="form-control"
            id="phone"
            value={phone}
            maxLength="14"
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
          <div style={{ color: "red", fontSize: 14 }}>
            {phoneErr && "Phone must contain between 9 and 14 numbers"}
          </div>
        </div>
        <div className="form-floating mb-2">
          <input
            onChange={handleUserInput}
            type="text"
            className="form-control"
            id="url"
            value={url}
          />
          <label htmlFor="url">Business Image Address</label>
          <div style={{ color: "red", fontSize: 14 }}>
            {urlErr && "Image adress must not contain over 1024 characters"}
          </div>
        </div>
        <button
          onClick={handleSubmitBtn}
          type="submit"
          className="btn btn-primary mb-1"
        >
          {pageTitle === "Add New Business Card" ? "Add Card" : "Update"}
        </button>
      </form>
    </>
  );
};

export default CardInput;
