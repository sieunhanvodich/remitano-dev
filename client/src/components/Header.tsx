import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContent } from 'react-toastify';
import homeIcon from '../images/home.png';
import login from '../services/userService';
import { useUser } from '../context/context';
import { ActionType } from '../share/models';

export default function Header() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    state: { userInfo },
    dispatch,
  } = useUser();

  const doLogin = async () => {
    try {
      if (!email.trim() || !password.trim()) {
        toast('Invalid input value', {
          type: 'warning',
        });
        return;
      }
      setIsLoading(true);
      const userResponse = await login({ email, password });
      dispatch({
        type: ActionType.USER_LOGIN_SUCCESS,
        payload: { userInfo: userResponse },
      });
      toast('Login succeed!', {
        type: 'success',
      });
      setEmail('');
      setPassword('');
      setIsLoading(false);
    } catch (error) {
      toast(error as ToastContent, {
        type: 'warning',
      });
      setIsLoading(false);
    }
  };

  const doLogout = () => {
    dispatch({ type: ActionType.USER_LOGOUT });
  };

  return (
    <div className="header flex justify-between items-center p-4 border-b mb-5">
      <div
        className="page-name flex items-center cursor-pointer"
        onClick={() => navigate('/')}
      >
        <img src={homeIcon} alt="home" className="w-12 h-12" />
        <span className="text-4xl">Funny Movies</span>
      </div>
      <div className="login-and-register cursor-pointer flex gap-x-3 items-center">
        {!userInfo ? (
          <>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Email"
              type="text"
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Password"
              type="password"
              onChange={(event) => setPassword(event.target.value)}
            />
            <button
              className="w-full hover:bg-blue-700 hover:text-white py-2 px-4 border border-blue-700 rounded"
              type="button"
              disabled={isLoading}
              onClick={() => doLogin()}
            >
              Login / Register
            </button>
          </>
        ) : (
          <>
            <div className="flex-1">Welcome {userInfo.email}</div>
            <button
              className="hover:bg-blue-700 hover:text-white py-2 px-4 border border-blue-700 rounded"
              type="button"
              onClick={() => navigate('/share')}
            >
              Share a movie
            </button>
            <button
              className="hover:bg-red-700 hover:text-white py-2 px-4 border border-red-700 rounded"
              type="button"
              onClick={() => doLogout()}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}
