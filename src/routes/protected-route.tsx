import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "@app/utils/auth-provider";

interface ProtectedRouteProps {
    allowedUserTypes: Array<"expert" | "client" | "user">;
    children: React.ReactNode;
}

const ProtectedRoute = ({ allowedUserTypes, children }: ProtectedRouteProps) => {
  const auth = useAuthContext();

  if (auth?.isAuth === null) {
    return null;
  }

  if (!auth?.isAuth || !auth.userType || !allowedUserTypes.includes(auth.userType)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
