import Movie from "../models/movieModel.js";
import asyncHandler from "express-async-handler";
import { youtube } from "@googleapis/youtube";
import { getYoutubeIdByUrl } from "../share/util.js";

const shareMovie = asyncHandler(async (req, res) => {
  try {
    const { movieUrl } = req.body;
    const movieId = getYoutubeIdByUrl(movieUrl);

    if (!movieId) {
      res.status(400);
      throw new Error("Invalid Youtube Url");
    }

    let movie = await Movie.findOne({ youtubeId: movieId });

    if (movie) {
      res.status(400);
      throw new Error("This movie has already been shared");
    }

    const youtubeInstance = youtube({
      version: "v3",
      auth: process.env.GOOGLE_API_KEY,
    });

    const movieInfo = await youtubeInstance.videos.list({
      part: "snippet",
      id: [movieId],
    });

    if (!movieInfo.data.items.length) {
      res.status(400);
      throw new Error("This movie does not exist");
    }

    movie = await Movie.create({
      youtubeId: movieId,
      user: req.user._id,
      title: movieInfo.data.items[0].snippet.title,
      description: movieInfo.data.items[0].snippet.description,
    });

    res.json(movie);
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

const likeMovie = asyncHandler(async (req, res) => {
  try {
    const { movieId } = req.body;
    const userId = req.user._id;
    const movie = await Movie.findById(movieId);

    if (!movie) {
      res.status(400);
      throw new Error("Movie not found");
    }
    //If movie has already been liked by user then do unlike
    if (movie.likedByUsers.includes(userId)) {
      movie.likedByUsers = movie.likedByUsers.filter((item) => {
        return !item.equals(userId);
      });
    } else {
      movie.likedByUsers.push(userId);
    }
    movie.save();
    res.json({
      message: "Success",
    });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

const getMovies = asyncHandler(async (req, res) => {
  try {
    const movies = await Movie.find({}).sort({ createdAt: -1 }).select("-__v");
    res.json({
      movies,
    });
    res.json;
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

export { shareMovie, likeMovie, getMovies };
