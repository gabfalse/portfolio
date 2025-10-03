import React, { useEffect, useState, useRef } from "react";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";

const projects = [
  {
    title: "AI Personality Bot",
    description: "An AI chatbot focused on personality and self-improvement.",
  },
  {
    title: "Rutee Social",
    description: "A social platform with connections, forums, and chat.",
  },
  {
    title: "Payment System",
    description: "Tripay integration for premium transactions.",
  },
  {
    title: "Profile & Matching",
    description: "Public profiles with career recommendations.",
  },
  {
    title: "Forum Chat",
    description: "Realtime forum chat based on personality types.",
  },
];

export default function ProjectSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [charIndex, setCharIndex] = useState(0);

  const sectionRef = useRef(null);
  const titleText = "My Projects";

  // Detect when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
            setDisplayText("");
            setCharIndex(0);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Typing effect for the title
  useEffect(() => {
    let timeout;
    if (isVisible && charIndex < titleText.length) {
      timeout = setTimeout(() => {
        setDisplayText(titleText.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 100);
    }
    return () => clearTimeout(timeout);
  }, [isVisible, charIndex]);

  return (
    <Box
      ref={sectionRef}
      sx={{
        py: 6,
        textAlign: "center",
      }}
    >
      {/* Typing Title */}
      <Typography
        variant="h5"
        sx={{
          mb: 4,
          fontWeight: "bold",
          background: "linear-gradient(90deg, #00ffc8, #00e0ff)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: "0 0 12px rgba(0,255,200,0.7)",
          fontFamily: '"Orbitron", "Audiowide", monospace',
          "&::after": {
            content: isVisible ? '"|"' : '""',
            animation: "blink 1s step-end infinite",
            marginLeft: "4px",
            color: "#00ffc8",
          },
          "@keyframes blink": {
            "0%, 100%": { opacity: 1 },
            "50%": { opacity: 0 },
          },
        }}
      >
        {displayText}
      </Typography>

      {/* Project Cards */}
      <Grid container spacing={2} justifyContent="center">
        {projects.map((project, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                border: "1px solid rgba(0,255,200,0.4)",
                borderRadius: 2,
                p: 1,
                background: "transparent", // no background
                backdropFilter: "none",
                boxShadow: isVisible
                  ? `0 0 ${6 + index * 2}px rgba(0,255,200,0.4)`
                  : "none",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(30px)",
                transition: `all 0.6s ease ${index * 0.15}s`,
              }}
            >
              <CardContent>
                <Typography
                  variant="subtitle1"
                  sx={{
                    mb: 1,
                    fontWeight: "bold",
                    background: "linear-gradient(90deg, #00ffc8, #00e0ff)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    textShadow: "0 0 8px rgba(0,255,200,0.6)",
                    fontFamily: '"Orbitron", monospace',
                  }}
                >
                  {project.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "rgba(200,255,255,0.85)",
                    fontSize: "0.8rem",
                    lineHeight: 1.5,
                  }}
                >
                  {project.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
