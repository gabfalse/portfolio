import React, { useEffect, useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import { supabase } from "../supabase/client";
import AdminDashboard from "../components/AdminDashboard";

export default function Admin() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      setLoading(true);
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        setIsAdmin(false);
      } else {
        // Ganti dengan emailmu sendiri
        setIsAdmin(user.email === "gabrielalfarez14@gmail.com");
      }
      setLoading(false);
    };

    checkUser();
  }, []);

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Admin Panel
        </Typography>

        {loading ? (
          <Typography>Loading...</Typography>
        ) : isAdmin ? (
          <AdminDashboard />
        ) : (
          <Typography color="error">
            You do not have permission to view this page.
          </Typography>
        )}
      </Box>
    </Container>
  );
}
