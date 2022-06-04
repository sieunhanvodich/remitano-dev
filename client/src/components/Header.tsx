import React from 'react';
import { useNavigate } from 'react-router-dom';
import homeIcon from '../images/home.png';

export default function Header() {
  const navigate = useNavigate();
  return (
    <div className="header flex justify-between items-center p-4 border-b mb-5">
      <div
        className="page-name flex items-center cursor-pointer"
        onClick={() => navigate('/')}
      >
        <img src={homeIcon} alt="home" className="w-12 h-12" />
        <span className="text-4xl">Funny Movies</span>
      </div>
      <div className="login-and-register cursor-pointer flex gap-x-3">
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Email"
          type="text"
        />
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Password"
          type="text"
        />
        <button
          className="w-full hover:bg-blue-700 hover:text-white py-2 px-4 border border-blue-700 rounded"
          type="button"
        >
          Login / Register
        </button>
      </div>
    </div>
  );
}
