import {
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import {default as authReducer} from "./slice/auth.js";

const reducer = combineReducers({
  auth: authReducer,});

export const store = configureStore({
  reducer: reducer,
});
