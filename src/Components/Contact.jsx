import { GitHub, LinkedIn, Email } from "@mui/icons-material"; // import ikon dari MUI
import { Box, IconButton } from "@mui/material";
export default function Contact() {
  const socialLinks = [
    {
      icon: <GitHub />,
      url: "https://github.com/gabfalse",
      color: "#6e5494",
    },
    {
      icon: <Email />,
      url: "mailto:gabrielalfarez14@gmail.com",
      color: "#d14836",
    },
    {
      icon: <LinkedIn />,
      url: "https://www.linkedin.com/in/gabriel-mohammad-alfarez-fahlepi-9144362bb/",
      color: "#0a66c2",
    },
  ];
  return (
    <Box>
      {/* Social Links */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 4,
          gap: 2,
        }}
      >
        {socialLinks.map((link, index) => (
          <IconButton
            key={index}
            component="a"
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: "white",
              transition: "all 0.3s ease",
              "&:hover": {
                color: link.color,
                transform: "scale(1.2)",
              },
            }}
          >
            {link.icon}
          </IconButton>
        ))}
      </Box>
    </Box>
  );
}
