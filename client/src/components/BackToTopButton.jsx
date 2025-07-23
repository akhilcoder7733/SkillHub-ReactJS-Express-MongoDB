// src/components/BackToTopButton.jsx
import { useEffect, useState } from "react";
import { Fab, Zoom } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const BackToTopButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    if (window.scrollY > 300) setVisible(true);
    else setVisible(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisible);
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  return (
    <Zoom in={visible}>
      <Fab
        onClick={scrollToTop}
        color="primary"
        size="medium"
        sx={{
          position: "fixed",
          bottom: 32,
          right: 32,
          zIndex: 1300,
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
          bgcolor: "primary.main",
          color: "#fff",
          "&:hover": {
            bgcolor: "primary.dark",
            transform: "scale(1.1)",
          },
          transition: "all 0.3s ease",
        }}
        aria-label="Back to top"
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </Zoom>
  );
};

export default BackToTopButton;
