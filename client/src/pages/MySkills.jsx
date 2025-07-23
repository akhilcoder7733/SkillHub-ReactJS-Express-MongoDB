import { useEffect, useState } from "react";
import API from "../utils/axiosInstance";
import {
  Container,
  Typography,
  Stack,
  Fab,
  Box,
  Divider,
  useTheme,
  TextField,
  InputAdornment,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import SkillCard from "../components/SkillCard";

const MySkills = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [skills, setSkills] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    API.get("/skills/me")
      .then((res) => setSkills(res.data))
      .catch(() => setSkills([]));

    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = "My Skills - Terminal Wizard";
  }, []);

  // Filtered list based on search input
  const filteredSkills = skills.filter((skill) => {
    const query = searchQuery.toLowerCase();
    return (
      (skill.name?.toLowerCase() || "").includes(query) ||
      (skill.category?.toLowerCase() || "").includes(query) ||
      (skill.description?.toLowerCase() || "").includes(query)
    );
  });

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        mb={4}
      >
        <Typography variant="h4" fontWeight="bold" color="text.primary">
          🧠 My Skills
        </Typography>

        <Fab
          variant="extended"
          color="primary"
          size="medium"
          onClick={() => navigate("/add-skill")}
          sx={{
            mt: { xs: 2, sm: 0 },
            textTransform: "none",
            px: 3,
            boxShadow: theme.shadows[3],
          }}
        >
          <AddIcon sx={{ mr: 1 }} />
          Add Skill
        </Fab>
      </Box>

      {/* Search */}
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search skills by name, category, or description..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 4 }}
      />

      <Divider sx={{ mb: 4 }} />

      {/* Skill List */}
      <Stack spacing={3}>
        {filteredSkills.length > 0 ? (
          filteredSkills.map((skill) => (
            <SkillCard
              key={skill._id}
              skill={skill}
              onDelete={(deletedId) =>
                setSkills((prev) => prev.filter((s) => s._id !== deletedId))
              }
            />
          ))
        ) : (
          <Typography variant="body1" color="text.secondary">
            No matching skills found.
          </Typography>
        )}
      </Stack>
    </Container>
  );
};

export default MySkills;
