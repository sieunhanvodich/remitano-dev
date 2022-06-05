import axios, { AxiosError } from 'axios';
import { getData } from '../share/util';
import { UserResponse } from '../share/models';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const userInfo = getData<UserResponse>('user');

    // eslint-disable-next-line no-param-reassign
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${userInfo?.token || null}`,
    };
    return config;
  },
  (error: Error | AxiosError) => Promise.reject(error),
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: Error | AxiosError) => Promise.reject(error),
);

export default axiosInstance;
