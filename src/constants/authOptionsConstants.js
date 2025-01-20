import { NavLink } from "react-router-dom";
import { authUrls } from "./routeConstants.js";

export const authRoles = {
  ANONYMOUS: "anonymous",
  USER: "user",
  ADMIN: "admin",
};

export const rolePrecedence = {
  [authRoles.ANONYMOUS]: 0,
  [authRoles.USER]: 1,
  [authRoles.ADMIN]: 2,
};

export const authDropdownOptions = (userData) => {
  return {
    [authRoles.ANONYMOUS]: {
      title: "Anonymous",
      roles: ["anonymous"],
      options: [
        {
          title: "Login",
          link: authUrls.login,
        },
      ],
    },
    [authRoles.USER]: {
      roles: ["user"],
      username: userData.username,
      title: "User",
      options: [
        {
          title: "Profile",
          link: authUrls.profile,
        },
        {
          title: "Logout",
          link: authUrls.logout,
        },
      ],
    },
    [authRoles.ADMIN]: {
      title: "Admin",
      roles: ["admin", "user"],
      username: userData.username,
      options: [
        {
          title: "Profile",
          link: authUrls.profile,
        },
        {
          title: "AdminPanel",
          link: authUrls.admin,
        },
        {
          title: "Logout",
          link: authUrls.logout,
        },
      ],
    },
  };
};
