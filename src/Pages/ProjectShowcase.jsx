import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Grid,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import supabase from "../supabaseClient";
import Testimonies from "../Components/Testimonies";

export default function ProjectShowcase() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("id, title, description, image_url, project_url")
          .order("id", { ascending: false });

        if (error) throw error;
        setProjects(data);
      } catch (err) {
        console.error("Error fetching projects:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress sx={{ color: "#00e5ff" }} />
      </Box>
    );

  return (
    <Box
      sx={{
        px: { xs: 2, sm: 4, md: 8 },
        py: 8,
        minHeight: "100vh",
        background: "#222",
        color: "white",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: 6,
            textAlign: "center",
            color: "#00e5ff",
            textShadow: "0 0 20px rgba(0,229,255,0.4)",
            letterSpacing: "0.5px",
          }}
        >
          My Projects
        </Typography>
      </motion.div>

      {projects.length === 0 ? (
        <Typography color="gray" textAlign="center">
          No projects available yet.
        </Typography>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: { xs: 2, sm: 3, md: 4 },
            transform: {
              xs: "scale(0.75)", // HP: perkecil semua agar tetap muat
              sm: "scale(0.9)", // Tablet
              md: "scale(1)", // Desktop
            },
            transformOrigin: "top center",
          }}
        >
          {projects.map((p, i) => (
            <motion.div
              key={p.id || i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.03 }}
            >
              <Card
                sx={{
                  width: { xs: "160px", sm: "200px", md: "250px" }, // Lebar fleksibel sesuai layar
                  height: "100%",
                  bgcolor: "rgba(255,255,255,0.05)",
                  borderRadius: "20px",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 8px 30px rgba(0,229,255,0.15)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(0,229,255,0.1)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: "0 10px 40px rgba(0,229,255,0.25)",
                    transform: "translateY(-3px)",
                  },
                }}
              >
                {p.image_url && (
                  <CardMedia
                    component="img"
                    height="140"
                    image={p.image_url}
                    alt={p.title}
                    sx={{
                      objectFit: "contain",
                      borderBottom: "1px solid rgba(255,255,255,0.1)",
                    }}
                  />
                )}

                <CardContent sx={{ p: 2 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 600,
                      mb: 0.5,
                      color: "#fff",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {p.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: "#b0b0b0",
                      mb: 2,
                      lineHeight: 1.4,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      minHeight: "54px",
                    }}
                  >
                    {p.description}
                  </Typography>

                  {p.project_url && (
                    <Button
                      variant="contained"
                      href={p.project_url}
                      target="_blank"
                      sx={{
                        bgcolor: "#00e5ff",
                        color: "#000",
                        borderRadius: "30px",
                        fontWeight: 600,
                        textTransform: "none",
                        px: 2,
                        py: 0.7,
                        fontSize: "0.8rem",
                        "&:hover": {
                          bgcolor: "#00bcd4",
                          transform: "translateY(-2px)",
                        },
                      }}
                    >
                      Visit
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </Box>
      )}

      <Box sx={{ mt: 10 }}>
        <Testimonies />
      </Box>
    </Box>
  );
}
