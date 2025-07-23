// Register.jsx
import { useState, useContext, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
  InputAdornment,
  Link,
  Divider,
  Select,
  MenuItem,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import API from "../utils/axiosInstance";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useToast } from "../contexts/ToastContext";
import CoverImg from "../assets/reg.jpeg";
import FullScreenLoader from "../components/FullScreenLoader";
import CustomButton from "../components/CustomButton";
import { useTranslation } from "react-i18next";

const Register = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t, i18n } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loader

    try {
      const res = await API.post("/auth/register", form);
      login(res.data.user, res.data.token);
      showToast("Registration successful!", "success");
      navigate("/login");
    } catch (err) {
      showToast("Registration failed. Please try again.", "error");
    } finally {
      setLoading(false); // Hide loader
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = "Register - Terminal Wizard";
  }, []);

  if (loading) return <FullScreenLoader />;

  return (
    <Box display="flex" height="100vh" width="100%" sx={{ overflow: "hidden" }}>
      <Box
        sx={{
          flex: 1,
          display: { xs: "none", md: "block" },
          backgroundImage: `url(${CoverImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          p: 3,
        }}
        data-aos="fade-up"
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            color: "#fff",
          }}
        >
          <Typography variant="body1">Selected Works</Typography>
          <Box>
            <Button
              sx={{ color: "#fff", mr: 1 }}
              onClick={() => navigate("/login")}
            >
              Sign In
            </Button>
            <Button
              onClick={() => navigate("/login")}
              variant="contained"
              sx={{ backgroundColor: "#fff", color: "#000" }}
            >
              Join Us
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            position: "absolute",
            bottom: 20,
            left: 20,
            display: "flex",
            alignItems: "center",
            color: "#fff",
          }}
        >
          <Box>
            <Typography variant="body1">Andrew.ui</Typography>
            <Typography variant="caption">UI & Illustration</Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 4,
        }}
      >
        <Box data-aos="zoom-in" style={{ width: "100%", maxWidth: 400 }}>
          <Box mb={2} textAlign="right">
            <Select
              value={i18n.language}
              onChange={(e) => i18n.changeLanguage(e.target.value)}
              size="small"
            >
              <MenuItem value="en">EN</MenuItem>
              <MenuItem value="hi">HI</MenuItem>
            </Select>
          </Box>

          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {t("register.title")}
          </Typography>

          <Typography variant="body2" color="text.secondary" mb={3}>
            {t("register.subtitle")}
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="Name"
              fullWidth
              margin="normal"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              margin="normal"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Divider sx={{ my: 2 }}>or</Divider>

            <Button
              variant="outlined"
              fullWidth
              sx={{ mb: 2, textTransform: "none" }}
              startIcon={
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  width={20}
                  alt="google"
                />
              }
            >
              Register with Google
            </Button>

            <CustomButton fullWidth type="submit" sx={{ borderRadius: 2 }}>
              {t("register.button")}
            </CustomButton>

            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              {t("register.already")}{" "}
              <Link component={RouterLink} to="/login">
                {t("register.login")}
              </Link>
            </Typography>
          </Box>

          <Box mt={4} display="flex" justifyContent="center" gap={3}>
            <i className="ri-facebook-line" style={{ fontSize: 20 }}></i>
            <i className="ri-twitter-line" style={{ fontSize: 20 }}></i>
            <i className="ri-instagram-line" style={{ fontSize: 20 }}></i>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
