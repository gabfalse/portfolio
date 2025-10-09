import { useState } from "react";
import {
  Avatar,
  Box,
  Typography,
  IconButton,
  Fade,
  Paper,
  Button,
} from "@mui/material";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import CloseIcon from "@mui/icons-material/Close";
import "@fontsource/poppins";
import Contact from "./Contact";
import Skill from "./Skill";

export default function HeroSection() {
  // 🧮 Hitung umur otomatis
  const birthDate = new Date("2003-05-14");
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  // 🎵 State untuk music player
  const [showPlayer, setShowPlayer] = useState(false);

  return (
    <Box
      sx={{
        color: "white",
        p: 4,
        textAlign: "center",
        mt: 5,
        fontFamily: "'Poppins', sans-serif",
        position: "relative",
      }}
    >
      {/* Profile */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: 600,
          letterSpacing: "0.5px",
        }}
      >
        Hello, Gabriel Here
      </Typography>

      <Typography
        variant="subtitle1"
        sx={{
          color: "#b0b0b0",
          mb: 2,
          fontWeight: 300,
        }}
      >
        Glad to meet you!
      </Typography>

      <Box sx={{ mt: 2 }}>
        <Avatar
          alt="Gabriel"
          src="https://avatars.githubusercontent.com/gabfalse"
          sx={{
            width: 120,
            height: 120,
            margin: "auto",
            border: "2px solid #00bcd4",
            boxShadow: "0 0 12px rgba(0, 188, 212, 0.4)",
          }}
        />
      </Box>

      {/* Contact */}
      <Contact />

      {/* Description */}
      <Box sx={{ mt: 3, maxWidth: 500, mx: "auto" }}>
        <Typography
          variant="body1"
          sx={{
            display: "block",
            fontWeight: 400,
            mb: 1,
            lineHeight: 1.6,
          }}
        >
          Currently {age} years old, a web developer from Indonesia.
        </Typography>
      </Box>

      <Skill />

      {/* 🎶 Floating Cheer Up Button */}
      <Box
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 1000,
        }}
      >
        {!showPlayer ? (
          <Button
            variant="contained"
            startIcon={<MusicNoteIcon />}
            onClick={() => setShowPlayer(true)}
            sx={{
              bgcolor: "#00bcd4",
              color: "black",
              fontWeight: 600,
              borderRadius: "30px",
              px: 3,
              py: 1.2,
              textTransform: "none",
              fontSize: "1rem",
              boxShadow: "0 4px 20px rgba(0,188,212,0.4)",
              "&:hover": {
                bgcolor: "#00acc1",
              },
            }}
          >
            Cheer Up 🎵
          </Button>
        ) : (
          <Fade in={showPlayer} timeout={500}>
            <Paper
              elevation={6}
              sx={{
                position: "relative",
                borderRadius: "16px",
                overflow: "hidden",
                backdropFilter: "blur(10px)",
                bgcolor: "rgba(0,0,0,0.7)",
              }}
            >
              <IconButton
                onClick={() => setShowPlayer(false)}
                sx={{
                  position: "absolute",
                  top: 6,
                  right: 6,
                  color: "white",
                  bgcolor: "rgba(255,255,255,0.1)",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.2)",
                  },
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
              <iframe
                title="Cheer Up Music"
                style={{
                  borderRadius: "16px",
                }}
                src="https://open.spotify.com/embed/track/60nZcImufyMA1MKQY3dcCH?utm_source=generator"
                width="320"
                height="380"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              ></iframe>
            </Paper>
          </Fade>
        )}
      </Box>
    </Box>
  );
}
