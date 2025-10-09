import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Link,
  Card,
  CardContent,
  Fade,
} from "@mui/material";

export default function Blog() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReadme = async () => {
      try {
        const res = await fetch(
          "https://raw.githubusercontent.com/gabfalse/gabfalse/main/README.md"
        );
        const text = await res.text();

        // Ambil bagian antara Blog dan Medium
        const match = text.match(/📚 \*\*Blog and Article\*\*([\s\S]*?)✨/);
        if (!match) return setArticles([]);

        const section = match[1].trim();

        // Ambil semua link + judul artikel dari markdown
        const articleRegex = /• \[(.*?)\]\((.*?)\)/g;
        const parsed = [...section.matchAll(articleRegex)].map((m) => ({
          title: m[1],
          url: m[2],
        }));

        setArticles(parsed);
      } catch (err) {
        console.error("Error loading README:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReadme();
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#121212",
        color: "#fff",
        fontFamily: "'Poppins', sans-serif",
        pt: 12,
        pb: 8,
        px: { xs: 3, sm: 6 },
      }}
    >
      {/* Header Section */}
      <Box textAlign="center" sx={{ mb: 6 }}>
        <Typography
          component="a"
          href="https://medium.com/@gabrielalfarez14"
          target="_blank"
          rel="noopener noreferrer"
          underline="none"
          variant="h3"
          sx={{
            fontWeight: 700,
            letterSpacing: "1px",
            mb: 1,
            color: "white",
            textDecoration: "none",
            transition: "color 0.3s ease",
            "&:hover": {
              color: "#00bcd4",
            },
          }}
        >
          My Blogs
        </Typography>
        <Typography sx={{ color: "#b0b0b0" }}>
          blog where I pour my learning journey. Hopefully can be useful ✍️
        </Typography>
      </Box>

      {/* Articles Section */}
      {loading ? (
        <Box textAlign="center" mt={8}>
          <CircularProgress sx={{ color: "#00bcd4" }} />
        </Box>
      ) : articles.length === 0 ? (
        <Typography textAlign="center" sx={{ opacity: 0.7 }}>
          No articles found.
        </Typography>
      ) : (
        <Fade in timeout={700}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: "repeat(3, 1fr)",
              },
              gap: 3,
              justifyContent: "center",
              maxWidth: 1200,
              mx: "auto",
            }}
          >
            {articles.map((a, i) => (
              <Card
                key={i}
                component="a"
                href={a.url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  textDecoration: "none",
                  backdropFilter: "blur(12px)",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "18px",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
                  transition:
                    "transform 0.3s ease, box-shadow 0.3s ease, border 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-6px) scale(1.02)",
                    boxShadow: "0 0 25px rgba(0,188,212,0.4)",
                    border: "1px solid rgba(0,188,212,0.3)",
                  },
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: "#fff",
                      mb: 1,
                      lineHeight: 1.4,
                    }}
                  >
                    {a.title}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Fade>
      )}
    </Box>
  );
}
