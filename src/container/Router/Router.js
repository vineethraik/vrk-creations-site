import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { pageRoutes } from "constants/routeConstants";

export default function Router({ className }) {
  return (
    <div className={className}>
      <BrowserRouter basename="/site">
        <Routes>
          {pageRoutes.map((route, index) => {
            return (
              <Route
                key={index}
                exact
                path={route.path}
                element={route.element}
              />
            );
          })}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
