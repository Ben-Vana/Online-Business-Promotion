import Joi from "joi-browser";

const cardSchema = {
  title: Joi.string().min(2).max(256).required().label("Title"),
  subTitle: Joi.string().min(2).max(256).required().label("SubTitle"),
  description: Joi.string().min(2).max(1024).required().label("Description"),
  address: Joi.string().min(2).max(256).required().label("Address"),
  phone: Joi.string()
    .min(9)
    .max(14)
    .required()
    .label("Phone")
    .regex(/^[\d]*$/g),
  url: Joi.string().allow(null, "").max(1024).label("Url"),
};

export default cardSchema;
