import React from "react";
import Home from "container/Home/Home";
import PageContainer from "container/PageContainer/PageContainer";
import { ContactUs } from "container/ContactUs/ContactUs";

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
};

export const pageRoutes = [
  {
    name: "Home",
    tag: routeTags.HOME,
    path: "/",
    buildStatus: BUILD_STATUS.COMING_SOON,
    element: <Home />,
  },
  // {
  //   name: "Services",
  //   tag: routeTags.SERVICES,
  //   path: "/services",
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
  //   path: "/portfolio",
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
  //   path: "/profiles",
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
  //   path: "/projects",
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
  //   path: "/about",
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
    path: "/about",
    buildStatus: BUILD_STATUS.NEW,
    element: <ContactUs />,
  },
];
