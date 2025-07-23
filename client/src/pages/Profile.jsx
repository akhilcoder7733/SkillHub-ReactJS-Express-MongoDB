import { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  CircularProgress,
  Paper,
  Stack,
  Grid,
  Chip,
  Link,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import LanguageIcon from "@mui/icons-material/Language";
import EmailIcon from "@mui/icons-material/Email";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../utils/axiosInstance";
import CustomButton from "../components/CustomButton";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/auth/me");
        setProfileData(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = "Profile - Terminal Wizard";
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={6}>
        <CircularProgress />
      </Box>
    );
  }

  if (!profileData) {
    return (
      <Typography variant="h6" textAlign="center" mt={4}>
        No profile data found.
      </Typography>
    );
  }

  return (
    <Box maxWidth="1100px" mx="auto" mt={6} px={2}>
      <Paper elevation={4} sx={{ p: { xs: 3, sm: 4 }, borderRadius: 4 }}>
        <Grid container spacing={4}>
          {/* Left Section: Avatar and Basic Info */}
          <Grid item xs={12} md={4}>
            <Stack alignItems="center" spacing={2}>
              <Avatar
                src={profileData.avatar || "https://i.pravatar.cc/300"}
                sx={{ width: 120, height: 120 }}
              />
              <Box textAlign="center">
                <Typography variant="h5" fontWeight="bold">
                  {profileData.name}
                </Typography>
                <Typography color="text.secondary">
                  {profileData.role || "Product Designer"}
                </Typography>
                <Typography color="text.secondary" mt={0.5}>
                  {profileData.location || "New York, NY"}
                </Typography>
              </Box>
              <CustomButton
                fullWidth
                startIcon={<EditIcon />}
                sx={{ mt: 2 }}
                onClick={() => navigate("/edit-profile")}
              >
                Edit Profile
              </CustomButton>
            </Stack>
          </Grid>

          {/* Right Section: About */}
          <Grid item xs={12} md={8}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              About
            </Typography>
            <Stack spacing={2.5}>
              <InfoRow
                icon={<PhoneIcon />}
                label="Phone"
                value={profileData.phone || "+1 123 456 7890"}
              />
              <InfoRow
                icon={<EmailIcon />}
                label="Email"
                value={profileData.email}
              />
              <InfoRow
                icon={<LocationOnIcon />}
                label="Address"
                value={profileData.address || "525 68th Street, NY 10065"}
              />
              <InfoRow
                icon={<LanguageIcon />}
                label="Website"
                value={
                  <Link
                    href={profileData.website || "#"}
                    target="_blank"
                    rel="noopener"
                  >
                    {profileData.website || "www.jeremyrose.com"}
                  </Link>
                }
              />
              <InfoRow
                icon={<CalendarTodayIcon />}
                label="Birthday"
                value={profileData.birthday || "June 5, 1992"}
              />

              {/* Bio */}
              <Box>
                <Typography fontWeight="bold" mb={0.5}>
                  Bio:
                </Typography>
                <Typography color="text.secondary" whiteSpace="pre-line">
                  {profileData.bio || "No bio added yet."}
                </Typography>
              </Box>

              {/* Skills */}
              <Box>
                <Typography fontWeight="bold" mb={1}>
                  Skills:
                </Typography>
                <Stack direction="row" flexWrap="wrap" gap={1}>
                  {(
                    profileData.skills || ["Branding", "UI/UX", "Web Design"]
                  ).map((skill, i) => (
                    <Chip key={i} label={skill} />
                  ))}
                </Stack>
              </Box>
              <Box>
                <Typography fontWeight="bold">Social Media:</Typography>
                <Stack direction="row" spacing={2} mt={1}>
                  {profileData.socials?.linkedin && (
                    <Link
                      href={profileData.socials.linkedin}
                      target="_blank"
                      rel="noopener"
                      underline="none"
                      color="inherit"
                    >
                      <Chip
                        icon={<LinkedInIcon sx={{ color: "#0A66C2" }} />}
                        label="LinkedIn"
                        variant="outlined"
                      />
                    </Link>
                  )}
                  {profileData.socials?.github && (
                    <Link
                      href={profileData.socials.github}
                      target="_blank"
                      rel="noopener"
                      underline="none"
                      color="inherit"
                    >
                      <Chip label="GitHub" variant="outlined" />
                    </Link>
                  )}
                  {profileData.socials?.twitter && (
                    <Link
                      href={profileData.socials.twitter}
                      target="_blank"
                      rel="noopener"
                      underline="none"
                      color="inherit"
                    >
                      <Chip label="Twitter" variant="outlined" />
                    </Link>
                  )}
                  {!profileData.socials && (
                    <Typography color="text.secondary">
                      No social links added yet.
                    </Typography>
                  )}
                </Stack>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

// Reusable Info Row component
const InfoRow = ({ icon, label, value }) => (
  <Box display="flex" alignItems="center" gap={1}>
    {icon}
    <Typography fontWeight="bold" sx={{ minWidth: 90 }}>
      {label}:
    </Typography>
    <Typography color="text.secondary" sx={{ wordBreak: "break-word" }}>
      {value}
    </Typography>
  </Box>
);

export default Profile;
