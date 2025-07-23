import { useEffect, useState } from "react";
import API from "../utils/axiosInstance";
import {
  Box,
  Typography,
  Stack,
  Paper,
  Avatar,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";
import SkillCard from "../components/SkillCard";

const ExploreSkills = () => {
  const [skills, setSkills] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    API.get("/skills")
      .then((res) => setSkills(res.data))
      .catch(() => setSkills([]));
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = "Explore skills-Terminal Wizard";
  }, []);

  const scrollbarStyles = {
    "&::-webkit-scrollbar": {
      width: "8px",
    },
    "&::-webkit-scrollbar-track": {
      background: theme.palette.background.paper,
      borderRadius: "8px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.primary.main,
      borderRadius: "8px",
      border: `2px solid ${theme.palette.background.paper}`,
    },
    scrollbarWidth: "thin",
    scrollbarColor: `${theme.palette.primary.main} ${theme.palette.background.paper}`,
  };

  const filteredSkills = skills.filter((skill) => {
    const query = searchQuery.toLowerCase();
    return skill.title?.toLowerCase().includes(query);
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isSmallScreen ? "column" : "row",
        height: isSmallScreen ? "auto" : "calc(100vh - 80px)",
        overflow: "hidden",
        // px: 2,
        p: 2,
        gap: 2,
        bgcolor: theme.palette.background.default,
        // py:2
      }}
    >
      {/* Left Sidebar */}
      <Box
        sx={{
          width: isSmallScreen ? "100%" : 300,
          flexShrink: 0,
          overflowY: "auto",
          maxHeight: isSmallScreen ? "auto" : "100%",
          ...scrollbarStyles,
        }}
      >
        <Paper
          elevation={3}
          sx={{ p: 2, borderRadius: 4, height: "100%" }}
          data-aos="fade-right"
          data-aos-delay="100"
        >
          <Stack spacing={2} alignItems="center">
            <Avatar sx={{ width: 80, height: 80 }} />
            <Typography variant="h6">Bond</Typography>
            <Typography variant="body2" color="text.secondary">
              React Developer 🚀
            </Typography>
            <Divider flexItem />
            <Stack spacing={1} width="100%">
              <Typography fontWeight="bold">Your Shortcuts</Typography>
              {["Frontend Dev", "UI/UX", "AI Projects", "MERN Stack"].map(
                (item) => (
                  <Typography key={item} variant="body2" color="primary">
                    {item}
                  </Typography>
                )
              )}
            </Stack>
          </Stack>
        </Paper>
      </Box>

      {/* Center Scrollable Skill Feed */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          display: "flex",
          justifyContent: "center",
          maxHeight: isSmallScreen ? "auto" : "100%",
          ...scrollbarStyles,
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "700px",
            py: 3,
          }}
        >
          <Box mb={3} data-aos="fade-in" data-aos-delay="100">
            <input
              type="text"
              placeholder="Search skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: "8px",
                border: `1px solid ${theme.palette.divider}`,
                outline: "none",
                fontSize: "16px",
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
              }}
            />
          </Box>
          <Typography
            data-aos="fade-in"
            data-aos-delay="150"
            variant="h5"
            fontWeight="bold"
            gutterBottom
          >
            🌟 Explore Shared Skills
          </Typography>

          <Stack spacing={3}>
            {skills.length === 0 ? (
              <Typography variant="body1" color="text.secondary">
                No skills available.
              </Typography>
            ) : filteredSkills.length === 0 ? (
              <Typography variant="body1" color="text.secondary">
                No matching skills found.
              </Typography>
            ) : (
              filteredSkills.map((skill, index) => (
                <motion.div
                  key={skill._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <SkillCard
                    skill={skill}
                    onDelete={(deletedId) =>
                      setSkills((prev) =>
                        prev.filter((s) => s._id !== deletedId)
                      )
                    }
                  />
                </motion.div>
              ))
            )}
          </Stack>
        </Box>
      </Box>

      {/* Right Sidebar */}
      <Box
        sx={{
          width: isSmallScreen ? "100%" : 300,
          flexShrink: 0,
          overflowY: "auto",
          maxHeight: isSmallScreen ? "auto" : "100%",
          ...scrollbarStyles,
        }}
      >
        <Paper
          elevation={3}
          sx={{ p: 2, borderRadius: 4, height: "100%" }}
          data-aos="fade-right"
          data-aos-delay="200"
        >
          <Typography fontWeight="bold" mb={2}>
            🔔 Recent Activity
          </Typography>
          {["Anna followed you", "John liked your post", "Mike commented"].map(
            (text, i) => (
              <Typography key={i} variant="body2" sx={{ mb: 1 }}>
                {text}
              </Typography>
            )
          )}
          <Divider sx={{ my: 2 }} />
          <Typography fontWeight="bold" mb={2}>
            🎯 Suggested For You
          </Typography>
          {["Jessica", "Aarav", "Priya"].map((user, i) => (
            <Typography key={i} variant="body2" color="primary">
              {user}
            </Typography>
          ))}
        </Paper>
      </Box>
    </Box>
  );
};

export default ExploreSkills;
