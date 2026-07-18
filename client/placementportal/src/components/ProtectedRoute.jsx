import React from 'react'
import {Navigate , Outlet} from 'react-router'
import { useSelector } from 'react-redux'

function ProtectedRoute({allowedRoles}) {
    const {isAuthenticated , user} = useSelector((state)=>state.auth)

    // check for login status
    if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
    }

      // Check role (only if allowedRoles is provided)
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;

}

export default ProtectedRoute