import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DynamicLoader } from "../pages/common";
import Home from "../pages/Home";

const NoMatch = DynamicLoader(() => import("../pages/NoMatch"));

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
