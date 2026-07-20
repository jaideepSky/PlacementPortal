import React from "react";
import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";
import { useCurrentUser } from "../hooks/useAuth";

function ProtectedRoute({ allowedRoles }) {
  const { isLoading } = useCurrentUser();
  const { isAuthenticated, user, authChecked } = useSelector(
    (state) => state.auth,
  );

  if (!authChecked) {
    return <h3>Loading...</h3>;
  }

  if (isLoading) {
    return (
      <>
        <h3>Loading...</h3>
      </>
    );
  }

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

export default ProtectedRoute;
