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
  },
  {
    timestamp: true,
  }
);

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
