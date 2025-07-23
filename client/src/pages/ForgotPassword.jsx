import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  Link as MuiLink,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import FullScreenLoader from "../components/FullScreenLoader";
import { useToast } from "../contexts/ToastContext.js"; // ✅ your toast context
import CustomButton from "../components/CustomButton.jsx";

const ForgotPassword = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { showToast } = useToast(); // ✅ use your context

  const [email, setEmail] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = "Forgot Password - Terminal Wizard";
  }, []);

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleReset = () => {
    if (!email || !isValidEmail(email)) {
      setShake(true);
      showToast("Please enter a valid email address", "error");

      setTimeout(() => setShake(false), 500); // reset animation
      return;
    }

    setShowLoader(true);
    setTimeout(() => {
      setShowLoader(false);
      setOpenModal(true);
    }, 2000); // simulate request
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEmail("");
    navigate("/login");
  };

  return (
    <>
      {showLoader && <FullScreenLoader />}

      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        bgcolor={theme.palette.background.default}
      >
        <Box
          width={{ xs: "90%", sm: "400px" }}
          p={4}
          borderRadius={4}
          boxShadow={theme.palette.mode === "dark" ? 6 : 3}
          bgcolor={theme.palette.background.paper}
          data-aos="zoom-in"
        >
          <Typography variant="h5" fontWeight="bold" textAlign="center" mb={1}>
            Forgot Password?
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            textAlign="center"
            mb={3}
          >
            Enter your email and we’ll send you a reset link.
          </Typography>

          <motion.div
            animate={shake ? { x: [0, -10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.4 }}
          >
            <TextField
              fullWidth
              type="email"
              label="Email"
              placeholder="youremail@example.com"
              variant="standard"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={shake}
            />
          </motion.div>

          <CustomButton
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 2, py: 1.5, fontWeight: 600 }}
            onClick={handleReset}
          >
            Reset Password
          </CustomButton>

          <Typography variant="body2" textAlign="center" mt={3}>
            Don’t have an account?{" "}
            <MuiLink
              component="button"
              onClick={() => navigate("/login")}
              underline="hover"
            >
              Sign Up
            </MuiLink>
          </Typography>
        </Box>
      </Box>

      <Dialog
  open={openModal}
  onClose={handleCloseModal}
  PaperProps={{
    component: motion.div,
    initial: { opacity: 0, scale: 0.8, y: -20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.8, y: 20 },
    transition: { duration: 0.4, ease: "easeInOut" },
    style: {
      borderRadius: 16,
      padding: theme.spacing(3),
      background: theme.palette.background.paper,
      boxShadow: theme.palette.mode === "dark"
        ? "0px 10px 40px rgba(255,255,255,0.1)"
        : "0px 10px 30px rgba(0,0,0,0.1)",
    },
  }}
  BackdropProps={{
    component: motion.div,
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 },
    style: {
      backgroundColor: theme.palette.mode === "dark"
        ? "rgba(0,0,0,0.7)"
        : "rgba(0,0,0,0.4)",
    },
  }}
>
  <DialogTitle sx={{ fontWeight: "bold", textAlign: "center" }}>
    ✅ Reset Link Sent!
  </DialogTitle>
  <DialogContent>
    <Typography variant="body1" textAlign="center" color="text.secondary">
      We've sent a password reset link to <strong>{email}</strong>. <br />
      Please check your inbox and follow the instructions.
    </Typography>
  </DialogContent>
  <DialogActions sx={{ justifyContent: "center", mt: 1 }}>
    <CustomButton variant="contained" onClick={handleCloseModal}>
      Got it!
    </CustomButton>
  </DialogActions>
</Dialog>

    </>
  );
};

export default ForgotPassword;
