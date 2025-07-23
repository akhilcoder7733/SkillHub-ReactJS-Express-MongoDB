import React from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      minHeight="80vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      p={2}
    >
      <Box
        width="100%"
        maxWidth="900px"
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems="center"
        gap={6}
      >
        {/* Left Section */}
        <Box flex="1" minWidth="280px" data-aos="zoom-in" data-aos-delay="100">
          <Typography
            variant="h1"
            fontWeight="bold"
            sx={{
              background: "linear-gradient(to right, #1976d2, #00bcd4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: { xs: "5rem", md: "7rem" },
              animation: "pulse 2s infinite",
            }}
          >
            404
          </Typography>
          <Typography variant="h5" mt={1} color="text.primary">
            Oops! Page Not Found
          </Typography>
          <Typography variant="body1" mt={2} color="text.secondary">
            Ok, this is awkward... but the page you're looking for doesn't
            exist.
          </Typography>

          <Stack direction="row" spacing={2} mt={4}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/")}
            >
              Home
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate(-1)}
              sx={{
                color: "#1976d2",
                borderColor: "#1976d2",
                "&:hover": {
                  borderColor: "#1976d2",
                  backgroundColor: "#e3f5ff",
                },
              }}
            >
              Back
            </Button>
          </Stack>
        </Box>

        {/* Right Section */}
        <Box
          flex="1"
          minWidth="280px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <Typography
            variant="h4"
            sx={{
              color: "text.secondary",
              fontStyle: "italic",
              textAlign: "center",
              animation: "fadeIn 3s ease-in-out infinite alternate",
            }}
          >
            “Lost in the void of the internet…”
          </Typography>
        </Box>
      </Box>

      {/* Custom Animations */}
      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
          100% { transform: scale(1); opacity: 1; }
        }

        @keyframes fadeIn {
          from { opacity: 0.4; }
          to { opacity: 1; }
        }
      `}</style>
    </Box>
  );
};

export default NotFound;
