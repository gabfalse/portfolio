import React from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import TorchRevealSection from "../Style/TorchRevealSection";

const experiences = [
  {
    title: "Full-stack Developer",
    company: "RUTEE",
    period: "Jun 2025 - Present",
    description: [
      "Built the entire platform from scratches",
      "Content management for articles & resources",
      "Full-stack dev, DB design, backend API, responsive UI/UX",
      "Deployment, hosting, maintenance",
    ],
  },
  {
    title: "Data Annotator",
    company: "Freelance / Self-Employed",
    period: "Jul 2024 – Present",
    description: [
      "Prepared datasets and annotation for ML/AI projects especially in Audio, Image, and Video labeling",
      "Worked on CVAT",
    ],
  },
  {
    title: "Web Developer Assistant Team Lead",
    company: "GAOTek Inc",
    period: "May 2025 – Jul 2025",
    description: [
      "Managed & guided a team of 30+",
      "Task assignment, onboarding, attendance",
      "Led meetings and process improvements",
    ],
  },
  {
    title: "Web Developer",
    company: "GAOTek Inc",
    period: "Mar 2025 – May 2025",
    description: [
      "Oversaw content upload & management",
      "Ensured brand consistency and UX optimization",
    ],
  },
  {
    title: "Social Media Team Leader",
    company: "Oigetit.ai",
    period: "Jan 2024 – Mar 2025",
    description: [
      "Manage team including assistance in recruitment, training, and scheduling",
      "Ensured brand consistency and Visibility",
    ],
  },
  {
    title: "Social Media Manager",
    company: "Oigetit.ai",
    period: "Aug 2024 – Jan 2025",
    description: [
      "Delivering high quality design for brand consistency",
      "SEO optimization and audience engagement",
    ],
  },
];

export default function Experience() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <TorchRevealSection radius={300}>
      <Box>
        {/* Garis timeline di tengah */}
        <Box
          sx={{
            position: "absolute",
            top: "120px",
            bottom: "60px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "4px",
            background: "linear-gradient(to bottom, #00d4ff, transparent)",
            zIndex: 1,
            borderRadius: 2,
          }}
        />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{
              color: "#00d4ff",
              fontWeight: "bold",
              mb: 4,
              textShadow: "0 0 10px rgba(0,212,255,0.7)",
            }}
          >
            My Experience
          </Typography>

          {/* Divider atas */}
          <Divider
            sx={{
              mb: 8,
              borderColor: "rgba(0,212,255,0.4)",
            }}
          />

          {experiences.map((exp, i) => (
            <Box
              key={i}
              sx={{
                display: "flex",
                justifyContent: isMobile
                  ? "center"
                  : i % 2 === 0
                  ? "flex-end"
                  : "flex-start",
                mb: 6,
                position: "relative",
              }}
            >
              {/* === NODE DI GARIS TIMELINE === */}
              <Box
                sx={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  backgroundColor: "#00d4ff",
                  boxShadow: "0 0 20px 6px rgba(0,212,255,0.8)", // efek glow
                  zIndex: 5, // di atas TorchReveal
                }}
              />

              {/* === KARTU EXPERIENCE === */}
              <Paper
                elevation={0}
                sx={{
                  width: isMobile ? "90%" : "40%",
                  backgroundColor: "rgba(10,20,40,0.95)",
                  border: "1px solid rgba(0,212,255,0.2)",
                  borderRadius: 3,
                  boxShadow: "0 0 20px rgba(0,212,255,0.3)",
                  position: "relative",
                  zIndex: 2,
                }}
              >
                {/* Header */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    px: 2,
                    py: 1,
                    bgcolor: "rgba(20,30,50,0.9)",
                  }}
                >
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      bgcolor: "#ff5f56",
                    }}
                  />
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      bgcolor: "#ffbd2e",
                    }}
                  />
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      bgcolor: "#27c93f",
                    }}
                  />
                </Box>

                {/* Content */}
                <Box sx={{ p: 3, textAlign: "left" }}>
                  <Typography variant="h6" sx={{ color: "#fff", mb: 1 }}>
                    {exp.title}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "#00d4ff", mb: 2 }}
                  >
                    {exp.company} • {exp.period}
                  </Typography>
                  {exp.description.map((pt, idx) => (
                    <Typography
                      key={idx}
                      sx={{ color: "#ccd6f6", fontSize: "0.95rem", mb: 1 }}
                    >
                      • {pt}
                    </Typography>
                  ))}
                </Box>
              </Paper>
            </Box>
          ))}

          {/* Divider bawah */}
          <Divider
            sx={{
              mt: 10,
              borderColor: "rgba(0,212,255,0.4)",
            }}
          />
        </Container>
      </Box>
    </TorchRevealSection>
  );
}
