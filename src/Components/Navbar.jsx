import { AppBar, Box, MenuItem, MenuList, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const menuItems = [
    { label: "About Me", path: "/" },
    { label: "Blog", path: "/blog" },
    { label: "Project", path: "https://github.com/gabfalse", external: true },
  ];

  const handleClick = (item) => {
    if (item.external) {
      window.open(item.path, "_blank"); // buka di tab baru
    } else {
      navigate(item.path);
    }
  };

  return (
    <Box>
      <AppBar
        position="fixed"
        sx={{
          height: "8vh",
          backgroundColor: "#222",
          boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
        }}
      >
        <Toolbar sx={{ justifyContent: "center" }}>
          <MenuList sx={{ display: "flex", gap: 3 }}>
            {menuItems.map((item) => (
              <MenuItem
                key={item.label}
                onClick={() => handleClick(item)}
                sx={{
                  color: "#fff",
                  fontWeight: 500,
                  fontFamily: "'Poppins', sans-serif",
                  textTransform: "none",
                  cursor: "pointer",
                  transition: "0.3s",
                  "&:hover": {
                    color: "#00bcd4",
                    transform: "scale(1.05)",
                  },
                }}
              >
                {item.label}
              </MenuItem>
            ))}
          </MenuList>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
