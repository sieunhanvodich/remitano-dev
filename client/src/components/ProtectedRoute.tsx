import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/context';

interface Props {
  children: JSX.Element;
}

export default function ProtectedRoute({ children }: Props) {
  const {
    state: { userInfo },
  } = useUser();
  if (!userInfo) {
    return <Navigate to="/" replace />;
  }
  return children;
}
