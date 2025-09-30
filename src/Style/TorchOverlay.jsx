import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";

export default function TorchOverlay({ enabled = true, radius = 200 }) {
  const overlayRef = useRef(null);
  const [pos, setPos] = useState({ x: "50%", y: "50%" });
  const [hue, setHue] = useState(200);

  // animasi warna
  useEffect(() => {
    let frame;
    const animate = () => {
      setHue((prev) => (prev + 1) % 360);
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, []);

  // gerakan cursor / sentuhan
  useEffect(() => {
    if (!enabled) return;

    const handler = (e) => {
      const x = e.clientX + "px";
      const y = e.clientY + "px";
      setPos({ x, y });
      if (overlayRef.current) {
        overlayRef.current.style.setProperty("--mx", x);
        overlayRef.current.style.setProperty("--my", y);
      }
    };

    const touchHandler = (e) => {
      if (e.touches && e.touches[0]) {
        const x = e.touches[0].clientX + "px";
        const y = e.touches[0].clientY + "px";
        setPos({ x, y });
        if (overlayRef.current) {
          overlayRef.current.style.setProperty("--mx", x);
          overlayRef.current.style.setProperty("--my", y);
        }
      }
    };

    window.addEventListener("mousemove", handler, { passive: true });
    window.addEventListener("touchmove", touchHandler, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handler);
      window.removeEventListener("touchmove", touchHandler);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <Box
      ref={overlayRef}
      sx={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 1400,
        "--mx": pos.x,
        "--my": pos.y,
        background: `radial-gradient(
          circle ${radius}px at var(--mx) var(--my),
          hsla(${hue}, 100%, 70%, 0.9) 0%,
          hsla(${(hue + 60) % 360}, 100%, 60%, 0.6) 40%,
          rgba(0,0,0,1) 100%
        )`,
        transition: "background 80ms linear",
        mixBlendMode: "screen", // biar warnanya lebih vibrant
        backgroundColor: "#000", // fallback background
      }}
    />
  );
}
