import React from "react";
import SkillsSection from "../components/SkillSection";
import ProjectsSection from "../components/ProjectSection";
import ContactSection from "../components/ContactSection";
import { Box } from "@mui/material";
import LandingPage from "../components/LandingPage";
import Header from "../components/Header";
import Experience from "../components/Experience";
import FadeSection from "../Style/FadeSection";

export default function Home() {
  return (
    <Box>
      <Header />

      <Box id="landing">
        <LandingPage />
      </Box>
      <Box id="projects">
        <ProjectsSection />
      </Box>

      <Box id="skills">
        <SkillsSection />
      </Box>

      <Box id="experience">
        <Experience />
      </Box>

      <Box id="contact">
        <ContactSection />
      </Box>
    </Box>
  );
}
