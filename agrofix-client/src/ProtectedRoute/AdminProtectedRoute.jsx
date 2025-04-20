import Cookies from 'js-cookie';
import React from 'react'
import { Navigate } from 'react-router-dom';

const AdminProtectedRoute = ({children}) => {
  const jwt_admin_token = Cookies.get("jwt_admin_token");
  if(jwt_admin_token === undefined){
    return <Navigate to = "/admin/login" />
  }
  return children
}

export default AdminProtectedRoute