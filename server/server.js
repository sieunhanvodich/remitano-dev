import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import cors from "cors";
import path from "path";

import userRoutes from "./routes/userRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";
import { errorHandler, requestNotFound } from "./middleware/errorMiddleware.js";

dotenv.config();

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/movies", movieRoutes);

const __dirname = path.resolve();

// --- deployment ---
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}
// --- deployment ---

app.use(requestNotFound);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("hello from server!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("App listening on port 5000");
});
