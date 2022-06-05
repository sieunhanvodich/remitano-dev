import axios from './axios';
import { UserInfo, UserResponse } from '../share/models';

const login = (payload: UserInfo) =>
  new Promise<UserResponse>((resolve, reject) => {
    axios
      .post<UserResponse>('/users/login', payload)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response.data.message);
      });
  });

export default login;
