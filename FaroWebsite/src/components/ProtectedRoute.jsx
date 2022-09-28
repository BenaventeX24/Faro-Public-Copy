import React from 'react';
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
  let auth = { islogged: localStorage.getItem('islogged') }
  if (auth.islogged === 'true') {
    return <Outlet />
  }
  return <Navigate to="/login" />
}
export default ProtectedRoute
