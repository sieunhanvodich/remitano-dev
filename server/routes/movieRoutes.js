import express from "express";
import {
  shareMovie,
  likeMovie,
  getMovies,
} from "../controllers/movieController.js";
import { guard } from "../middleware/guardMiddleware.js";
const router = express.Router();

router.route("/share").post(guard, shareMovie);
router.route("/like").post(guard, likeMovie);
router.get("/list", getMovies);

export default router;
