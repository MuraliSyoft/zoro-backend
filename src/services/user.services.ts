import { compare, hash } from "bcrypt";
import userModel from "../models/user.model";
import { LoginData, User } from "../types/users.types";
import bcrypt from "bcrypt";
import { log } from "util";

const saltRounds = 8;

export const userRegistrationService = async (userDetails: User) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userPassword = userDetails.password;

      // Check if userDetails.passwordHash is a valid string
      if (typeof userPassword !== "string") {
        reject({ message: "Invalid password format" });
        return;
      }

      const encryptedPassword = await hash(userPassword, 10);
      userDetails.passwordHash = encryptedPassword;

      const newUserData = new userModel(userDetails);

      // Check if newUserData is valid
      if (!newUserData.validateSync()) {
        const result = await newUserData.save();
        resolve({ message: "User registered successfully", result });
      } else {
        reject({ message: "Invalid user data" });
      }
    } catch (error: any) {
      console.error("Error during user registration:", error);

      if (error?.keyPattern && error?.keyPattern?.email) {
        reject("User already registered...!");
      } else {
        reject({ message: "Unable to register the user" });
      }
    }
  });
};


export const userLoginService = async (loginData: User) => {
  return new Promise(async (resolve, reject) => {
    try {
      const foundUser = await userModel.find({ email: loginData.email });

      if (!foundUser || !foundUser[0] || !foundUser[0].passwordHash) {
        reject("Authentication failed. User not found or password hash is missing");
        return;
      }

      const userPassword = loginData.password;
      const hashedPassword = foundUser[0].passwordHash;

      bcrypt.compare(
        userPassword,
        hashedPassword as string,   
        (err, result) => {
          console.log(result, "qwertyu");  
          if (err || !result) {
            reject("Authentication failed. Incorrect Password");
          } else {
            resolve("Authentication successful");
          }
        }
      );
    } catch (error: any) {
      reject("Error during authentication");
    }
  });
};