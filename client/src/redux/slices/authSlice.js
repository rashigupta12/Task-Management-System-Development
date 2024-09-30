import { createSlice } from "@reduxjs/toolkit";
import { user } from "../../assets/data";

const initialState = {
  user: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : user,

  isSidebarOpen: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state, action) => {
      state.user = null; // Clear the user from the Redux store
      localStorage.removeItem("userInfo"); // Clear user info from local storage
    },
    setOpenSidebar: (state, action) => {
      state.isSidebarOpen = action.payload;
    },
  },
});

export const { setCredentials, logout, setOpenSidebar } = authSlice.actions;

export default authSlice.reducer;
