import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Box,
  Typography,
  Modal,
  IconButton,
  Button,
  TextField,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import supabase from "../supabaseClient";

export default function Testimonies() {
  const [testimonies, setTestimonies] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [testimony, setTestimony] = useState("");

  // Fetch testimonies from Supabase
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("testimonies")
        .select("id, name, testimony")
        .order("created_at", { ascending: false })
        .limit(15);

      if (!error) setTestimonies(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  // Handle submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");

    try {
      const res = await fetch("https://api.ipify.org?format=json");
      const { ip } = await res.json();

      const { count, error: countError } = await supabase
        .from("testimonies")
        .select("*", { count: "exact", head: true })
        .eq("ip_address", ip);

      if (countError) throw countError;

      if (count >= 3) {
        setMessage("You’ve already submitted 3 testimonies from this IP.");
        setSubmitting(false);
        return;
      }

      const { error } = await supabase.from("testimonies").insert([
        {
          ip_address: ip,
          name,
          testimony,
        },
      ]);

      if (error) throw error;

      setMessage("Thank you! Your testimony has been added.");
      setName("");
      setTestimony("");
      setOpen(false);

      // Refresh list
      const { data } = await supabase
        .from("testimonies")
        .select("id, name, testimony")
        .order("created_at", { ascending: false })
        .limit(15);

      setTestimonies(data);
    } catch (err) {
      console.error(err);
      setMessage("Error submitting your testimony.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <Box sx={{ textAlign: "center", mt: 8 }}>
        <CircularProgress color="primary" />
      </Box>
    );

  return (
    <Box
      sx={{ color: "white", py: 8, position: "relative", overflow: "hidden" }}
    >
      <Typography
        variant="h4"
        align="center"
        sx={{
          fontWeight: 600,
          mb: 4,
          color: "#00bcd4",
          letterSpacing: "0.5px",
        }}
      >
        What People Say
      </Typography>

      {/* Carousel */}
      <Box
        sx={{
          display: "flex",
          overflow: "hidden",
          position: "relative",
          height: "120px",
        }}
      >
        <motion.div
          animate={{ x: ["100%", "-100%"] }}
          transition={{
            repeat: Infinity,
            duration: 40,
            ease: "linear",
          }}
          style={{ display: "flex", gap: "24px", whiteSpace: "nowrap" }}
        >
          {[...testimonies, ...testimonies].map((t, i) => (
            <Box
              key={i}
              sx={{
                bgcolor: "rgba(255,255,255,0.08)",
                borderRadius: "12px",
                p: 2,
                minWidth: "280px",
                maxWidth: "280px",
                textAlign: "left",
                boxShadow: "0 4px 15px rgba(0,188,212,0.2)",
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{ color: "#00bcd4", fontWeight: 600 }}
              >
                {t.name}
              </Typography>
              <Typography variant="body2" sx={{ color: "#b0b0b0" }}>
                {t.testimony}
              </Typography>
            </Box>
          ))}
        </motion.div>
      </Box>

      {/* Floating Add Button */}
      <IconButton
        onClick={() => setOpen(true)}
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          bgcolor: "#00bcd4",
          color: "black",
          "&:hover": { bgcolor: "#00acc1" },
          width: 60,
          height: 60,
          boxShadow: "0 4px 15px rgba(0,188,212,0.5)",
        }}
      >
        <AddIcon />
      </IconButton>

      {/* Modal Form */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "rgba(15, 23, 42, 0.95)",
            borderRadius: "16px",
            p: 4,
            width: 340,
            color: "white",
            boxShadow: "0 0 20px rgba(0,188,212,0.4)",
          }}
        >
          <Typography
            variant="h6"
            sx={{ mb: 2, textAlign: "center", color: "#00bcd4" }}
          >
            Add Testimony
          </Typography>

          <TextField
            fullWidth
            variant="outlined"
            label="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            sx={{
              mb: 2,
              input: { color: "white" },
              label: { color: "#b0b0b0" },
            }}
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            label="Your Testimony"
            value={testimony}
            onChange={(e) => setTestimony(e.target.value)}
            required
            sx={{
              mb: 3,
              textarea: { color: "white" },
              label: { color: "#b0b0b0" },
            }}
          />

          <Button
            type="submit"
            fullWidth
            disabled={submitting}
            sx={{
              bgcolor: "#00bcd4",
              color: "black",
              fontWeight: 600,
              borderRadius: "30px",
              py: 1,
              "&:hover": { bgcolor: "#00acc1" },
            }}
          >
            {submitting ? "Sending..." : "Send"}
          </Button>

          {message && (
            <Typography align="center" sx={{ mt: 2, color: "#00bcd4" }}>
              {message}
            </Typography>
          )}
        </Box>
      </Modal>
    </Box>
  );
}
