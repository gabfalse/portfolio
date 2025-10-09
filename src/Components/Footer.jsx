import { Box, Typography, Link } from "@mui/material";
import "@fontsource/poppins";

export default function Footer() {
  return (
    <Box
      sx={{
        textAlign: "center",
        mb: 2,
        color: "#e0e0e0",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <Typography variant="body2" sx={{ mb: 1 }}>
        Thanks for visiting!
      </Typography>

      <Typography variant="body2" sx={{ fontSize: "0.85rem" }}>
        © 2023 - {new Date().getFullYear()} Gabriel.
      </Typography>
    </Box>
  );
}
