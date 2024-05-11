import React from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/header/Header";
import {Toaster} from "react-hot-toast";

const Layout = () => {
  return (
    <div>
      <Toaster/>
      <Navbar />

      {/* <Header/> */}
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
