import express, { Request, Response } from "express";
import "./config/db";
import userRoutes from "./routes/user.routes";
import cors from "cors";

const app = express();
app.use(cors());

const port = 8080;
const API_VERSION = "/api/v1";

app.use(express.json());

app.use(API_VERSION + "/user", userRoutes);

app.listen(port, () => {
  console.log("Server is running 8080");
});
