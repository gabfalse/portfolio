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

      <FadeSection id="skills">
        <SkillsSection />
      </FadeSection>

      <Box id="experience">
        <Experience />
      </Box>

      {/* <FadeSection id="projects">
        <ProjectsSection />
      </FadeSection> */}

      <Box id="contact">
        <ContactSection />
      </Box>
    </Box>
  );
}
