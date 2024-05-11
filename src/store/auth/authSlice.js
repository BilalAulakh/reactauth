import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUserDetail, loginFunApi, registerFunApi } from "./service";

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false, // Added isAuthenticated field
    isLoading: false,
    dataFetched: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerFunApi.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginFunApi.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCurrentUserDetail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerFunApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dataFetched = true;
        state.user = action.payload;
        state.isAuthenticated = true; 
      })
      .addCase(loginFunApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dataFetched = true;
        state.user = action.payload;
        state.isAuthenticated = true; 
      })
      .addCase(getCurrentUserDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dataFetched = true;
        state.user = action.payload;
        state.isAuthenticated = true; 
      })
      .addCase(registerFunApi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        state.dataFetched = true;
        state.user = null;
        state.isAuthenticated = false; 
      })
      .addCase(loginFunApi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        state.dataFetched = true;
        state.user = null;
        state.isAuthenticated = false; // Ensure isAuthenticated is false on rejection
      })
      .addCase(getCurrentUserDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        state.dataFetched = true;
        state.user = null;
        state.isAuthenticated = false; // Ensure isAuthenticated is false on rejection
      });
  },
});

// Reducer
export const authReducer = authSlice.reducer;
