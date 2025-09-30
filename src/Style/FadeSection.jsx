import React, { useEffect, useRef, useState } from "react";
import { Box, Fade } from "@mui/material";

export default function FadeSection({ children, id }) {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.id === id) {
            setVisible(entry.isIntersecting);
          }
        });
      },
      { threshold: 0.5 } // 50% section harus kelihatan untuk aktif
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, [id]);

  return (
    <Fade in={visible} timeout={800}>
      <Box
        ref={sectionRef}
        id={id}
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {children}
      </Box>
    </Fade>
  );
}
