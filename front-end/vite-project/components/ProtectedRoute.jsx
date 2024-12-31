import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Check if there is a valid token in localStorage
  const isAuthenticated = localStorage.getItem('token');

  // If authenticated, render the protected children (e.g., Adminhome page)
  // Otherwise, redirect to the login page
  return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
