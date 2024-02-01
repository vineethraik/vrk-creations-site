import PageContainer from "container/PageContainer/PageContainer";
// import { RouterProvider } from "react-router-dom";
import Home from "container/Home/Home";
import React from "react";
import {
  BrowserRouter,
  // createBrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
// import { createBrowserRouter } from "../../../node_modules/react-router-dom/dist/index";
// const public_url = process.env.PUBLIC_URL && "";
// const router = createBrowserRouter([
//   {
//     path: `${public_url}/`,
//     element: <Home />,
//   },
//   {
//     path: `${public_url}/test`,
//     element: <PageContainer>Test</PageContainer>,
//   },
// ]);

export default function Router() {
  return (
    <>
      <BrowserRouter basename="/site">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<PageContainer>Test</PageContainer>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
