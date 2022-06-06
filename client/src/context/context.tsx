import React, { createContext, useReducer, ReactNode, useContext } from 'react';
import { ActionType, UserState, Action, Dispatch } from '../share/models';
import { setData, getData, clearData } from '../share/util';

const defaultState: UserState = {
  userInfo: getData('user'),
};

const UserContext = createContext<
  { state: UserState; dispatch: Dispatch } | undefined
>(undefined);

function userReducer(state: UserState, action: Action) {
  switch (action.type) {
    case ActionType.USER_LOGIN_SUCCESS:
      setData('user', action.payload?.userInfo);
      return {
        userInfo: action.payload?.userInfo,
      };
    case ActionType.USER_LOGOUT:
      clearData();
      return {
        userInfo: null,
      };
    default:
      return state;
  }
}

export default function UserProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(userReducer, defaultState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used inside a UserProvider');
  }

  return context;
}
