import { useState } from "react";
import {
  Box,
  Typography,
  Stack,
  TextField,
  Button,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";
import { GitHub, Twitter, Instagram, LinkedIn } from "@mui/icons-material";
import { useToast } from "../contexts/ToastContext"; // adjust the path if needed

const MotionBox = motion(Box);

const Footer = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));

  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const { showToast } = useToast();

  const handleSubscribe = () => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValid) {
      setError(true);
      showToast("Please enter a valid email.", "error");
      return;
    }
    setError(false);
    setEmail("");
    showToast("Subscribed successfully! 🚀", "success");
  };

  return (
    <Box
      component="footer"
      sx={{
        px: 4,
        py: 6,
        bgcolor: isDark ? "#121212" : "#f9f9f9",
        color: theme.palette.text.primary,
      }}
    >
      <Stack
        direction={isSmall ? "column" : "row"}
        spacing={4}
        justifyContent="space-between"
        alignItems={isSmall ? "flex-start" : "center"}
      >
        {/* Footer Links */}
        <Stack spacing={1}>
          <Typography variant="h6" fontWeight="bold">
            Terminal Wizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} All rights reserved.
          </Typography>
          <Stack direction="row" spacing={1}>
            {[GitHub, Twitter, LinkedIn, Instagram].map((Icon, i) => (
              <IconButton
                key={i}
                color="primary"
                component="a"
                href="#"
                target="_blank"
                rel="noopener"
              >
                <Icon />
              </IconButton>
            ))}
          </Stack>
        </Stack>

        {/* Quick Links */}
        <Stack spacing={1}>
          <Typography fontWeight="bold">Quick Links</Typography>
          {["About", "Skills", "Projects", "Contact"].map((link, i) => (
            <Typography
              key={i}
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                "&:hover": {
                  color: theme.palette.primary.main,
                  cursor: "pointer",
                  transform: "translateX(2px)",
                  transition: "all 0.3s ease",
                },
              }}
            >
              {link}
            </Typography>
          ))}
        </Stack>

        {/* Subscribe */}
        <Stack spacing={1} sx={{ width: isSmall ? "100%" : "300px" }}>
          <Typography fontWeight="bold">Subscribe</Typography>
          <Typography variant="body2" color="text.secondary">
            Get updates about new skills and features.
          </Typography>

          <MotionBox
            animate={error ? { x: [-6, 6, -4, 4, -2, 2, 0] } : {}}
            transition={{ duration: 0.4 }}
          >
            <TextField
              fullWidth
              size="small"
              label="Your email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={error}
              helperText={error ? "Please enter a valid email." : ""}
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: theme.palette.background.paper,
                },
              }}
            />
          </MotionBox>

          <Button
            variant="contained"
            color="primary"
            onClick={handleSubscribe}
          >
            Subscribe
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Footer;
