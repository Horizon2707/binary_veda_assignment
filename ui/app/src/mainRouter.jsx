import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Signup from "./pages/SignUp";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

const MainRouter = () => (
  <Router>
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<Signup />} />
    </Routes>
  </Router>
);

export default MainRouter;
