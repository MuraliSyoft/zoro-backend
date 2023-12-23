import { Request, Response } from "express";
import { User } from "../types/users.types";
import {
  userLoginService,
  userRegistrationService,
} from "../services/user.services";

const saltRounds = 8;

const userRegistrationController = async (req: Request, res: Response) => {
  const userDetails: User = { ...req.body };

  if (Object.keys(userDetails).length === 0) {
    if (!userDetails.email) {
      res.status(400).send("Email should be required");
    }
    if (!userDetails.passwordHash) {
      res.status(400).send("Password should be required");
    }
  } else {
    try {
      const result = await userRegistrationService(userDetails);
      res.status(200).send(result);
    } catch (error: any) {
      if (error?.keyPattern && error?.keyPattern?.email) {
        res.status(500).send('User already registered...!');
      } else {
        console.log("======>er", error);
        res.status(500).send({ message: error });
      }
    }
  }
};

const userLoginController = async (req: Request, res: Response) => {
  const userDetails: User = { ...req.body };
  if (Object.keys(userDetails).length === 0) {
    res.status(400).send({ message: "No  request data found" });
  } else if (!userDetails.email) {
    res.status(400).send({ message: "Email not found" });
  } else if (!userDetails.password) {
    res.status(400).send({ message: "Password not found" });
  } else {
    try {
      const result = await userLoginService(userDetails);
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send(error);
    }
  }
};

const userController = {
  userRegistrationController: userRegistrationController,
  userLoginController: userLoginController,
};

export default userController;
