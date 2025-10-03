import React, { useState, useEffect, useRef } from "react";
import { Box } from "@mui/material";

export default function TorchReveal({ children, radius = 300 }) {
  const [pos, setPos] = useState({ x: -9999, y: -9999 });
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const node = containerRef.current;
    node.addEventListener("mousemove", handleMove);
    return () => node.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <Box
      ref={containerRef}
      sx={{
        position: "relative",
        overflow: "hidden",
        bgcolor: "#000", // background dasar hitam
      }}
    >
      {/* Konten Experience (lebih terlihat) */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          color: "white",
          opacity: 0.8, // konten lebih jelas
          transition: "opacity 0.3s",
        }}
      >
        {children}
      </Box>

      {/* Overlay Torch */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(
      circle ${radius}px at ${pos.x}px ${pos.y}px,
      rgba(0,0,0,0) 0%,
      rgba(0,0,0,0.05) 60%,
      rgba(0,0,0,0.5) 100%
    )`,
          pointerEvents: "none",
          zIndex: 2,
        }}
      />
    </Box>
  );
}
