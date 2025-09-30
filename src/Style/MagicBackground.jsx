import React from "react";
import { Box } from "@mui/material";

export default function MagicBackground() {
  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        zIndex: 1,
        background:
          "radial-gradient(circle at 20% 30%, rgba(0,255,255,0.15), transparent 70%), radial-gradient(circle at 80% 70%, rgba(255,0,255,0.15), transparent 70%)",
        "&::before": {
          content: '""',
          position: "absolute",
          width: "200%",
          height: "200%",
          top: "-50%",
          left: "-50%",
          background: "conic-gradient(from 0deg, #00f5ff, #ff00ff, #00f5ff)",
          animation: "spinBg 20s linear infinite",
          opacity: 0.08,
        },
        "&::after": {
          content: '""',
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(2px 2px at 20% 30%, rgba(255,255,255,0.8), transparent),
                            radial-gradient(2px 2px at 70% 80%, rgba(255,255,255,0.6), transparent),
                            radial-gradient(2px 2px at 40% 60%, rgba(0,255,255,0.7), transparent),
                            radial-gradient(2px 2px at 90% 20%, rgba(255,0,255,0.7), transparent)`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
          animation: "twinkle 3s infinite alternate",
        },
        "@keyframes spinBg": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "@keyframes twinkle": {
          "0%": { opacity: 0.3 },
          "100%": { opacity: 0.8 },
        },
      }}
    />
  );
}
