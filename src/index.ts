import express from "express";
import authRoutes from "./routes/auth";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", authRoutes);

app.listen(5002, () => {
  console.log("Running on port 5002");
});
