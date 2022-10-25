import Joi from "joi-browser";

const RegisterSchema = {
  name: Joi.string()
    .min(2)
    .max(255)
    .required()
    .label("Name")
    .regex(/^[\D]*$/gm),
  email: Joi.string()
    .email()
    .min(8)
    .max(255)
    .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)
    .required()
    .label("Email"),
  password: Joi.string()
    .min(8)
    .max(255)
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]*$/gm)
    .required()
    .label("Password"),
  business: Joi.boolean(),
};

export default RegisterSchema;
