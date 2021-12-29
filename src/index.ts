import express from "express";
import authRoutes from "./routes/auth";
import passwordRoutes from "./routes/password";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import createPassword from "./utils/passwordGenerator/passwordGenerator";

const app = express();

dotenv.config();

const PORT = process.env.PORT;
const DB_CONNECTION = process.env.DB_CONNECTION as string;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/auth", authRoutes);
app.use("/password", passwordRoutes);

//Connect to database and open server listening port
mongoose
  .connect(DB_CONNECTION)
  .then(() => {
    console.log("Connected to database");

    app.listen(PORT, () => {
      console.log(`Server listening to port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log({ error });
    throw new Error(error);
  });
