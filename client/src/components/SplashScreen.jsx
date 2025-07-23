// src/components/SplashScreen.jsx
import { Box, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";

const SplashScreen = () => {
  const theme = useTheme();

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1, delay: 2 }}
      sx={{
        height: "100vh",
        width: "100%",
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 2000,
      }}
    >
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Typography variant="h3" sx={{ fontWeight: 700, fontFamily: "Kanit, sans-serif" }}>
          SkillHub
        </Typography>
      </motion.div>
    </Box>
  );
};

export default SplashScreen;
