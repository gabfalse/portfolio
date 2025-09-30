import React from "react";
import { AppBar, Toolbar, Box, Button } from "@mui/material";

export default function Header() {
  const menuItems = [
    { label: "Profile", target: "landing" },
    { label: "Skills", target: "skills" },
    { label: "Projects", target: "projects" },
    { label: "Contact", target: "contact" },
  ];

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        top: 16,
        left: "50%",
        transform: "translateX(-50%)",
        width: { xs: "95%", md: "80%" },
        borderRadius: "20px",
        transition: "all 0.3s ease",
        background: "transparent",
        boxShadow: "none",
        "&:hover": {
          backdropFilter: "blur(20px)",
          background: "rgba(20, 20, 35, 0.6)",
          border: "1px solid rgba(255,255,255,0.15)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        },
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "center",
          "&:hover .menu-items": {
            opacity: 1,
            transform: "translateY(0)",
            pointerEvents: "auto",
          },
        }}
      >
        {/* Menu */}
        <Box
          className="menu-items"
          sx={{
            display: "flex",
            gap: { xs: 1, sm: 2 },
            opacity: 0, // default hidden di semua layar
            transform: "translateY(-10px)",
            transition: "all 0.3s ease",
            pointerEvents: "none",
          }}
        >
          {menuItems.map((item) => (
            <Button
              key={item.target}
              onClick={() => handleScroll(item.target)}
              sx={{
                fontWeight: 600,
                textTransform: "none",
                fontSize: { xs: "0.8rem", sm: "0.9rem" },
                px: { xs: 1.2, sm: 2 },
                py: 0.5,
                color: "#e6eef8",
                "&:hover": {
                  color: "#60a5fa",
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: "12px",
                },
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
