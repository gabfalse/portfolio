import React, { createContext, useContext, useMemo, useEffect } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import createAppTheme from "./theme";

const ThemeModeContext = createContext({ mode: "dark" });

export function useThemeMode() {
  return useContext(ThemeModeContext);
}

export default function ThemeModeProvider({ children }) {
  const mode = "dark"; // langsung dark mode

  useEffect(() => {
    try {
      localStorage.setItem("themeMode", mode);
    } catch {
      // abaikan error (misalnya di private mode)
    }
  }, [mode]);

  const theme = useMemo(() => createAppTheme(mode), [mode]);

  return (
    <ThemeModeContext.Provider value={{ mode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}
