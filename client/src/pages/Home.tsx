import React, { useEffect, useState } from 'react';
import { toast, ToastContent } from 'react-toastify';
import SharedMovie from '../components/SharedMovie';
import { getMovies } from '../services/movieService';
import { Movie } from '../share/models';

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);

  const doRefresh = () => {
    setRefresh(!refresh);
  };

  useEffect(() => {
    async function getMovieList() {
      try {
        const response = await getMovies();
        setMovies(response);
      } catch (error) {
        toast(error as ToastContent, {
          type: 'warning',
        });
      }
    }

    getMovieList();
  }, [refresh]);

  return (
    <div className="flex flex-col items-center divide-y">
      {!movies.length ? (
        <p className="text-grey-300">No movie shared</p>
      ) : (
        movies.map((movie) => (
          <SharedMovie
            movie={movie}
            refresh={doRefresh}
            key={movie.youtubeId}
          />
        ))
      )}
    </div>
  );
}
