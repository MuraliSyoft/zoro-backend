import express, { Router } from 'express';
import userController from "../controllers/users.controller";
import { registerUserValidation } from "../validations/authValidations";

const userRoutes = express.Router();

userRoutes.post(
  "/register",
  registerUserValidation,
  userController.userRegistrationController
);
userRoutes.post(
  "/login",
  registerUserValidation,
  userController.userLoginController
);

export default userRoutes;
