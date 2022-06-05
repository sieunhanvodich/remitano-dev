import mongoose from "mongoose";

const userLikeMovieSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Movie",
    },
  },
  {
    timestamp: true,
  }
);

const UserLikeMovie = mongoose.model("UserLikeMovie", userLikeMovieSchema);

export default UserLikeMovie;
