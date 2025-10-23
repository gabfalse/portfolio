import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Modal,
  TextField,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import { X, Edit, Trash2, Plus } from "lucide-react";
import supabase from "../supabaseClient";

export default function AdminPage() {
  const [authorized, setAuthorized] = useState(false);
  const [tab, setTab] = useState("projects");
  const [projects, setProjects] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [openForm, setOpenForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    image_url: "",
    project_url: "",
  });

  /* === CEK LOGIN ADMIN === */
  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin === "true") setAuthorized(true);
    else window.location.href = "/mauaturdulu";
  }, []);

  useEffect(() => {
    if (authorized) loadData();
  }, [tab, page, authorized]);

  const loadData = async () => {
    setLoading(true);
    const limit = 10;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    if (tab === "projects") {
      const { data, count } = await supabase
        .from("projects")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })
        .range(from, to);

      setProjects(data || []);
      setTotalPages(Math.ceil((count || 0) / limit));
    } else {
      const { data, count } = await supabase
        .from("service_requests")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })
        .range(from, to);

      setRequests(data || []);
      setTotalPages(Math.ceil((count || 0) / limit));
    }

    setLoading(false);
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!form.title || !form.description)
      return alert("Please fill in all required fields.");

    if (editingProject) {
      await supabase.from("projects").update(form).eq("id", editingProject.id);
    } else {
      await supabase.from("projects").insert([form]);
    }

    setOpenForm(false);
    setForm({ title: "", description: "", image_url: "", project_url: "" });
    setEditingProject(null);
    loadData();
  };

  const handleDelete = async (table, id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    await supabase.from(table).delete().eq("id", id);
    loadData();
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    window.location.href = "/mauaturdulu";
  };

  if (!authorized) return null;

  return (
    <Box
      sx={{
        bgcolor: "#222",
        color: "white",
        minHeight: "100vh",
        py: 6,
        px: { xs: 2, sm: 6 },
      }}
    >
      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        gap={2}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: { xs: "left", sm: "center" },
            color: "#fff",
            fontWeight: 700,
            letterSpacing: "1px",
          }}
        >
          Admin Dashboard
        </Typography>

        <Button
          onClick={handleLogout}
          sx={{
            bgcolor: "#fff",
            color: "#000",
            fontWeight: 600,
            borderRadius: "20px",
            px: 2,
            "&:hover": { bgcolor: "#00bcd4" },
          }}
        >
          Logout
        </Button>
      </Box>

      {/* === TAB SWITCH === */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 4,
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Button
          variant={tab === "projects" ? "contained" : "outlined"}
          onClick={() => {
            setTab("projects");
            setPage(1);
          }}
          sx={tabButtonStyle(tab === "projects")}
        >
          Manage Projects
        </Button>
        <Button
          variant={tab === "requests" ? "contained" : "outlined"}
          onClick={() => {
            setTab("requests");
            setPage(1);
          }}
          sx={tabButtonStyle(tab === "requests")}
        >
          Manage Requests
        </Button>
      </Box>

      {/* === TABLE DATA === */}
      {loading ? (
        <Box sx={{ textAlign: "center", mt: 8 }}>
          <CircularProgress color="info" />
        </Box>
      ) : (
        <>
          {tab === "projects" ? (
            <>
              <Box sx={{ textAlign: "right", mb: 2 }}>
                <Button
                  onClick={() => setOpenForm(true)}
                  sx={{
                    bgcolor: "#fff",
                    color: "#000",
                    fontWeight: 600,
                    borderRadius: "30px",
                    px: 2,
                    py: 0.7,
                    "&:hover": { bgcolor: "#00bcd4" },
                  }}
                  startIcon={<Plus />}
                >
                  Add Project
                </Button>
              </Box>

              <TableContainer
                component={Paper}
                sx={{
                  background: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(8px)",
                  overflowX: "auto",
                }}
              >
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={thStyle}>Title</TableCell>
                      <TableCell sx={thStyle}>Description</TableCell>
                      <TableCell sx={thStyle}>Image URL</TableCell>
                      <TableCell sx={thStyle}>Project URL</TableCell>
                      <TableCell sx={thStyle}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {projects.map((p) => (
                      <TableRow key={p.id}>
                        <TableCell sx={tdStyle}>{p.title}</TableCell>
                        <TableCell sx={tdStyle}>{p.description}</TableCell>
                        <TableCell sx={tdStyle}>{p.image_url || "-"}</TableCell>
                        <TableCell sx={tdStyle}>
                          {p.project_url || "-"}
                        </TableCell>
                        <TableCell sx={tdStyle}>
                          <IconButton
                            color="info"
                            onClick={() => {
                              setEditingProject(p);
                              setForm(p);
                              setOpenForm(true);
                            }}
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={() => handleDelete("projects", p.id)}
                          >
                            <Trash2 />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          ) : (
            <>
              <TableContainer
                component={Paper}
                sx={{
                  background: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(8px)",
                  overflowX: "auto",
                }}
              >
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={thStyle}>Name</TableCell>
                      <TableCell sx={thStyle}>Company</TableCell>
                      <TableCell sx={thStyle}>Email</TableCell>
                      <TableCell sx={thStyle}>Type</TableCell>
                      <TableCell sx={thStyle}>Request</TableCell>
                      <TableCell sx={thStyle}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {requests.map((r) => (
                      <TableRow key={r.id}>
                        <TableCell sx={tdStyle}>{r.name}</TableCell>
                        <TableCell sx={tdStyle}>
                          {r.company_name || "-"}
                        </TableCell>
                        <TableCell sx={tdStyle}>{r.email}</TableCell>
                        <TableCell sx={tdStyle}>{r.request_type}</TableCell>
                        <TableCell sx={tdStyle}>{r.request}</TableCell>
                        <TableCell sx={tdStyle}>
                          <IconButton
                            color="error"
                            onClick={() =>
                              handleDelete("service_requests", r.id)
                            }
                          >
                            <Trash2 />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </>
      )}

      {/* === PAGINATION === */}
      <Box mt={3} display="flex" justifyContent="center">
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, val) => setPage(val)}
          sx={{ "& .MuiPaginationItem-root": { color: "#fff" } }}
        />
      </Box>

      {/* === PROJECT FORM MODAL === */}
      <Modal
        open={openForm}
        onClose={() => setOpenForm(false)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Box
          component={motion.div}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          sx={{
            bgcolor: "rgba(20,25,40,0.98)",
            p: { xs: 3, sm: 4 },
            borderRadius: "20px",
            width: "100%",
            maxWidth: 420,
            color: "white",
            boxShadow: "0 0 40px rgba(0,229,255,0.3)",
            backdropFilter: "blur(12px)",
            position: "relative",
          }}
        >
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography sx={{ color: "#fff", fontWeight: 600 }}>
              {editingProject ? "Edit Project" : "Add Project"}
            </Typography>
            <IconButton
              sx={{ color: "#fff" }}
              onClick={() => setOpenForm(false)}
            >
              <X />
            </IconButton>
          </Box>

          <TextField
            label="Title"
            name="title"
            value={form.title}
            onChange={handleChange}
            fullWidth
            sx={textFieldStyle}
          />
          <TextField
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
            sx={textFieldStyle}
          />
          <TextField
            label="Image URL"
            name="image_url"
            value={form.image_url}
            onChange={handleChange}
            fullWidth
            sx={textFieldStyle}
          />
          <TextField
            label="Project URL"
            name="project_url"
            value={form.project_url}
            onChange={handleChange}
            fullWidth
            sx={textFieldStyle}
          />

          <Button
            onClick={handleSubmit}
            fullWidth
            sx={{
              mt: 2,
              bgcolor: "#00e5ff",
              color: "#000",
              fontWeight: 600,
              borderRadius: "25px",
              "&:hover": { bgcolor: "#00bcd4" },
            }}
          >
            {editingProject ? "Update Project" : "Add Project"}
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}

/* === STYLES === */
const tabButtonStyle = (active) => ({
  borderColor: "#fff",
  color: active ? "#000" : "#fff",
  bgcolor: active ? "#fff" : "transparent",
  fontWeight: 600,
  borderRadius: "25px",
  px: 3,
  "&:hover": { bgcolor: active ? "#00bcd4" : "rgba(0,229,255,0.1)" },
});

const thStyle = { color: "#fff", fontWeight: 600, fontSize: "0.85rem" };
const tdStyle = {
  color: "#e0e0e0",
  fontSize: "0.8rem",
  wordBreak: "break-word",
};
const textFieldStyle = {
  mb: 2,
  "& .MuiOutlinedInput-root": {
    color: "#fff",
    "& fieldset": { borderColor: "#fff" },
    "&:hover fieldset": { borderColor: "#00e5ff" },
  },
  "& .MuiInputLabel-root": { color: "#aaa" },
};
