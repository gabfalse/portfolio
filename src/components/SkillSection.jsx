import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function SkillSection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // cek layar kecil

  const [skills] = useState([
    { name: "React", level: 85, stars: 4 },
    { name: "PHP", level: 80, stars: 4 },
    { name: "MySQL", level: 75, stars: 4 },
    { name: "MUI", level: 90, stars: 5 },
    { name: "WordPress", level: 70, stars: 3 },
    { name: "CVAT", level: 60, stars: 3 },
    { name: "Figma", level: 60, stars: 3 },
    { name: "Canva", level: 85, stars: 4 },
    { name: "Photoshop", level: 60, stars: 2 },
  ]);

  const [selectedSkill, setSelectedSkill] = useState(skills[0]);

  const data = {
    labels: skills.map((s) => s.name),
    datasets: [
      {
        label: "Skill Level",
        data: skills.map((s) => s.level),
        backgroundColor: "rgba(0, 255, 200, 0.2)",
        borderColor: "#00ffc8",
        pointBackgroundColor: "#00ffc8",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#00ffc8",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: { color: "rgba(255,255,255,0.1)" },
        grid: { color: "rgba(255,255,255,0.1)" },
        pointLabels: {
          color: "#00ffc8",
          font: { size: isMobile ? 10 : 13 },
        },
        ticks: { display: false },
        min: 0,
        max: 100,
      },
    },
    plugins: { legend: { display: false } },
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        setSelectedSkill(skills[index]);
      }
    },
  };

  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        color: "white",
        overflow: "hidden",
        py: 10,
      }}
    >
      {/* Background hanya di section ini */}
      <Particles
        id="tsparticles-skill"
        init={particlesInit}
        options={{
          background: { color: { value: "transparent" } },
          fpsLimit: 60,
          interactivity: {
            events: {
              onHover: { enable: true, mode: "repulse" },
              resize: true,
            },
            modes: { repulse: { distance: 100, duration: 0.4 } },
          },
          particles: {
            color: { value: "#00ffc8" },
            links: {
              color: "#00ffc8",
              distance: 150,
              enable: true,
              opacity: 0.4,
              width: 1,
            },
            move: { enable: true, speed: 2, outModes: { default: "bounce" } },
            number: { density: { enable: true, area: 800 }, value: 60 },
            opacity: { value: 0.5 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 5 } },
          },
          detectRetina: true,
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      />

      {/* Konten */}
      <Container sx={{ position: "relative", zIndex: 1 }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold", mb: 6 }}
        >
          Skills Overview
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row", // responsif
            justifyContent: "center",
            alignItems: "center",
            gap: 6,
          }}
        >
          {/* Radar Chart */}
          <Box
            sx={{
              width: isMobile ? "100%" : 450,
              height: isMobile ? 300 : 450,
            }}
          >
            <Radar data={data} options={options} />
          </Box>

          {/* Detail Card */}
          <Card
            sx={{
              bgcolor: "rgba(20,20,35,0.8)",
              color: "white",
              borderRadius: 3,
              p: 2,
              minWidth: isMobile ? "100%" : 280,
              backdropFilter: "blur(10px)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
            }}
          >
            <CardContent>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                {selectedSkill.name}
              </Typography>
              <Typography variant="h6" gutterBottom>
                {selectedSkill.level}% Proficiency
              </Typography>
              <Typography variant="body2" gutterBottom>
                {selectedSkill.level >= 80
                  ? "Advanced Level"
                  : selectedSkill.level >= 50
                  ? "Intermediate"
                  : "Beginner"}
              </Typography>
              <Box>
                {[...Array(5)].map((_, i) =>
                  i < selectedSkill.stars ? (
                    <StarIcon key={i} sx={{ color: "#00ffc8" }} />
                  ) : (
                    <StarBorderIcon key={i} sx={{ color: "#555" }} />
                  )
                )}
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
}
