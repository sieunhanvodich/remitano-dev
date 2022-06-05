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
  USER_LOGIN_FAIL = 'USER_LOGIN_FAIL',
  USER_LOGOUT = 'USER_LOGOUT',
}

export interface UserState {
  userInfo?: UserResponse | null;
  error?: string | null | unknown;
}

export interface Action {
  type: ActionType;
  payload?: UserState;
}

export type Dispatch = (action: Action) => void;
