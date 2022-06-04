import React from 'react';

export default function ShareVideo() {
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
            />
          </div>
        </div>
        <div className="flex">
          <div className="w-1/3" />
          <div className="w-2/3">
            <button
              className="w-full bg-blue-700 text-white px-2 border border-blue-700 rounded mt-10"
              type="button"
            >
              Share
            </button>
          </div>
        </div>
      </fieldset>
    </div>
  );
}
