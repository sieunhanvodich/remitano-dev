export interface UserInfo {
  email: string;
  password: string;
}

export interface UserResponse {
  _id: string;
  email: string;
  token: string;
}

export enum ActionType {
  USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS',
  USER_LOGOUT = 'USER_LOGOUT',
}

export interface UserState {
  userInfo?: UserResponse | null;
}

export interface Action {
  type: ActionType;
  payload?: UserState;
}

export interface Movie {
  _id: string;
  youtubeId: string;
  user: Omit<UserResponse, 'token'>;
  title: string;
  description: string;
  likedByUsers: string[];
  dislikedByUsers: string[];
}

export type Dispatch = (action: Action) => void;
