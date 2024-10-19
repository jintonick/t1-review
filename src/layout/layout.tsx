import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "@app/layout/blocks/header";

const Layout = () => {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div className="shadow-[0px_1px_10px_0px_#00000024] z-10 relative ">
        <Header />
      </div>
      <div className="flex-grow flex" >
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;

