import { useState } from "react";
import { Button, TextField, Box, Typography } from "@mui/material";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Ganti ini dengan email dan password kamu
  const ADMIN_EMAIL = "gabrielalfarez14@gmail.com";
  const ADMIN_PASS = "Gabriel_14";

  const handleLogin = () => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
      localStorage.setItem("isAdmin", "true");
      window.location.href = "/inigabrielya";
    } else {
      setError("Wrong email or password!");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        bgcolor: "#222",
        color: "#fff",
        px: 3,
      }}
    >
      <Typography variant="h5" sx={{ mb: 3, color: "#fff" }}>
        Admin Login
      </Typography>

      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        sx={inputStyle}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        sx={inputStyle}
      />

      {error && (
        <Typography color="error" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}

      <Button
        onClick={handleLogin}
        fullWidth
        sx={{
          mt: 2,
          bgcolor: "#fff",
          color: "#000",
          borderRadius: "20px",
          fontWeight: 600,
          "&:hover": { bgcolor: "#00bcd4" },
        }}
      >
        Login
      </Button>
    </Box>
  );
}

const inputStyle = {
  mb: 2,
  "& .MuiOutlinedInput-root": {
    color: "#fff",
    "& fieldset": { borderColor: "#fff" },
    "&:hover fieldset": { borderColor: "#00bcd4" },
  },
  "& .MuiInputLabel-root": { color: "#aaa" },
};
