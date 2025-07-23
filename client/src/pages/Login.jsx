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
import CoverImg from "../assets/log.jpeg";
import FullScreenLoader from "../components/FullScreenLoader";
import CustomButton from "../components/CustomButton";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "fake@fake.com",
    password: "ZDfKGO3TOpAbQHn",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loader immediately

    try {
      const res = await API.post("/auth/login", form);

      setTimeout(() => {
        login(res.data.user, res.data.token);
        showToast("Login successful!", "success");
        navigate("/");
      }, 2000); // Delay navigation by 2 seconds
    } catch (err) {
      setTimeout(() => {
        showToast("Invalid credentials. Please try again.", "error");
        setLoading(false); // Hide loader after 2 seconds
      }, 2000);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = "Login - Terminal Wizard";
  }, []);

  if (loading) return <FullScreenLoader />;

  return (
    <Box display="flex" height="100vh" width="100%" sx={{ overflow: "hidden" }}>
      {/* Left Image Section */}
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
        data-aos="fade-in"
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
              onClick={() => navigate("/register")}
            >
              Sign Up
            </Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#fff", color: "#000" }}
              onClick={() => navigate("/register")}
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

      {/* Right Form Section */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 4,
        }}
      >
        <Box data-aos="fade-up" style={{ width: "100%", maxWidth: 400 }}>
          {/* Language selector */}
          <Box mb={2} textAlign="right">
            <Select value={"en"} size="small">
              <MenuItem value="en">EN</MenuItem>
              <MenuItem value="hi">HI</MenuItem>
            </Select>
          </Box>

          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Hi Designer
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Welcome to UISOCIAL
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
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

            <Box textAlign="right" mt={1}>
              <Link
                component={RouterLink}
                to="/forgot-password"
                color="primary"
              >
                Forgot password?
              </Link>
            </Box>

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
              Login with Google
            </Button>

            <CustomButton
            fullWidth
              type="submit"
              sx={{ borderRadius: 2 }}
            >
              Login
            </CustomButton>

            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              Don’t have an account?{" "}
              <Link component={RouterLink} to="/register">
                Sign up
              </Link>
            </Typography>
          </Box>

          {/* Social media icons */}
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

export default Login;
