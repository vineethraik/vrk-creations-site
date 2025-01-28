import React from "react";
import Home from "container/Home/Home";
import { ContactUs } from "container/ContactUs/ContactUs";
import { authRoles } from "./authOptionsConstants.js";
import { LoginPage } from "container/Auth/LoginPage/LoginPage.js";
import { PhoneLogin } from "container/Auth/PhoneLogin/PhoneLogin.js";
import ProfilePage from "container/User/ProfilePage/ProfilePage.js";
import Logout from "container/Auth/Logout/Logout.js";

export const BUILD_STATUS = {
  COMING_SOON: "coming soon",
  COMPLETE: "complete",
  BETA: "beta",
  NEW: "new",
};

export const routeTags = {
  HOME: "HOME",
  SERVICES: "SERVICES",
  PORTFOLIO: "PORTFOLIO",
  PROFILES: "PROFILES",
  PROJECTS: "PROJECTS",
  ABOUT: "ABOUT",
  CONTACT_US: "CONTACT_US",
  LOGIN: "LOGIN",
  PROFILE: "PROFILE",
  ADMIN: "ADMIN",
};

export const pageUrls = {
  HOME: "/",
  // SERVICES: "/services",
  // PORTFOLIO: "/portfolio",
  // PROFILES: "/profiles",
  // PROJECTS: "/projects",
  // ABOUT: "/about",
  CONTACT_US: "/contact-us",
  // LOGIN: "/login",
  // PROFILE: "/profile",
  // ADMIN: "/admin",
}

export const pageRoutes = [
  {
    name: "Home",
    tag: routeTags.HOME,
    path: pageUrls.HOME,
    buildStatus: BUILD_STATUS.COMING_SOON,
    element: <Home />,
  },
  // {
  //   name: "Services",
  //   tag: routeTags.SERVICES,
  //   path: pageUrls.SERVICES,
  //   buildStatus: BUILD_STATUS.COMING_SOON,
  //   element: (
  //     <PageContainer
  //       containerClassName={"d-flex justify-content-center align-items-center"}
  //     >
  //       Services
  //     </PageContainer>
  //   ),
  // },
  // {
  //   name: "Portfolio",
  //   tag: routeTags.PORTFOLIO,
  //   path: pageUrls.PORTFOLIO,
  //   buildStatus: BUILD_STATUS.BETA,
  //   element: (
  //     <PageContainer
  //       containerClassName={"d-flex justify-content-center align-items-center"}
  //     >
  //       Portfolio
  //     </PageContainer>
  //   ),
  // },
  // {
  //   name: "Profiles",
  //   tag: routeTags.PROFILES,
  //   path: pageUrls.PROFILES,
  //   buildStatus: BUILD_STATUS.COMING_SOON,
  //   element: (
  //     <PageContainer
  //       containerClassName={"d-flex justify-content-center align-items-center"}
  //     >
  //       Profiles
  //     </PageContainer>
  //   ),
  // },
  // {
  //   name: "Projects",
  //   tag: routeTags.PROJECTS,
  //   path: pageUrls.PROJECTS,
  //   buildStatus: BUILD_STATUS.COMING_SOON,
  //   element: (
  //     <PageContainer
  //       containerClassName={"d-flex justify-content-center align-items-center"}
  //     >
  //       Projects
  //     </PageContainer>
  //   ),
  // },
  // {
  //   name: "About",
  //   tag: routeTags.ABOUT,
  //   path: pageUrls.ABOUT,
  //   buildStatus: BUILD_STATUS.NEW,
  //   element: (
  //     <PageContainer
  //       containerClassName={"d-flex justify-content-center align-items-center"}
  //     >
  //       About
  //     </PageContainer>
  //   ),
  // },
  {
    name: "Contact Us",
    tag: routeTags.CONTACT_US,
    path: pageUrls.CONTACT_US,
    buildStatus: BUILD_STATUS.NEW,
    element: <ContactUs />,
  },
];

export const authUrls = {
  login: "/auth/login",
  logout: "/auth/logout",
  profile: "/auth/profile",
  admin: "/auth/admin",
  phone_login: "/auth/phone_login",
  oauth_login: ``,
};

export const authRoutes = [
  {
    name: "Login",
    path: authUrls.login,
    element: <LoginPage />,
    access: [authRoles.ANONYMOUS],
  },
  {
    name: "Phone Login",
    path: authUrls.phone_login,
    element: <PhoneLogin />,
    access: [authRoles.ANONYMOUS],
  },
  {
    name: "Logout",
    path: authUrls.logout,
    element: <Logout />,
    access: [authRoles.USER, authRoles.ADMIN],
  },

  {
    name: "Profile",
    path: authUrls.profile,
    element: <ProfilePage/>,
    access: [authRoles.USER, authRoles.ADMIN],
  },
  {
    name: "Admin",
    path: authUrls.admin,
    element: <div>admin</div>,
    access: [authRoles.ADMIN],
  },
];
