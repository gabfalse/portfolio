import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ThemeModeProvider from "./Style/ThemeProvider";
import Home from "./Pages/Home";
import Admin from "./Pages/Admin";

import TorchOverlay from "./Style/TorchOverlay.jsx";
import Login from "./Pages/Login.jsx";

export default function App() {
  return (
    <ThemeModeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
        </Routes>

        {/* Torch selalu aktif */}
        <TorchOverlay enabled={true} />
      </Router>
    </ThemeModeProvider>
  );
}
