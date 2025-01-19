import React from "react";
import "./AuthDropdown.scss";
import { NavLink } from "react-router-dom";
import { Tag } from "common/Tag/Tag.js";

export const AuthDropdown = ({ options }) => {
  return (
    <div className="auth__dropdown">
      <div className="auth__dropdown__header">
        {options?.username && (
          <div className="auth__dropdown__header__user">
            {options?.username}
          </div>
        )}
        <div className="auth__dropdown__header__roles">
          {options?.roles.map((role, index) => <Tag key={index} tag={role} />)}
        </div>
      </div>
      <ul className="auth__dropdown__options">
        {options?.options?.map((option, index) => {
          return (
            <NavLink
              key={index}
              to={option.link}
              className={"auth__dropdown__options__item"}
            >
              {option.title}
            </NavLink>
          );
        })}
      </ul>
    </div>
  );
};
