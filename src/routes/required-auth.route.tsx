import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "@app/utils/auth-provider";

interface RequiredAuthProps {
  children: React.ReactNode;
}

const RequiredAuth = ({ children }: RequiredAuthProps) => {
  const auth = useAuthContext();

  if (auth?.isAuth === null) {
    return null;
  }

  if (!auth?.isAuth) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default RequiredAuth;



