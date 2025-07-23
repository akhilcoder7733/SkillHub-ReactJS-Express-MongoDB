// EditProfile.jsx
import {
  Box,
  Typography,
  Avatar,
  TextField,
  Stack,
  IconButton,
  CircularProgress,
  useTheme,
  Paper,
  useMediaQuery,
  Drawer,
  AppBar,
  Toolbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import EditIcon from "@mui/icons-material/Edit";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useEffect, useState } from "react";
import API from "../utils/axiosInstance";
import SidebarMenu from "../components/SidebarMenu";
import CustomButton from "../components/CustomButton";
import { useToast } from "../contexts/ToastContext";
import { useDialog } from "../contexts/DialogContext";

const EditProfile = () => {
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { showToast } = useToast();
  const { showDialog } = useDialog();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
    avatar: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await API.get("/auth/me");
      setFormData(res.data);
    };
    fetchProfile();
  }, []);

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSave = async () => {
    showDialog({
      title: "Confirm Save",
      message: "Are you sure you want to save changes to your profile?",
      onConfirm: async () => {
        try {
          setLoading(true);
          await API.put("/auth/update-profile", formData);
          showToast("Profile updated successfully!", "success");
        } catch (err) {
          showToast("Failed to update profile. Please try again.", "error");
        } finally {
          setLoading(false);
        }
      },
    });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = "Edit Profile - Terminal Wizard";
  }, []);

  return (
    <Stack direction="column" minHeight="100vh">
      {isMdDown && (
        <AppBar position="static" color="default" elevation={0}>
          <Toolbar>
            <IconButton onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" fontWeight="bold" sx={{ ml: 2 }}>
              Edit Profile
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      <Stack direction="row" flex={1}>
        {isMdDown ? (
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            sx={{
              "& .MuiDrawer-paper": {
                width: "auto",
                boxSizing: "border-box",
              },
            }}
          >
            <Box
              sx={{
                height: "100%",
                overflowY: "auto",
                "&::-webkit-scrollbar": {
                  width: "3px",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: "4px",
                },
                "&::-webkit-scrollbar-track": {
                  backgroundColor: "transparent",
                },
                scrollbarWidth: "thin",
                scrollbarColor: `${theme.palette.primary.main} transparent`,
              }}
            >
              <SidebarMenu />
            </Box>
          </Drawer>
        ) : (
          <Box width="250px" px={3} py={2}>
            <SidebarMenu />
          </Box>
        )}

        <Box flex={1} px={{ xs: 2, sm: 4 }} py={3}>
          {!isMdDown && (
            <Typography variant="h5" fontWeight="bold" mb={3}>
              Edit Profile
            </Typography>
          )}

          <Paper variant="outlined" sx={{ p: { xs: 2, sm: 3 }, mb: 4 }}>
            <Stack
              direction={isSmDown ? "column" : "row"}
              alignItems="center"
              spacing={3}
            >
              <Avatar
                src="https://i.pravatar.cc/100"
                sx={{ width: 80, height: 80 }}
              />
              <Box textAlign={isSmDown ? "center" : "left"}>
                <Typography variant="body2" color="text.secondary">
                  Upload new photo
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  At least 800x800 px. JPG or PNG.
                </Typography>
              </Box>
            </Stack>
          </Paper>

          <Paper variant="outlined" sx={{ p: { xs: 2, sm: 3 }, mb: 4 }}>
            <Stack direction="row" justifyContent="space-between" mb={2}>
              <Typography fontWeight="bold">Personal Info</Typography>
              <IconButton>
                <EditIcon />
              </IconButton>
            </Stack>
            <Stack spacing={2}>
              <TextField
                label="Full Name"
                value={formData.name}
                onChange={handleChange("name")}
                fullWidth
              />
              <TextField
                label="Email"
                value={formData.email}
                onChange={handleChange("email")}
                fullWidth
              />
              <TextField
                label="Phone"
                value={formData.phone}
                onChange={handleChange("phone")}
                fullWidth
              />
              <TextField
                label="Location"
                value={formData.location}
                onChange={handleChange("location")}
                fullWidth
                InputProps={{
                  startAdornment: <LocationOnIcon sx={{ mr: 1 }} />,
                }}
              />
              <TextField
                fullWidth
                multiline
                minRows={4}
                value={formData.bio}
                onChange={handleChange("bio")}
              />
              <CustomButton onClick={handleSave} disabled={loading}>
                {loading ? "Saving..." : "Save changes"}
              </CustomButton>
            </Stack>
          </Paper>
        </Box>

        {!isMdDown && (
          <Box width="280px" p={3}>
            <Paper variant="outlined" sx={{ p: 3, textAlign: "center" }}>
              <Typography fontWeight="bold" mb={2}>
                Complete your profile
              </Typography>
              <CircularProgress
                variant="determinate"
                value={40}
                size={100}
                thickness={5}
                sx={{ mb: 2 }}
              />
              <Typography variant="h6">40%</Typography>
              <Box mt={2} textAlign="left">
                <Typography fontSize={14}>✅ Setup account - 10%</Typography>
                <Typography fontSize={14}>✅ Upload photo - 5%</Typography>
                <Typography fontSize={14}>✅ Personal info - 10%</Typography>
                <Typography fontSize={14}>✅ Location - 20%</Typography>
                <Typography fontSize={14}>🕒 Bio - 15%</Typography>
                <Typography fontSize={14}>🔔 Notifications - 10%</Typography>
                <Typography fontSize={14}>🏦 Bank details - 30%</Typography>
              </Box>
            </Paper>
          </Box>
        )}
      </Stack>
    </Stack>
  );
};

export default EditProfile;
