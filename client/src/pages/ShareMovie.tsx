import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { shareMovie } from '../services/movieService';

export default function ShareVideo() {
  const [movieUrl, setMovieUrl] = useState<string>('');

  const doShareMovie = () => {
    shareMovie(movieUrl)
      .then(() => {
        setMovieUrl('');
        toast('Sharing movie succeed!', {
          type: 'success',
        });
      })
      .catch((error) => {
        toast(error, {
          type: 'warning',
        });
      });
  };

  return (
    <div className="w-full max-w-md self-center mt-20">
      <fieldset className="border border-solid border-gray-300 p-8">
        <legend>Share a Youtube movie</legend>
        <div className="flex items-center">
          <div className="w-1/3">
            <span>Youtube URL:</span>
          </div>
          <div className="flex flex-col w-2/3 gap-y-7">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              onChange={(e) => setMovieUrl(e.target.value)}
              value={movieUrl}
            />
          </div>
        </div>
        <div className="flex">
          <div className="w-1/3" />
          <div className="w-2/3">
            <button
              className="w-full bg-blue-700 text-white px-2 border border-blue-700 rounded mt-10"
              type="button"
              onClick={() => doShareMovie()}
            >
              Share
            </button>
          </div>
        </div>
      </fieldset>
    </div>
  );
}
