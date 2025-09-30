import { createTheme } from "@mui/material/styles";

export const getDesignTokens = () => ({
  palette: {
    mode: "dark", // langsung dark
    primary: { main: "#60a5fa" },
    secondary: { main: "#c4b5fd" },
    background: { default: "#0b1220", paper: "#071026" },
    text: { primary: "#e6eef8", secondary: "#9aa9bf" },
  },
  typography: {
    fontFamily: ["Inter", "Roboto", "Helvetica", "Arial", "sans-serif"].join(
      ","
    ),
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: { styleOverrides: { root: { textTransform: "none" } } },
    MuiCard: {
      styleOverrides: {
        root: { borderRadius: 16, boxShadow: "0 6px 18px rgba(0,0,0,0.25)" },
      },
    },
  },
});

export default function createAppTheme() {
  return createTheme(getDesignTokens());
}
