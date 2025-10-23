import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  IconButton,
  CircularProgress,
  MenuItem,
} from "@mui/material";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import supabase from "../supabaseClient";

export default function RequestService() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [limitReached, setLimitReached] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company_name: "",
    email: "",
    request_type: "",
    request: "",
  });

  // === DAILY RESET + LIMIT CHECK ===
  useEffect(() => {
    const today = new Date().toDateString();
    const stored = JSON.parse(localStorage.getItem("serviceRequests") || "{}");

    // Jika tanggal tersimpan bukan hari ini, reset totalnya
    if (stored.lastDate !== today) {
      localStorage.setItem(
        "serviceRequests",
        JSON.stringify({ lastDate: today, count: 0 })
      );
      setLimitReached(false);
      return;
    }

    // Jika masih hari yang sama, cek apakah sudah mencapai limit
    if (stored.count >= 3) setLimitReached(true);
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.request_type || !form.request)
      return alert("Please fill in all required fields.");

    const today = new Date().toDateString();
    const stored = JSON.parse(localStorage.getItem("serviceRequests") || "{}");

    const currentCount = stored.lastDate === today ? stored.count || 0 : 0;

    if (currentCount >= 3) {
      setLimitReached(true);
      return alert(
        "You’ve reached the daily limit of 3 requests per device 🚫"
      );
    }

    setLoading(true);
    const { error } = await supabase.from("service_requests").insert([form]);
    setLoading(false);

    if (error) {
      alert("Failed to send your request. Please try again later.");
    } else {
      const newCount = currentCount + 1;
      localStorage.setItem(
        "serviceRequests",
        JSON.stringify({ lastDate: today, count: newCount })
      );
      if (newCount >= 3) setLimitReached(true);

      alert("Your request has been sent successfully! Thank you 🙌");
      setForm({
        name: "",
        company_name: "",
        email: "",
        request_type: "",
        request: "",
      });
      setOpen(false);
    }
  };

  return (
    <Box textAlign="center" mt={4}>
      {/* Main button */}
      <motion.div whileHover={{ scale: 1.1 }}>
        <Button
          onClick={() => setOpen(true)}
          sx={{
            bgcolor: "transparent",
            border: "2px solid #00e5ff",
            color: "#00e5ff",
            borderRadius: "25px",
            px: 2.5,
            py: 0.6,
            fontWeight: 600,
            fontSize: "0.85rem",
            fontFamily: "'Poppins', sans-serif",
            letterSpacing: "0.5px",
            backdropFilter: "blur(6px)",
            boxShadow: "0 0 15px rgba(0,229,255,0.3)",
            transition: "all 0.3s ease",
            "&:hover": {
              bgcolor: "rgba(0,229,255,0.1)",
              boxShadow: "0 0 25px rgba(0,229,255,0.6)",
            },
          }}
        >
          Request Service
        </Button>
      </motion.div>

      {/* Modal */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          component={motion.div}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          sx={{
            bgcolor: "rgba(25, 30, 45, 0.95)",
            color: "#fff",
            borderRadius: "20px",
            width: "90%",
            maxWidth: "420px",
            p: 3,
            boxShadow: "0 0 40px rgba(0,229,255,0.4)",
            backdropFilter: "blur(12px)",
            position: "relative",
          }}
        >
          {/* Close button */}
          <IconButton
            onClick={() => setOpen(false)}
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              color: "#00e5ff",
              "&:hover": { color: "#00bcd4" },
            }}
          >
            <X />
          </IconButton>

          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: "#00e5ff",
              mb: 2,
              textAlign: "center",
              mt: 1,
            }}
          >
            Request a New Service
          </Typography>

          <TextField
            fullWidth
            label="Your Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            sx={textFieldStyle}
          />
          <TextField
            fullWidth
            label="Company Name (optional)"
            name="company_name"
            value={form.company_name}
            onChange={handleChange}
            sx={textFieldStyle}
          />
          <TextField
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            sx={textFieldStyle}
          />
          <TextField
            select
            fullWidth
            label="Job Type"
            name="request_type"
            value={form.request_type}
            onChange={handleChange}
            sx={textFieldStyle}
          >
            <MenuItem value="Freelance">Freelance</MenuItem>
            <MenuItem value="Part-Time">Part-Time</MenuItem>
            <MenuItem value="Contract">Contract</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>
          <TextField
            fullWidth
            label="Describe Your Request"
            name="request"
            multiline
            rows={4}
            value={form.request}
            onChange={handleChange}
            sx={textFieldStyle}
          />

          <Button
            onClick={handleSubmit}
            fullWidth
            disabled={loading || limitReached}
            sx={{
              bgcolor: limitReached ? "gray" : "#00e5ff",
              color: "#000",
              fontWeight: 600,
              py: 1,
              borderRadius: "25px",
              textTransform: "none",
              mt: 0,
              "&:hover": {
                bgcolor: limitReached ? "gray" : "#00bcd4",
              },
            }}
          >
            {limitReached ? (
              "Limit: 3 Requests / Day"
            ) : loading ? (
              <CircularProgress size={22} color="inherit" />
            ) : (
              "Submit Request"
            )}
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}

const textFieldStyle = {
  mb: 2,
  "& .MuiOutlinedInput-root": {
    color: "#fff",
    "& fieldset": { borderColor: "#00e5ff" },
    "&:hover fieldset": { borderColor: "#00bcd4" },
  },
  "& .MuiInputLabel-root": { color: "#aaa" },
};
