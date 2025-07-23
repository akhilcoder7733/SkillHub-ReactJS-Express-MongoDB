import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const ThemeContext = createContext();

const getInitialMode = () => {
  const saved = localStorage.getItem("themeMode");
  return saved === "dark" || saved === "light" ? saved : "light";
};

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(getInitialMode);

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const theme = useMemo(() =>
    createTheme({
      palette: {
        mode,
        primary: {
          main: "#38bdf8",
        },
        secondary: {
          main: "#f50057",
        },
        background: {
          default: mode === "dark" ? "#0f172a" : "#f7f7f7",
          paper: mode === "dark" ? "#1e293b" : "#ffffff",
        },
        text: {
          primary: mode === "dark" ? "#f1f5f9" : "#1e293b",
          secondary: mode === "dark" ? "#94a3b8" : "#475569",
        },
      },
      typography: {
        fontFamily: `Josefin Sans, sans-serif`,
      },
    }), [mode]
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
