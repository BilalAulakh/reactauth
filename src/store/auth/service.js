import { createAsyncThunk } from "@reduxjs/toolkit";

import toast, { Toaster } from "react-hot-toast";
import { getcurrentuser, loginApi, registerApi } from "./constraint";
// import axiosImage from "../../helper/api-image";
import axios from "axios";

export const registerFunApi = createAsyncThunk(
  "auth/register",
  async ({ data, onSuccess }) => {
    console.log("total data is ", data);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/" + registerApi,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            "Content-type": "multipart/form-data",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*", // GET, POST, PUT, DELETE, OPTIONS
            "Access-Control-Allow-Credentials": true,
          },
        }
      );
      console.log("response in registerFunApi => ", response.data);

      if (response.data.success === true) {
        toast.success(response.data.message);

        console.log(response.data.message);
        if (onSuccess) {
          onSuccess();
        }

        return response.data.data;
      } else {
        console.log("Error response in registerFunApi  => ", response.data);
        const err =
          response?.data?.message ||
          response?.message ||
          "Something went wrong!";
        console.log("err: ", err);
        toast.error(err);
        throw new Error(err);
      }
    } catch (error) {
      console.log("Error in registerFunApi ", error);
      let err =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong!";
      if (err === "Network Error") {
        err = "Please check your internet connection";
      }
      // toast.error(err);
      throw new Error(err);
    }
  }
);

export const loginFunApi = createAsyncThunk(
  "auth/login",
  async ({ data, onSuccess }) => {
    console.log("total data is ", data);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/" + loginApi,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Credentials": true,
          },
        }
      );
      console.log("response in loginFunApi => ", response.data.data);
    
      if (response.data.success === true) {

        const token=response.data.data.acessToken

        localStorage.setItem('acessToken', token);
      
        toast.success(response.data.message);

        if (onSuccess) {
          onSuccess();
        }
        return response.data.data;
      } else {
        console.log("Error response in loginFunApi  => ", response.data);
        const err =
          response?.data?.message ||
          response?.message ||
          "Something went wrong!";
        console.log("err: ", err);
        toast.error(err);
        throw new Error(err);
      }
    } catch (error) {
      console.log("Error in loginFunApi ", error);
      let err =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong!";
      if (err === "Network Error") {
        err = "Please check your internet connection";
      }
      // toast.error(err);
      throw new Error(err);
    }
  }
);

export const getCurrentUserDetail = createAsyncThunk(
  'auth/getCurrent',
  async ({ accessToken }) => {
    console.log('accessToken of user', accessToken);
    try {
      const response = await axios.get(
        'http://localhost:8000/api/v1/users/current-user',
        
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );

      console.log('response in getCurrentUserDetail => ', response.data.data);

      if (response.data.success === true) {
        // toast.success(response.data.message);
        return response.data.data;
      } else {
        console.log('Error response in getCurrentUserDetail  => ', response.data);
        const err = response?.data?.message || response?.message || 'Something went wrong!';
        console.log('err: ', err);
        toast.error(err);
        throw new Error(err);
      }
    } catch (error) {
      console.log('Error in getCurrentUserDetail ', error);
      let err = error?.response?.data?.message || error?.message || 'Something went wrong!';
      if (err === 'Network Error') {
        err = 'Please check your internet connection';
      }
      throw new Error(err);
    }
  }
);
