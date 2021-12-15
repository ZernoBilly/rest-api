import express from "express";
import authRoutes from "./routes/auth";
import dotenv from "dotenv";
import mongoose from "mongoose";

const app = express();

dotenv.config();

const PORT = process.env.PORT;
const DB_CONNECTION = process.env.DB_CONNECTION as string;

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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", authRoutes);
