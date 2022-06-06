import axios from './axios';
import { Movie } from '../share/models';

const shareMovie = (movieUrl: string) =>
  new Promise<void>((resolve, reject) => {
    axios
      .post<void>('/movies/share', { movieUrl })
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error.response.data.message);
      });
  });

const likeMovie = (movieId: string) =>
  new Promise<void>((resolve, reject) => {
    axios
      .post<void>('/movies/like', { movieId })
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error.response.data.message);
      });
  });

const dislikeMovie = (movieId: string) =>
  new Promise<void>((resolve, reject) => {
    axios
      .post<void>('/movies/dislike', { movieId })
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error.response.data.message);
      });
  });

const getMovies = () =>
  new Promise<Movie[]>((resolve, reject) => {
    axios
      .get<{ movies: Movie[] }>('/movies/list')
      .then((response) => {
        resolve(response.data.movies);
      })
      .catch((error) => {
        reject(error.response.data.message);
      });
  });

export { shareMovie, likeMovie, getMovies, dislikeMovie };
