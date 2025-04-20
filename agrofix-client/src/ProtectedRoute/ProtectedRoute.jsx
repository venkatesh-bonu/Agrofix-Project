import Cookies from 'js-cookie'
import React from 'react'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    const jwt_token = Cookies.get("jwt_token");
    if(jwt_token === undefined){
        return <Navigate to = "/login" />
    }
    return children
}

export default ProtectedRoute