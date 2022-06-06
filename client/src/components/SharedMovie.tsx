import React, { useState } from 'react';
import { toast } from 'react-toastify';
import cn from 'classnames';
import { Movie } from '../share/models';
import thumbsUpReg from '../images/thumbs-up-regular.svg';
import thumbsUp from '../images/thumbs-up.svg';
import thumbsDownReg from '../images/thumbs-down-regular.svg';
import thumbsDown from '../images/thumbs-down.svg';
import { useUser } from '../context/context';
import { likeMovie, dislikeMovie } from '../services/movieService';

interface Props {
  movie: Movie;
  refresh: () => void;
}

export default function SharedMovie({ movie, refresh }: Props) {
  const [showDescription, setShowDescription] = useState<boolean>(false);

  const {
    _id: id,
    youtubeId,
    user: { _id: userId, email: userEmail },
    title,
    description,
    likedByUsers,
    dislikedByUsers,
  } = movie;
  const {
    state: { userInfo },
  } = useUser();

  const doLikeMovie = () => {
    likeMovie(id)
      .then(() => {
        refresh();
      })
      .catch((error) => {
        toast(error, {
          type: 'warning',
        });
      });
  };

  const doDislikeMovie = () => {
    dislikeMovie(id)
      .then(() => {
        refresh();
      })
      .catch((error) => {
        toast(error, {
          type: 'warning',
        });
      });
  };

  return (
    <div className="flex gap-x-5 w-1/2 py-4">
      <div className="video ">
        <iframe
          className="w-[450px] h-[250px]"
          src={`https://www.youtube.com/embed/${youtubeId}`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div className="video-info ">
        <div className="title text-red-500 font-bold">{title}</div>
        <div className="flex gap-x-2 items-center">
          <span>Shared by: {userEmail}</span>
          {userInfo ? (
            <>
              {!dislikedByUsers.includes(userId) ? (
                <div onClick={() => doLikeMovie()}>
                  <img
                    src={likedByUsers.includes(userId) ? thumbsUp : thumbsUpReg}
                    className="w-9 h-9 cursor-pointer"
                    alt=""
                  />
                </div>
              ) : null}
              {!likedByUsers.includes(userId) ? (
                <div onClick={() => doDislikeMovie()}>
                  <img
                    src={
                      dislikedByUsers.includes(userId)
                        ? thumbsDown
                        : thumbsDownReg
                    }
                    className="w-9 h-9 cursor-pointer"
                    alt=""
                  />
                </div>
              ) : null}
            </>
          ) : null}
        </div>
        <div className="flex flex-col gap-y-2">
          <div>Description:</div>
          <div
            className={cn('font-bold whitespace-pre-line cursor-pointer', {
              'line-clamp-5': !showDescription,
            })}
            onClick={() => setShowDescription(!showDescription)}
          >
            {description}
          </div>
        </div>
      </div>
    </div>
  );
}
