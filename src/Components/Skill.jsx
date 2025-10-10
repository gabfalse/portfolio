import { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Tooltip,
  IconButton,
  Paper,
  Button,
  Modal,
  Fade,
  Backdrop,
  Link,
} from "@mui/material";
import { Javascript, Html, Css, Storage } from "@mui/icons-material";
import "@fontsource/poppins";

export default function Skill() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const frontendSkills = [
    { name: "HTML", icon: <Html sx={{ color: "#e34c26", fontSize: 32 }} /> },
    { name: "CSS", icon: <Css sx={{ color: "#264de4", fontSize: 32 }} /> },
    {
      name: "JavaScript",
      icon: <Javascript sx={{ color: "#f7df1e", fontSize: 32 }} />,
    },
    {
      name: "ReactJS",
      icon: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
          alt="React"
          width={32}
          height={32}
        />
      ),
    },
    {
      name: "Material UI",
      icon: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg"
          alt="Material UI"
          width={32}
          height={32}
        />
      ),
    },
    {
      name: "Bootstrap",
      icon: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg"
          alt="Bootstrap"
          width={32}
          height={32}
        />
      ),
    },
  ];

  const backendSkills = [
    {
      name: "Node.js",
      icon: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
          alt="Node.js"
          width={32}
          height={32}
        />
      ),
    },
    {
      name: "Express.js",
      icon: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg"
          alt="Express"
          width={30}
          height={30}
          style={{ filter: "invert(1)" }}
        />
      ),
    },
    {
      name: "Python",
      icon: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
          alt="Python"
          width={32}
          height={32}
        />
      ),
    },
    {
      name: "Flask",
      icon: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg"
          alt="Flask"
          width={30}
          height={30}
          style={{ filter: "invert(1)" }}
        />
      ),
    },
    {
      name: "PHP",
      icon: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg"
          alt="PHP"
          width={32}
          height={32}
        />
      ),
    },
  ];

  const databaseSkills = [
    {
      name: "MySQL",
      icon: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg"
          alt="MySQL"
          width={32}
          height={32}
        />
      ),
    },
    {
      name: "PostgreSQL",
      icon: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"
          alt="PostgreSQL"
          width={32}
          height={32}
        />
      ),
    },
  ];

  const renderSkills = (skills) => (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      sx={{
        flexWrap: "wrap",
      }}
    >
      {skills.map((skill, index) => (
        <Grid item key={index} xs={4} sm={3} md={2} lg={2}>
          <Tooltip title={skill.name} arrow>
            <Paper
              elevation={4}
              sx={{
                backdropFilter: "blur(10px)",
                background: "rgba(255,255,255,0.05)",
                borderRadius: "16px",
                width: "65px",
                height: "65px",
                mx: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s ease",
                border: "1px solid rgba(255,255,255,0.1)",
                "&:hover": {
                  transform: "translateY(-5px) scale(1.08)",
                  background: "rgba(255,255,255,0.1)",
                  boxShadow: "0 0 10px rgba(0,188,212,0.4)",
                },
              }}
            >
              <IconButton disableRipple sx={{ color: "white" }}>
                {skill.icon}
              </IconButton>
            </Paper>
          </Tooltip>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Box
      sx={{
        textAlign: "center",
        color: "white",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <Typography
        variant="body1"
        sx={{
          color: "#b0b0b0",
          maxWidth: 520,
          mx: "auto",
          mb: 1,
          lineHeight: 1.8,
        }}
      >
        Familiar with <strong>Frontend</strong>, <strong>Backend</strong>, and{" "}
        <strong>Database</strong> technologies for building modern web
        applications.
      </Typography>

      {/* 👇 Added section */}
      <Typography
        variant="body2"
        sx={{
          color: "#9e9e9e",
          mb: 1,
          fontSize: "0.9rem",
          maxWidth: 520,
          mx: "auto",
        }}
      >
        If you are a recruiter, feel free to contact me for my Resume.
      </Typography>

      <Button
        variant="outlined"
        onClick={handleOpen}
        sx={{
          borderColor: "#00bcd4",
          color: "#00bcd4",
          textTransform: "none",
          borderRadius: 50,
          fontWeight: 500,
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: "#00bcd4",
            color: "black",
            transform: "scale(1.05)",
          },
        }}
      >
        View Skills
      </Button>

      {/* Modal Section */}
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 400 }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "90%",
              maxWidth: 650,
              bgcolor: "rgba(20,20,20,0.9)",
              borderRadius: "20px",
              boxShadow: "0 0 25px rgba(0,188,212,0.3)",
              backdropFilter: "blur(15px)",
              p: { xs: 3, sm: 5 },
              textAlign: "center",
              color: "white",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                mb: 4,
                fontWeight: 600,
                letterSpacing: "1px",
                textShadow: "0 0 10px rgba(0,188,212,0.6)",
              }}
            >
              My Skill Set
            </Typography>

            <Box sx={{ mb: 4 }}>
              <Typography
                variant="subtitle1"
                sx={{
                  mb: 2,
                  color: "#00bcd4",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "1.5px",
                }}
              >
                Frontend
              </Typography>
              {renderSkills(frontendSkills)}
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography
                variant="subtitle1"
                sx={{
                  mb: 2,
                  color: "#8bc34a",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "1.5px",
                }}
              >
                Backend
              </Typography>
              {renderSkills(backendSkills)}
            </Box>

            <Box>
              <Typography
                variant="subtitle1"
                sx={{
                  mb: 2,
                  color: "#ff9800",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "1.5px",
                }}
              >
                Database
              </Typography>
              {renderSkills(databaseSkills)}
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}
