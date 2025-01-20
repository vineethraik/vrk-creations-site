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
// const initialState = {
//   roles: ["user", "admin"],
//   avatar: [
//     "https://pps.whatsapp.net/v/t61.24694-24/383774151_873298634510851_5474211072625711043_n.jpg?stp=dst-jpg_tt6&ccb=11-4&oh=01_Q5AaIDY80Ux1H4UKvh3bfvAJ4Th3HCOKnXQj3gSVfNx6YPRO&oe=676D8AAE&_nc_sid=5e03e0&_nc_cat=111",
//     "https://imgs.search.brave.com/7LmnBhwmh78tbrNCkc7jDdpz8MvtrYgw_-dy02K9YM8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTM4/NzIyNjE2My9waG90/by9wb3J0cmFpdC1v/Zi1hLWxpdHRsZS1i/b3ktd2l0aC1hLXBs/YXN0ZXItb24taGlz/LWFybS1hZnRlci1h/bi1pbmplY3Rpb24u/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PTNkbG9fenR1UkV2/SldMTmJkcWxnR2N6/dGNlQmdrNXFEZFU3/dWxZYUVya2s9",
//   ],
//   avatarSelector: 0,
//   phone: {
//     contact: "7337688347",
//     verified: true,
//     hasPhoneNumber: true,
//   },
//   email: "",
//   name: "VRK creations",
// };

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
      state = {
        ...state,
        ...initialState,
      };
    },
  },
});

export const { setAuthData, logout } = authSlice.actions;
export default authSlice.reducer;
