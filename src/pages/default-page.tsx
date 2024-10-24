// DefaultPage.tsx

import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "@app/utils/auth-provider";

const DefaultPage = () => {
  const auth = useAuthContext();

  if (auth?.userType === null) {
    return null; // Или индикатор загрузки
  }

  if (auth?.userType === "expert") {
    return <Navigate to="/my-meet" replace />;
  } else if (auth?.userType === "client") {
    return <Navigate to="/projects" replace />;
  } else {
    // Если userType неожиданное значение
    return <Navigate to="/login" replace />;
  }
};

export default DefaultPage;

