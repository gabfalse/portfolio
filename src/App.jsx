import { Box } from "@mui/material";
import React from "react";
import {
  BrowserRouter,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Blog from "./Pages/Blog";
import Navbar from "./Components/Navbar";

import ProjectShowcase from "./Pages/ProjectShowcase.jsx";
import AdminPage from "./Pages/AdminPage.jsx";
import LoginPage from "./Pages/LoginPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/project" element={<ProjectShowcase />} />
        <Route path="/inigabrielya" element={<AdminPage />} />
        <Route path="/mauaturdulu" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
