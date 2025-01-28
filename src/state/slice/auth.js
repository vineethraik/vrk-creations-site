import { createSlice } from "@reduxjs/toolkit";
import { authRoles } from "constants/authOptionsConstants.js";

const initialState = {
  roles: [authRoles.ANONYMOUS],
  name: "John Doe",
  avatar: [""],
  avatarSelector: 0,
  phone: "",
  email: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthData: (state, action) => {
      console.log("setAuthData", state, action);

      return {
        ...state,
        ...action.payload,
      };
    },
    logout: (state) => {
     return {
        ...initialState,
      };
    },
  },
});

export const { setAuthData, logout } = authSlice.actions;
export default authSlice.reducer;
