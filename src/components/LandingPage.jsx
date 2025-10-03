import React, { useEffect, useState } from "react";
import { Box, Typography, Container, Grid, Fade } from "@mui/material";
import MagicBackground from "../Style/MagicBackground";

function LandingPage() {
  const [visible, setVisible] = useState(true);
  const [hue, setHue] = useState(200);

  // torch state
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  // typing effect state
  const titles = [
    "Web Developer",
    "Data Annotator",
    "UI/UX & Graphic Designer",
  ];
  const [displayText, setDisplayText] = useState("");
  const [titleIndex, setTitleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  // scroll fade
  const handleScroll = () => {
    setVisible(window.scrollY < 300);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // animasi hue shifting
  useEffect(() => {
    let frame;
    const animate = () => {
      setHue((prev) => (prev + 1) % 360);
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, []);

  // typing effect
  useEffect(() => {
    const currentTitle = titles[titleIndex];
    let timeout;

    if (!deleting && charIndex < currentTitle.length) {
      timeout = setTimeout(() => {
        setDisplayText(currentTitle.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 120);
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayText(currentTitle.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      }, 80);
    } else if (!deleting && charIndex === currentTitle.length) {
      timeout = setTimeout(() => setDeleting(true), 1500);
    } else if (deleting && charIndex === 0) {
      setDeleting(false);
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, titleIndex]);

  // torch effect handler
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <Fade in={visible} timeout={600}>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",

          zIndex: 2, // konten tetap di atas background
        }}
      >
        {/* === MAGIC BACKGROUND === */}
        <MagicBackground />
        {/* ================= MAIN CONTENT ================= */}
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 3 }}>
          <Grid container spacing={4} direction="column" alignItems="center">
            {/* Title */}
            <Typography
              variant="h3"
              fontWeight="bold"
              mt={5}
              gutterBottom
              sx={{
                background: `linear-gradient(90deg, hsla(${hue},100%,70%,1), hsla(${
                  (hue + 90) % 360
                },100%,70%,1))`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 0 12px rgba(255,255,255,0.6)",
              }}
            >
              Gabriel Moh AF
            </Typography>

            {/* Availability futuristic text */}
            <Typography
              variant="subtitle1"
              sx={{
                fontFamily: '"Orbitron", "Audiowide", monospace',
                fontSize: { xs: "1rem", sm: "1.2rem" },
                fontWeight: 600,
                background: "linear-gradient(90deg, #00f5ff, #ff00ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow:
                  "0 0 12px rgba(0,255,255,0.5), 0 0 18px rgba(255,0,255,0.4)",
                letterSpacing: "1.5px",
                mb: 0.5,
                animation: "pulseGlow 3s infinite alternate",
                "@keyframes pulseGlow": {
                  "0%": { textShadow: "0 0 8px rgba(0,255,255,0.5)" },
                  "100%": { textShadow: "0 0 20px rgba(255,0,255,0.8)" },
                },
              }}
            >
              🚀 Available for Work, Freelance & Collaborations
            </Typography>

            {/* Github link */}
            <Typography
              component="a"
              href="https://github.com/gabfalse" // ganti dengan GitHub kamu
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                fontFamily: '"Orbitron", monospace',
                fontSize: { xs: "0.9rem", sm: "1rem" },
                fontWeight: 500,
                textDecoration: "none",
                background: "linear-gradient(90deg, #ff9900, #ff00ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 0 10px rgba(255,153,0,0.5)",
                transition: "0.3s ease",
                "&:hover": {
                  textShadow: "0 0 20px rgba(255,0,255,0.8)",
                },
              }}
            >
              🌐 Check out my projects on GitHub
            </Typography>

            {/* Typing effect */}
            <Typography
              variant="h6"
              sx={{
                color: "text.secondary",
                fontFamily: "monospace",
                minHeight: "1.5em",
                "&::after": {
                  content: '"|"',
                  animation: "blink 1s step-end infinite",
                  marginLeft: "4px",
                },
                "@keyframes blink": {
                  "0%, 100%": { opacity: 1 },
                  "50%": { opacity: 0 },
                },
              }}
              gutterBottom
            >
              {displayText}
            </Typography>

            {/* Torch Reveal Box */}
            <Box
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
              sx={{
                maxWidth: 700,
                minHeight: { xs: 180, sm: 250 },
                mx: "auto",
                mt: 3,
                p: { xs: 2, sm: 3 },
                borderRadius: 2,
                position: "relative",
                overflow: "hidden",
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(4px)",
                userSelect: "none",
                cursor: "none",
                border: "1px solid rgba(255,255,255,0.3)",
                fontFamily: "monospace",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                textAlign: "center",
                "&::before": hovering
                  ? {
                      content: '""',
                      position: "absolute",
                      inset: 0,
                      background: `radial-gradient(circle 130px at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.95), transparent 80%)`,
                      WebkitMask: `radial-gradient(circle 130px at ${mousePos.x}px ${mousePos.y}px, #fff 80%, transparent 100%)`,
                      backdropFilter: "blur(6px)",
                      pointerEvents: "none",
                    }
                  : {},
                transition: "0.3s ease",
              }}
            >
              {/* Instruksi awal */}
              {!hovering && (
                <Typography
                  variant="body1"
                  sx={{
                    color: "rgba(255,255,255,0.6)",
                    fontStyle: "italic",
                    fontFamily: "monospace",
                    px: 2,
                  }}
                >
                  🔮 Click / Hover with the magic torch to reveal secrets ✨
                </Typography>
              )}

              {/* Isi teks tersembunyi */}
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                  lineHeight: 1.8,
                  color: "transparent",
                  transition: "0.2s ease",
                  maxWidth: "95%",
                  textAlign: "center",
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                }}
              >
                <Box
                  component="span"
                  sx={{
                    display: "block",
                    fontSize: { xs: "1.6rem", sm: "2.2rem" },
                    fontFamily: '"Orbitron", "Audiowide", monospace',
                    fontWeight: 700,
                    background: hovering
                      ? "linear-gradient(90deg, #00f5ff, #ff00ff)"
                      : "transparent",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    textShadow: hovering
                      ? "0 0 15px rgba(0, 255, 255, 0.7)"
                      : "none",
                    mb: 2,
                    transition: "all 0.4s ease",
                  }}
                >
                  My Speciality
                </Box>
                <Box
                  component="span"
                  sx={{
                    color: hovering ? "rgba(255,255,255,0.9)" : "transparent",
                    transition: "color 0.3s ease",
                  }}
                >
                  Specialize in Web Development, Data Annotation, and UI/UX &
                  Graphic Design. I enjoy building user-friendly apps, preparing
                  quality datasets for AI, and crafting designs that communicate
                  ideas clearly.
                </Box>
              </Typography>
            </Box>
          </Grid>
        </Container>
      </Box>
    </Fade>
  );
}

export default LandingPage;
