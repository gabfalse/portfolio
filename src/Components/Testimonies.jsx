import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Modal,
  IconButton,
  Button,
  TextField,
  CircularProgress,
  Grid,
  Pagination,
} from "@mui/material";
import { motion } from "framer-motion";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import supabase from "../supabaseClient";

export default function Testimonies() {
  const [testimonies, setTestimonies] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [testimony, setTestimony] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  // === Fetch 20 latest testimonies ===
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("testimonies")
        .select("id, name, testimony")
        .order("created_at", { ascending: false })
        .limit(20);

      if (!error) setTestimonies(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");

    try {
      const res = await fetch("https://api.ipify.org?format=json");
      const { ip } = await res.json();

      const { count } = await supabase
        .from("testimonies")
        .select("*", { count: "exact", head: true })
        .eq("ip_address", ip);

      if (count >= 3) {
        setMessage("You’ve already submitted 3 testimonies from this IP.");
        setSubmitting(false);
        return;
      }

      const { error } = await supabase
        .from("testimonies")
        .insert([{ ip_address: ip, name, testimony }]);

      if (error) throw error;

      setMessage("✨ Thank you! Your testimony has been added.");
      setName("");
      setTestimony("");
      setOpen(false);

      const { data } = await supabase
        .from("testimonies")
        .select("id, name, testimony")
        .order("created_at", { ascending: false })
        .limit(20);

      setTestimonies(data);
    } catch (err) {
      console.error(err);
      setMessage("⚠️ Error submitting your testimony.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <Box sx={{ textAlign: "center", mt: 8 }}>
        <CircularProgress sx={{ color: "#00e5ff" }} />
      </Box>
    );

  const totalPages = Math.ceil(testimonies.length / itemsPerPage);
  const paginatedData = testimonies.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Box
      sx={{
        mt: 10,
        py: { xs: 6, md: 8 },
        px: { xs: 2, sm: 4, md: 6 },
        background: "#222",
        color: "white",
        textAlign: "center",
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          mb: { xs: 4, md: 6 },
          color: "#00e5ff",
          textShadow: "0 0 25px rgba(0,229,255,0.3)",
        }}
      >
        💬 What People Say
      </Typography>

      {/* === Testimony Cards === */}
      <Grid container spacing={3} justifyContent="center">
        {paginatedData.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Box
                sx={{
                  p: 3,

                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(0,229,255,0.2)",
                  boxShadow: "0 0 25px rgba(0,229,255,0.1)",
                  textAlign: "left",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: "#00e5ff",
                    fontWeight: 600,
                    mb: 1,
                    fontSize: "1.1rem",
                  }}
                >
                  {item.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#cfd8dc",
                    fontSize: "0.95rem",
                    lineHeight: 1.6,
                  }}
                >
                  “{item.testimony}”
                </Typography>
              </Box>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* === Pagination === */}
      {totalPages > 1 && (
        <Box sx={{ mt: 5, display: "flex", justifyContent: "center" }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, value) => setPage(value)}
            sx={{
              "& .MuiPaginationItem-root": {
                color: "#00e5ff",
                borderColor: "#00e5ff",
              },
              "& .Mui-selected": {
                backgroundColor: "#00e5ff !important",
                color: "#0b1120 !important",
              },
            }}
          />
        </Box>
      )}

      {/* === Floating Add Button === */}
      <IconButton
        onClick={() => setOpen(true)}
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          bgcolor: "#00e5ff",
          color: "#0b1120",
          "&:hover": { bgcolor: "#00bcd4" },
          width: 48,
          height: 48,
          boxShadow: "0 8px 25px rgba(0,229,255,0.4)",
          zIndex: 20,
        }}
      >
        <AddIcon />
      </IconButton>

      {/* === Modal Form === */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "rgba(15,23,42,0.95)",
              backdropFilter: "blur(12px)",
              borderRadius: "18px",
              p: 4,
              width: { xs: 300, sm: 360 },
              color: "white",
              border: "1px solid rgba(0,229,255,0.3)",
              boxShadow: "0 0 35px rgba(0,229,255,0.25)",
            }}
          >
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography
                variant="h6"
                sx={{ color: "#00e5ff", fontWeight: 700 }}
              >
                Add Your Testimony
              </Typography>
              <IconButton
                onClick={() => setOpen(false)}
                sx={{ color: "#00e5ff", "&:hover": { color: "#00bcd4" } }}
              >
                <CloseIcon />
              </IconButton>
            </Box>

            <TextField
              fullWidth
              label="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              sx={fieldStyle}
            />
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Your Testimony"
              value={testimony}
              onChange={(e) => setTestimony(e.target.value)}
              required
              sx={fieldStyle}
            />

            <Button
              type="submit"
              fullWidth
              disabled={submitting}
              sx={{
                bgcolor: "#00e5ff",
                color: "#0b1120",
                fontWeight: 600,
                borderRadius: "30px",
                py: 1,
                mt: 1,
                "&:hover": {
                  bgcolor: "#00bcd4",
                  transform: "translateY(-2px)",
                },
              }}
            >
              {submitting ? "Sending..." : "Send"}
            </Button>

            {message && (
              <Typography
                align="center"
                sx={{
                  mt: 2,
                  color: "#00e5ff",
                  fontWeight: 500,
                  fontSize: "0.9rem",
                }}
              >
                {message}
              </Typography>
            )}
          </Box>
        </motion.div>
      </Modal>
    </Box>
  );
}

const fieldStyle = {
  mb: 2,
  input: { color: "white" },
  textarea: { color: "white" },
  label: { color: "#b0b0b0" },
  "& .MuiOutlinedInput-root": {
    "& fieldset": { borderColor: "#333" },
    "&:hover fieldset": { borderColor: "#00e5ff" },
  },
};
