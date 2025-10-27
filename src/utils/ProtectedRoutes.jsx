import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
  const passkey=localStorage.getItem("passkey");
  return passkey?<Outlet/>:<Navigate to="/login"/>
};

export default ProtectedRoutes