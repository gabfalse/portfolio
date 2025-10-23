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
        textAlign: "center",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          mb: 6,
          color: "#00e5ff",
          textShadow: "0 0 20px rgba(0,229,255,0.3)",
          letterSpacing: "0.5px",
        }}
      >
        My Projects
      </Typography>

      {projects.length === 0 ? (
        <Typography color="gray">No projects available yet.</Typography>
      ) : (
        <Grid container spacing={4} justifyContent="center">
          {projects.map((p, i) => (
            <Grid item xs={12} sm={6} md={4} key={p.id || i}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.03 }}
              >
                <Card
                  sx={{
                    bgcolor: "rgba(255,255,255,0.05)",
                    borderRadius: "18px",
                    overflow: "hidden",
                    boxShadow: "0 8px 30px rgba(0,188,212,0.15)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(0,229,255,0.1)",
                    transition: "all 0.3s ease",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    "&:hover": {
                      boxShadow: "0 10px 40px rgba(0,229,255,0.25)",
                    },
                  }}
                >
                  {p.image_url && (
                    <CardMedia
                      component="img"
                      height="180"
                      image={p.image_url}
                      alt={p.title}
                      sx={{
                        objectFit: "contain",
                        borderBottom: "1px solid rgba(255,255,255,0.1)",
                      }}
                    />
                  )}
                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 600, mb: 1, color: "#fff" }}
                    >
                      {p.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#b0b0b0",
                        mb: 3,
                        lineHeight: 1.5,
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
                          px: 3,
                          py: 1,
                          "&:hover": {
                            bgcolor: "#00bcd4",
                            transform: "translateY(-2px)",
                          },
                        }}
                      >
                        Visit Project
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      )}
      <Box sx={{ mt: 10 }}>
        <Testimonies />
      </Box>
    </Box>
  );
}
