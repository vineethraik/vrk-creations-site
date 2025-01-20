import React, { useState } from "react";
import "./LoginPage.scss";
import googleImg from "assets/google.svg";
import phoneImg from "assets/phone.svg";
import PageContainer from "container/PageContainer/PageContainer.js";
import { useNavigate } from "react-router-dom";
import { authUrls } from "constants/routeConstants.js";

export const LoginPage = () => {
  const [enableGoogleOauth, setEnableGoogleOauth] = useState(false);
  const navigate = useNavigate();

  const onPhoneLoginButtonClicked = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(authUrls.phone_login);
  };

  const onGoogleOauthButtonClicked = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(authUrls.oauth_login);
  };
  return (
    <PageContainer disableAuthIcon={true}>
      <div className="login__page">
        <div className="login__page__auth__container">
          <span className="login__page__auth__title">Login</span>
          <div
            onClick={onGoogleOauthButtonClicked}
            className={`login__page__auth__button login__page__auth__button_google ${
              !enableGoogleOauth ? "disabled" : ""
            }`}
          >
            <img src={googleImg} alt="" />
            Google Oauth Login
          </div>
          <div
            onClick={onPhoneLoginButtonClicked}
            className="login__page__auth__button login__page__auth__button__phone"
          >
            <img src={phoneImg} alt="" />
            Phone OTP Login
          </div>
        </div>
      </div>
    </PageContainer>
  );
};
