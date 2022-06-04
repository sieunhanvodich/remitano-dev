import React from 'react';
import thumbsUpReg from '../images/thumbs-up-regular.svg';
import thumbsDownReg from '../images/thumbs-down-regular.svg';

export default function SharedVideo() {
  return (
    <div className="flex gap-x-5 w-1/2">
      <div className="video">
        <iframe
          width="400"
          height="250"
          src="https://www.youtube.com/embed/PwSiopkyBb4"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div className="video-info">
        <div className="title text-red-500 font-bold">Movie title</div>
        <div className="flex gap-x-2 items-center">
          <span>Shared by: someone@gmail.com</span>
          <img src={thumbsUpReg} className="w-9 h-9 cursor-pointer" alt="" />
          <img src={thumbsDownReg} className="w-9 h-9 cursor-pointer" alt="" />
        </div>
        <div className="flex flex-col gap-y-2">
          <div>Description:</div>
          <div className="font-bold">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
            pretium sed ex quis porta. Quisque fermentum orci vel ultrices
            porta. Nulla lacinia ut ex a euismod. Mauris purus metus, eleifend
            tristique eleifend at, pretium non risus. Nullam sed ipsum ac ex
            dapibus tempus. Nullam sagittis, risus pharetra eleifend
            condimentum, libero mauris faucibus urna
          </div>
        </div>
      </div>
    </div>
  );
}
