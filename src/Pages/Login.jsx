import React, { useState } from "react";
import { supabase } from "../supabase/client";
import { Container, TextField, Button, Typography, Box } from "@mui/material";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log("Login error:", error);
      setMessage(error.message);
    } else {
      // Supabase v2: user bisa ada di data.user atau data.session.user
      const user = data.user ?? data.session?.user;

      console.log("Login response:", data);
      console.log("Extracted user:", user);

      if (user?.email === "gabrielalfarez14@gmail.com") {
        setMessage("Login successful!");
        console.log("Redirecting to /admin ...");
        window.location.href = "/admin";
      } else {
        setMessage("You do not have access.");
        console.log("User does not match admin email, logging out...");
        await supabase.auth.signOut();
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          py: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: "rgba(255,255,255,0.05)",
          borderRadius: 3,
          boxShadow: "0 0 20px rgba(0,0,0,0.3)",
          p: 4,
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
          Admin Login
        </Typography>
        <form onSubmit={handleLogin} style={{ width: "100%" }}>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Login
          </Button>
        </form>
        {message && (
          <Typography
            color={message === "Login successful!" ? "success.main" : "error"}
            sx={{ mt: 2 }}
          >
            {message}
          </Typography>
        )}
      </Box>
    </Container>
  );
}
