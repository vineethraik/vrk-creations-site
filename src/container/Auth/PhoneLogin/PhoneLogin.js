import React, { useEffect, useState } from "react";
import "./PhoneLogin.scss";
import PageContainer from "container/PageContainer/PageContainer.js";
import { sendOTP, verifyOTP } from "services/auth.js";
import { useTimeCounter } from "util/time.js";

export const PhoneLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [formState, setFormState] = useState(formStateKeys.empty);

  const { minutes, seconds, setCount, setOnZero } = useTimeCounter();

  const {
    sendOtpButtonText,
    enableOTPExpiryTag,
    phoneFieldDisabled,
    sendOtpButtonDisabled,
    enableVerifyOTPForm,
  } = formStates[formState] || {};

  const onPhoneNumberChanged = (e) => {
    e.stopPropagation();
    let contact = e?.target?.value || "";
    setPhoneNumber(contact);
    if (!String(contact).match(/^[0-9]{10,12}$/)) {
      e?.target?.setCustomValidity("Invalid Contact number");
      e?.target?.reportValidity();
    } else {
      e?.target?.setCustomValidity("");
      e?.target?.reportValidity();
    }
  };

  const onOtpChanged = (e) => {
    e.stopPropagation();
    let otp = e?.target?.value || "";
    setOtp(otp);
    if (!String(otp).match(/^[0-9]{6}$/)) {
      e?.target?.setCustomValidity("Invalid OTP");
      e?.target?.reportValidity();
    } else {
      e?.target?.setCustomValidity("");
      e?.target?.reportValidity();
    }
  };

  const onSendOTPClicked = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setFormState(formStateKeys.otpSent);

    sendOTP(phoneNumber).then((res) => {
      if (res.status === "success") {
        setFormState(formStateKeys.otpSent);
        setCount(120);
        setOnZero(() => () => {
          setFormState(formStateKeys.otpExpired);
          console.log("zero");
        });
      } else {
        setFormState(formStateKeys.otpNotSent);
        alert("Error Sending OTP");
      }
    });
  };

  const onVerifyOTPClicked = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(otp);
    verifyOTP(phoneNumber, otp).then((res) => {
      if (res.status === "success") {
      } else {
        alert("Error Verifying OTP");
      }
    });
  };
  return (
    <PageContainer disableAuthIcon={true}>
      {" "}
      <div className="phone__login__page">
        <div className="phone__login__page__auth__container">
          <span className="phone__login__page__auth__title">Phone Login</span>
          <form className="phone__login__page__auth__form">
            <label
              className="phone__login__page__auth__form__label"
              htmlFor="phone"
            >
              Phone Number
            </label>
            <input
              className="phone__login__page__auth__form__input"
              name="phone"
              value={phoneNumber}
              onChange={onPhoneNumberChanged}
              formTarget="phone"
              type="phone"
              pattern="^[0-9]{10,12}$"
              title="Phone number must be 10-12 digits"
              placeholder="Phone Number"
              disabled={phoneFieldDisabled}
            />
            <button
              onClick={onSendOTPClicked}
              disabled={sendOtpButtonDisabled}
              className="phone__login__page__auth__form__button phone__login__page__auth__form__button__send__otp"
            >
              {sendOtpButtonText}
            </button>
            {enableOTPExpiryTag && (
              <>
                <div className="phone__login__page__auth__form__otp__resend__timer">
                  <span className="phone__login__page__auth__form__otp__resend__timer__text">
                    Resend OTP in{" "}
                  </span>
                  <span className="phone__login__page__auth__form__otp__resend__timer__countdown">
                    {`${minutes}:${seconds}`}
                  </span>
                </div>
                <span
                  className="phone__login__page__auth__form__wrong__number__text"
                  onClick={() => {
                    setFormState(formStateKeys.empty);
                    setCount(0);
                  }}
                >
                  Wrong number?
                </span>
              </>
            )}
            {enableVerifyOTPForm && (
              <>
                <label
                  className="phone__login__page__auth__form__label"
                  htmlFor="otp"
                >
                  OTP
                </label>
                <input
                  className="phone__login__page__auth__form__input"
                  name="otp"
                  value={otp}
                  onChange={onOtpChanged}
                  formTarget="otp"
                  type="otp"
                  pattern="^[0-9]{6}$"
                  title="OTP must be 6 digits"
                  placeholder="OTP"
                />
                <button
                  onClick={onVerifyOTPClicked}
                  className="phone__login__page__auth__form__button phone__login__page__auth__form__button__verify__otp"
                >
                  Login
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </PageContainer>
  );
};

const formStateKeys = {
  empty: "empty",
  otpSent: "otpSent",
  otpNotSent: "otpNotSent",
  otpExpired: "otpExpired",
};

const formStates = {
  [formStateKeys.empty]: {
    sendOtpButtonText: "Send OTP",
    sendOtpButtonDisabled: false,
    phoneFieldDisabled: false,
    enableOTPExpiryTag: false,
    enableVerifyOTPForm: false,
  },
  [formStateKeys.otpSent]: {
    sendOtpButtonText: "Resend OTP",
    sendOtpButtonDisabled: true,
    phoneFieldDisabled: true,
    enableOTPExpiryTag: true,
    enableVerifyOTPForm: true,
  },
  [formStateKeys.otpNotSent]: {
    sendOtpButtonText: "Send OTP",
    sendOtpButtonDisabled: false,
    phoneFieldDisabled: false,
    enableOTPExpiryTag: false,
    enableVerifyOTPForm: false,
  },
  [formStateKeys.otpExpired]: {
    sendOtpButtonText: "Resend OTP",
    sendOtpButtonDisabled: false,
    phoneFieldDisabled: false,
    enableOTPExpiryTag: false,
    enableVerifyOTPForm: false,
  },
};
