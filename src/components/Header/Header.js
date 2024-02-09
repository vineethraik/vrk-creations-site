import { BUILD_STATUS, pageRoutes } from "constants/routeConstants";
import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Header.scss";
import person from "assets/person.svg";
import three_dots from "assets/three-dots.svg";

export function Header() {
  const history = useLocation();
  const [showNavDropdown, setShowNavDropdown] = useState(false);
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
        onClick={() => {
          setShowNavDropdown(true);
        }}
        className="page__header__menu d-flex p-1 position-relative"
      >
        <img
          className="page__header__menu__icon"
          src={three_dots}
          alt="menu icon"
        />
        {showNavDropdown && (
          <div className="page__header__nav--dropdown d-flex flex-column position-absolute">
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
                      setShowNavDropdown(false);
                      e.stopPropagation();
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
      <div className="page__header__user d-flex p-1 ">
        <img
          className="page__header__user__icon"
          src={person}
          alt="user icon"
        />
      </div>
    </div>
  );
}
