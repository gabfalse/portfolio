import React, { useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";

export default function ProjectsSection() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    const { data, error } = await supabase.from("projects").select("*");
    if (!error) setProjects(data);
  }

  return (
    <Container id="projects" sx={{ py: 8 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Projects
      </Typography>
      <Grid container spacing={4}>
        {projects.map((proj) => (
          <Grid item xs={12} sm={6} md={4} key={proj.id}>
            <Card>
              {proj.image_url && (
                <CardMedia
                  component="img"
                  height="180"
                  image={proj.image_url}
                  alt={proj.title}
                />
              )}
              <CardContent>
                <Typography variant="h6">{proj.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {proj.description}
                </Typography>
              </CardContent>
              <CardActions>
                {proj.project_url && (
                  <Button size="small" href={proj.project_url} target="_blank">
                    View
                  </Button>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
