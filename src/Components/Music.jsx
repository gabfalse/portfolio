import { useState } from "react";
import { Box, Button, Fade, Typography } from "@mui/material";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

export default function Music() {
  const [showPlayer, setShowPlayer] = useState(false);

  const handlePlay = () => {
    setShowPlayer(true);
  };

  return (
    <Box
      sx={{
        textAlign: "center",
        py: 8,
        bgcolor: "#121212",
        color: "white",
        minHeight: "60vh",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 3,
          fontWeight: 600,
          letterSpacing: "1px",
        }}
      >
        Need a little boost?
      </Typography>

      {!showPlayer ? (
        <Button
          variant="contained"
          startIcon={<MusicNoteIcon />}
          onClick={handlePlay}
          sx={{
            bgcolor: "#00bcd4",
            color: "black",
            fontWeight: 600,
            borderRadius: "30px",
            px: 4,
            py: 1.5,
            textTransform: "none",
            fontSize: "1.1rem",
            "&:hover": {
              bgcolor: "#00acc1",
            },
          }}
        >
          Cheer Up 🎵
        </Button>
      ) : (
        <Fade in timeout={800}>
          <Box
            sx={{
              mt: 4,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Spotify Embed Player */}
            <iframe
              title="Cheer Up Music"
              style={{ borderRadius: "12px" }}
              src="https://open.spotify.com/embed/track/6K4t31amVTZDgR3sKmwUJJ?utm_source=generator"
              width="320"
              height="400"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </Box>
        </Fade>
      )}
    </Box>
  );
}
