import React, { useState } from "react";
import { supabase } from "../supabase/client";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Card,
  CardContent,
  IconButton,
  Stack,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { motion } from "framer-motion";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  async function handleSubmit(e) {
    e.preventDefault();
    const { error } = await supabase.from("contacts").insert([form]);

    if (error) {
      console.error(error);
      alert("Failed to send. Please try again.");
    } else {
      window.location.href = `mailto:gabrielalfarez14@gmail.com?subject=Message from ${form.name}&body=${form.message}%0A%0AFrom: ${form.email}`;
      alert("Message sent!");
      setForm({ name: "", email: "", message: "" });
    }
  }

  return (
    <Box
      id="contact"
      sx={{
        py: { xs: 8, sm: 12 },
        position: "relative",
        background:
          "linear-gradient(180deg, rgba(56,0,60,0.95) 0%, rgba(10,10,30,0.98) 100%)",
        color: "white",
        overflow: "hidden",
      }}
    >
      {/* Aurora effect */}
      <motion.div
        animate={{ x: [0, 40, -40, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ repeat: Infinity, duration: 15 }}
        style={{
          position: "absolute",
          top: 0,
          left: "10%",
          width: "80%",
          height: 300,
          background:
            "linear-gradient(120deg, rgba(120,0,255,0.3), rgba(0,200,255,0.2), transparent)",
          filter: "blur(100px)",
        }}
      />

      {/* Glowing orbs */}
      <motion.div
        animate={{ y: [0, -30, 0] }}
        transition={{ repeat: Infinity, duration: 10 }}
        style={{
          position: "absolute",
          top: 100,
          right: "20%",
          width: 150,
          height: 150,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,200,255,0.6), transparent)",
          filter: "blur(80px)",
        }}
      />

      {/* Stars */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{
            repeat: Infinity,
            duration: 3 + Math.random() * 4,
            delay: Math.random() * 3,
          }}
          style={{
            position: "absolute",
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: 3,
            height: 3,
            borderRadius: "50%",
            background: "white",
          }}
        />
      ))}

      {/* Fade overlays */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "15%",
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.9), transparent)",
          zIndex: 1,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "15%",
          background: "linear-gradient(to top, rgba(0,0,0,0.9), transparent)",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <Container maxWidth="md" sx={{ position: "relative", zIndex: 2 }}>
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{
            fontWeight: "bold",
            textShadow: "0 0 20px rgba(255,255,255,0.6)",
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
          }}
        >
          Get in Touch ✨
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          sx={{
            mb: 2,
            opacity: 0.85,
            fontSize: { xs: "0.9rem", sm: "1rem" },
          }}
        >
          Let’s create something magical together
        </Typography>

        {/* Availability */}
        <Typography
          align="center"
          sx={{
            mb: 6,
            fontWeight: "bold",
            fontSize: { xs: "1rem", sm: "1.2rem" },
            color: "#00ffcc",
            textShadow: "0 0 15px rgba(0,255,200,0.7)",
          }}
        >
          🌙 Available for Freelance & Collaboration
        </Typography>

        {/* Contact info cards */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="center"
          spacing={4}
          sx={{ mb: 6, alignItems: "center" }}
        >
          <Card
            sx={{
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(12px)",
              borderRadius: "20px",
              p: 2,
              color: "white",
              boxShadow: "0 0 20px rgba(255,255,255,0.15)",
              "&:hover": { boxShadow: "0 0 25px rgba(255,255,255,0.4)" },
              minWidth: 220,
              width: { xs: "100%", sm: "auto" },
            }}
          >
            <CardContent sx={{ textAlign: "center" }}>
              <IconButton
                href="mailto:gabrielalfarez14@gmail.com"
                sx={{ color: "white" }}
              >
                <EmailIcon fontSize="large" />
              </IconButton>
              <Typography>Email</Typography>
              <Typography variant="body2">
                gabrielalfarez14@gmail.com
              </Typography>
            </CardContent>
          </Card>

          <Card
            sx={{
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(12px)",
              borderRadius: "20px",
              p: 2,
              color: "white",
              boxShadow: "0 0 20px rgba(255,255,255,0.15)",
              "&:hover": { boxShadow: "0 0 25px rgba(255,255,255,0.4)" },
              minWidth: 220,
              width: { xs: "100%", sm: "auto" },
            }}
          >
            <CardContent sx={{ textAlign: "center" }}>
              <IconButton
                href="https://www.linkedin.com/in/gabriel-mohammad-alfarez-fahlepi-9144362bb/"
                target="_blank"
                sx={{ color: "white" }}
              >
                <LinkedInIcon fontSize="large" />
              </IconButton>
              <Typography>LinkedIn</Typography>
              <Typography variant="body2">/gabriel-mohammad-alfarez</Typography>
            </CardContent>
          </Card>
        </Stack>

        {/* Contact form */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(10px)",
            borderRadius: "20px",
            p: { xs: 3, sm: 4 },
            boxShadow: "0 0 20px rgba(255,255,255,0.15)",
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <TextField
            label="Your Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            fullWidth
            variant="outlined"
            InputLabelProps={{ style: { color: "#aaa" } }}
            InputProps={{ style: { color: "white" } }}
          />
          <TextField
            label="Your Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            fullWidth
            variant="outlined"
            InputLabelProps={{ style: { color: "#aaa" } }}
            InputProps={{ style: { color: "white" } }}
          />
          <TextField
            label="Message"
            multiline
            rows={4}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
            fullWidth
            variant="outlined"
            InputLabelProps={{ style: { color: "#aaa" } }}
            InputProps={{ style: { color: "white" } }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              alignSelf: "center",
              px: { xs: 4, sm: 6 },
              py: { xs: 1, sm: 1.5 },
              borderRadius: "30px",
              background: "linear-gradient(90deg, #7f00ff, #e100ff)",
              boxShadow: "0 0 20px rgba(255,0,255,0.4)",
              "&:hover": {
                background: "linear-gradient(90deg, #9a00ff, #ff00cc)",
                boxShadow: "0 0 30px rgba(255,0,255,0.7)",
              },
            }}
          >
            Send Message
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
