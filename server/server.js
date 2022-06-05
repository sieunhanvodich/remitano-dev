import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";
import { errorHandler, requestNotFound } from "./middleware/errorMiddleware.js";

dotenv.config();

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);

app.use(requestNotFound);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("hello from server!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("App listening on port 5000");
});
