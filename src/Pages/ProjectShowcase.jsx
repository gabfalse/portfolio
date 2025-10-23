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

import supabase from "../supabaseClient"; // ❌ default import
import Testimonies from "../Components/Testimonies";

export default function ProjectShowcase() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ambil data dari tabel "projects"
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("title, description, image_url, project_url")
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
        <CircularProgress color="#fff" />
      </Box>
    );

  return (
    <Box
      sx={{
        px: 5,
        py: 8,
        backgroundColor: "#222",
        color: "white",
        textAlign: "center",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 600,
          mb: 4,
          color: "#fff",
          letterSpacing: "0.5px",
        }}
      >
        Community Projects
      </Typography>

      {projects.length === 0 ? (
        <Typography color="gray">No projects available yet.</Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {projects.map((p, i) => (
            <Grid key={p.id || i}>
              <Card
                sx={{
                  bgcolor: "rgba(255,255,255,0.05)",
                  borderRadius: "16px",
                  boxShadow: "0 4px 20px rgba(0,188,212,0.3)",
                  backdropFilter: "blur(10px)",
                  transition: "transform 0.3s",
                  "&:hover": { transform: "translateY(-6px)" },
                }}
              >
                {p.image_url && (
                  <CardMedia
                    component="img"
                    height="180"
                    image={p.image_url}
                    alt={p.title}
                  />
                )}
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    {p.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#b0b0b0", mb: 2 }}>
                    {p.description}
                  </Typography>
                  {p.project_url && (
                    <Button
                      variant="contained"
                      href={p.project_url}
                      target="_blank"
                      sx={{
                        bgcolor: "#fff",
                        color: "black",
                        textTransform: "none",
                        borderRadius: "30px",
                        fontWeight: 600,
                        "&:hover": { bgcolor: "#00acc1" },
                      }}
                    >
                      Visit Project
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      <Testimonies />
    </Box>
  );
}
