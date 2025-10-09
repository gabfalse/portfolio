import { Box } from "@mui/material";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

import HeroSection from "../Components/HeroSection";
import Github from "./Blog";

export default function HomePage() {
  return (
    <Box
      sx={{
        backgroundColor: "#222",

        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />
      {/* Main Section */}
      <Box sx={{ flex: 1 }}>
        <HeroSection />
      </Box>
      <Footer />
    </Box>
  );
}
