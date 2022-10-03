import Joi from "joi-browser";

const loginSchema = {
  name: Joi.string()
    .min(2)
    .max(255)
    .required()
    .label("Name")
    .regex(/^[\D]{2,}$/gm),
  email: Joi.string()
    .email()
    .min(8)
    .max(1024)
    .regex(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/gm)
    .required()
    .label("Email"),
  password: Joi.string()
    .max(1024)
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/gm)
    .required()
    .label("Password"),
  business: Joi.boolean(),
};

export default loginSchema;
