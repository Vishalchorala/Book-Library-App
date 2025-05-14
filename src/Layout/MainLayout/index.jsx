import React from "react";
import Navbar from "../../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer";
import PrivateRoute from "../../Route/PrivateRoute";

const MainLayout = () => {
  return (
    <>
      <div className="h-dvh flex flex-col">
        <Navbar />
        <div className="flex-grow pt-19">
          <PrivateRoute>
            <Outlet />
          </PrivateRoute>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
