import { pageUrls } from "constants/routeConstants.js";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout as logoutApi } from "services/auth.js";
import { logout } from "state/slice/auth.js";

export default function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    logoutApi().then((res) => {
      if (res.status === "success") {
        dispatch(logout());
        navigate(pageUrls.HOME);
      }
    });
  });
  return <div>Logout</div>;
}
