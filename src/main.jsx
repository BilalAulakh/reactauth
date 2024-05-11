import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./Layout.jsx";
import Register from "./pages/register/Register.jsx";
import { Provider } from "react-redux";
import store from "./store/index.js";
import Login from "./pages/login/Login.jsx";
import Productform from "./pages/productform/Productform.jsx";
import Header from "./components/header/Header.jsx";
import ProductLayout from "./components/Layout.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>

      {/* <Route path="/add-product" element={<Productform />} /> */}
      <Route path="/" element={<Header />} />
      </Route>
      <Route path="/" element={<ProductLayout />}>

<Route path="/add-product" element={<Productform />} />

</Route>

      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
    
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
