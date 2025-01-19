import { BUILD_STATUS, pageRoutes } from "constants/routeConstants";
import React, { useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Header.scss";
import person from "assets/person.svg";
import three_dots from "assets/three-dots.svg";
import Popover, { PopoverTypes } from "common/Popover/Popover.js";
import { useOnClickOutside } from "util/events.js";
import {
  authDropdownOptions,
  authRoles,
} from "constants/authOptionsConstants.js";
import { AuthDropdown } from "components/AuthDropdown/AuthDropdown.js";
import { useSelector } from "react-redux";
import { getSortedRoles } from "util/auth.js";
import ImageNameTag from "common/ImageNameTag/ImageNameTag.js";

export function Header({ disableAuthIcon = false }) {
  const history = useLocation();
  const navDropDownRef = useRef();
  const navRef = useRef();
  const authRef = useRef();
  const [showNavDropdown, setShowNavDropdown] = useState(false);
  const [showAuthMenu, setShowAuthMenu] = useState(false);
  const { avatar, name, roles, email, phone } = useSelector(
    (state) => state.auth
  );

  useOnClickOutside([navDropDownRef, navRef], (e) => {
    e.stopPropagation();
    showNavDropdown && setShowNavDropdown(false);
  });
  // const hasDisplayableStatus = (buildStatus) => {
  //   return (
  //     buildStatus === BUILD_STATUS.COMING_SOON ||
  //     buildStatus === BUILD_STATUS.BETA ||
  //     buildStatus === BUILD_STATUS.NEW
  //   );
  // };
  return (
    <div className="page__header position-sticky top-0 d-flex flex-row justify-content-end shimmer">
      <div className="page__header__nav d-flex overflow-hidden position-relative">
        {pageRoutes.map((route, index) => {
          return (
            <NavLink
              key={index}
              className={`page__header__nav__item position-relative ${
                history.pathname === route.path ? "selected__route" : ""
              }`}
              to={route?.path}
            >
              {route?.name}
              {/* {hasDisplayableStatus(routes?.buildStatus) && (
                <span className="page__header__nav__item__status d-flex position-absolute">
                  {routes?.buildStatus}
                </span>
              )} */}
            </NavLink>
          );
        })}
      </div>
      <div
        ref={navRef}
        onClick={(e) => {
          e.stopPropagation();
          setShowNavDropdown(!showNavDropdown);
        }}
        className="page__header__menu d-flex p-1 position-relative"
      >
        <img
          className="page__header__menu__icon"
          src={three_dots}
          alt="menu icon"
        />
        {showNavDropdown && (
          <div
            ref={navDropDownRef}
            className="page__header__nav--dropdown d-flex flex-column position-absolute"
          >
            {pageRoutes.map((route, index) => {
              return (
                <>
                  {index !== 0 && (
                    <div
                      style={{
                        width: "100%",
                        margin: "3px 0",
                        height: "2px",
                        borderRadius: "1px",
                        background: "white",
                      }}
                    ></div>
                  )}
                  <NavLink
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowNavDropdown(false);
                    }}
                    className={`page__header__nav__item position-relative ${
                      history.pathname === route.path ? "selected__route" : ""
                    }`}
                    to={route?.path}
                  >
                    {route?.name}
                  </NavLink>
                </>
              );
            })}
          </div>
        )}
      </div>
      {!disableAuthIcon && (
        <div
          ref={authRef}
          className={`page__header__user d-flex  position-relative `}
        >
          <div
            className={`page__header__user__icon__container d-flex ${
              avatar[0] ? "" : "p-1"
            }`}
          >
            <ImageNameTag
              className={"page__header__user__icon cursor-pointer"}
              name={name}
              imageSrc={avatar[0]}
              alt="user icon"
              width={"100%"}
              height={"100%"}
              fontSize={"1rem"}
              onClick={(e) => {
                e.stopPropagation();
                setShowAuthMenu(!showAuthMenu);
              }}
            />
          </div>
          <Popover
            show={showAuthMenu}
            setShow={setShowAuthMenu}
            type={PopoverTypes.DROPDOWN_DOWN_LEFT}
            sourceRef={authRef}
          >
            <AuthDropdown
              options={
                authDropdownOptions({ username: name })[
                  getSortedRoles({ roles })[0]
                ]
              }
            />
          </Popover>
        </div>
      )}
    </div>
  );
}
