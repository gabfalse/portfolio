import React, { useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Paper,
} from "@mui/material";

export default function AdminDashboard() {
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newProject, setNewProject] = useState({ title: "", description: "" });
  const [newSkill, setNewSkill] = useState({ name: "", level: "" });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data: projData, error: projError } = await supabase
        .from("projects")
        .select("*");
      const { data: skillData, error: skillError } = await supabase
        .from("skills")
        .select("*");

      if (projError) console.error("Error fetching projects:", projError);
      if (skillError) console.error("Error fetching skills:", skillError);

      setProjects(projData || []);
      setSkills(skillData || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  const addProject = async () => {
    if (!newProject.title) return;
    const { data, error } = await supabase
      .from("projects")
      .insert([newProject])
      .select(); // penting agar mengembalikan row baru
    if (error) {
      console.error("Insert project error:", error);
      return;
    }
    if (data && data.length > 0) setProjects([...projects, data[0]]);
    setNewProject({ title: "", description: "" });
  };

  const addSkill = async () => {
    if (!newSkill.name) return;
    const { data, error } = await supabase
      .from("skills")
      .insert([newSkill])
      .select();
    if (error) {
      console.error("Insert skill error:", error);
      return;
    }
    if (data && data.length > 0) setSkills([...skills, data[0]]);
    setNewSkill({ name: "", level: "" });
  };

  const deleteProject = async (id) => {
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) console.error("Delete project error:", error);
    setProjects(projects.filter((p) => p.id !== id));
  };

  const deleteSkill = async (id) => {
    const { error } = await supabase.from("skills").delete().eq("id", id);
    if (error) console.error("Delete skill error:", error);
    setSkills(skills.filter((s) => s.id !== id));
  };

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Container>
      <Box sx={{ py: 4 }}>
        <Typography variant="h5" gutterBottom>
          Projects
        </Typography>
        <Box sx={{ mb: 2, display: "flex", gap: 1 }}>
          <TextField
            label="Title"
            value={newProject.title}
            onChange={(e) =>
              setNewProject({ ...newProject, title: e.target.value })
            }
          />
          <TextField
            label="Description"
            value={newProject.description}
            onChange={(e) =>
              setNewProject({ ...newProject, description: e.target.value })
            }
          />
          <Button variant="contained" onClick={addProject}>
            Add
          </Button>
        </Box>
        <Grid container spacing={2}>
          {projects.map((p) => (
            <Grid key={p.id}>
              <Paper sx={{ p: 2 }}>
                <Typography>{p.title}</Typography>
                <Typography variant="body2">{p.description}</Typography>
                <Button color="error" onClick={() => deleteProject(p.id)}>
                  Delete
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          Skills
        </Typography>
        <Box sx={{ mb: 2, display: "flex", gap: 1 }}>
          <TextField
            label="Name"
            value={newSkill.name}
            onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
          />
          <TextField
            label="Level"
            value={newSkill.level}
            onChange={(e) =>
              setNewSkill({ ...newSkill, level: e.target.value })
            }
          />
          <Button variant="contained" onClick={addSkill}>
            Add
          </Button>
        </Box>
        <Grid container spacing={2}>
          {skills.map((s) => (
            <Grid item key={s.id}>
              <Paper sx={{ p: 2 }}>
                <Typography>{s.name}</Typography>
                <Typography variant="body2">{s.level}</Typography>
                <Button color="error" onClick={() => deleteSkill(s.id)}>
                  Delete
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
