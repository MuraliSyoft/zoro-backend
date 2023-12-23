import { body, query } from "express-validator";

const registerUserValidation = [
  body("firstName").notEmpty().withMessage("firstName is required"),
  body("lastName").notEmpty().withMessage("lastName is required"),
  body("email").notEmpty().isEmail().withMessage("Email is required"),
  body("passwordHash").notEmpty().withMessage("password is required"),
];

export { registerUserValidation };
