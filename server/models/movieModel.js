import mongoose from "mongoose";

const movieSchema = mongoose.Schema(
  {
    youtubeId: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    likedByUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    dislikedByUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
