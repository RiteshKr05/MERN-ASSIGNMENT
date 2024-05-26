import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ isManager, children }) => {
  const token = localStorage.getItem('token');
  const isManagerToken = localStorage.getItem('isManager');

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (isManager && !isManagerToken) {
    return <Navigate to="/employees" />;
  }

  return children;
};

export default PrivateRoute;