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
import { motion } from "framer-motion";

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
        {/* Timeline Line */}
        <Box
          sx={{
            position: "absolute",
            top: "120px",
            bottom: "60px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "4px",
            background: "linear-gradient(to bottom, #00ffc8, transparent)",
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
              color: "#00ffc8",
              fontWeight: "bold",
              mb: 4,
              textShadow: "0 0 10px rgba(0,255,200,0.7)",
              fontFamily: '"Orbitron", "Audiowide", monospace',
            }}
          >
            My Experience
          </Typography>

          {/* Divider Atas */}
          <Divider
            sx={{
              mb: 8,
              borderColor: "rgba(0,255,200,0.3)",
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
              {/* Timeline Node */}
              <Box
                sx={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  backgroundColor: "#00ffc8",
                  boxShadow: "0 0 20px 6px rgba(0,255,200,0.8)",
                  zIndex: 5,
                }}
              />

              {/* Animated Experience Card */}
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                style={{ width: isMobile ? "90%" : "40%" }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    backgroundColor: "rgba(10,20,30,0.95)",
                    border: "1px solid rgba(0,255,200,0.2)",
                    borderRadius: 3,
                    boxShadow: "0 0 25px rgba(0,255,200,0.25)",
                    position: "relative",
                    zIndex: 2,
                  }}
                >
                  {/* Header Bar */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      px: 2,
                      py: 1,
                      bgcolor: "rgba(20,30,50,0.9)",
                      borderBottom: "1px solid rgba(0,255,200,0.15)",
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
                      sx={{ color: "#00ffc8", mb: 2 }}
                    >
                      {exp.company} • {exp.period}
                    </Typography>
                    {exp.description.map((pt, idx) => (
                      <Typography
                        key={idx}
                        sx={{
                          color: "#ccd6f6",
                          fontSize: "0.95rem",
                          mb: 1,
                          lineHeight: 1.6,
                        }}
                      >
                        • {pt}
                      </Typography>
                    ))}
                  </Box>
                </Paper>
              </motion.div>
            </Box>
          ))}

          {/* Divider bawah */}
          <Divider
            sx={{
              mt: 10,
              borderColor: "rgba(0,255,200,0.3)",
            }}
          />
        </Container>
      </Box>
    </TorchRevealSection>
  );
}
