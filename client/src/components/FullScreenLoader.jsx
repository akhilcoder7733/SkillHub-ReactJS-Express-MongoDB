import React from "react";
import { Box, useTheme } from "@mui/material";
import { HashLoader } from "react-spinners";

const FullScreenLoader = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      width="100vw"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgcolor={isDark ? "rgba(0,0,0,0.8)" : "rgba(255,255,255,0.8)"}
      backdropFilter="blur(6px)"
      zIndex={9999}
    >
      <HashLoader
        size={70}
        color={isDark ? "#90caf9" : "#1976d2"}
        loading={true}
      />
    </Box>
  );
};

export default FullScreenLoader;
