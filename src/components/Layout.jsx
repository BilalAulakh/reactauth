import React from "react";
import ProductNave from "./ProductNave";
import { Outlet } from "react-router-dom";

const ProductLayout = () => {
  return (
    <div>
      <ProductNave />

      <Outlet />

      
    </div>
  );
};

export default ProductLayout;
