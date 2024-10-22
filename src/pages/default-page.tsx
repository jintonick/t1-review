import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "@app/utils/auth-provider";

const DefaultPage = () => {
  const auth = useAuthContext();

  if (auth?.userType === "expert") {
    return <Navigate to="/my-meet" replace />;
  } else {
    return <Navigate to="/projects" replace />;
  }
};

export default DefaultPage;