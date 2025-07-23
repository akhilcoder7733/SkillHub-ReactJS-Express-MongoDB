import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  TextField,
  Stack,
} from "@mui/material";
import API from "../utils/axiosInstance";
import { useToast } from "../contexts/ToastContext";
import { useDialog } from "../contexts/DialogContext";
import FullScreenLoader from "../components/FullScreenLoader";
import CustomButton from "../components/CustomButton";

const EditSkill = () => {
  const { id } = useParams();
  const [skill, setSkill] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { showDialog } = useDialog();

  // Fetch skill details
  useEffect(() => {
    const fetchSkill = async () => {
      try {
        const res = await API.get(`/skills/${id}`);
        setSkill(res.data);
      } catch (err) {
        showToast("Failed to load skill.", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchSkill();
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = "Edit Skills-Terminal Wizard";
  }, [id, showToast]);



  const handleUpdate = async () => {
    try {
      await API.put(`/skills/${id}`, skill);
      showToast("Skill updated successfully!", "success");
      navigate("/skills");
    } catch (err) {
      showToast("Failed to update skill.", "error");
    }
  };

  const handleConfirmUpdate = () => {
    showDialog({
      title: "Update Skill?",
      message: "Are you sure you want to save changes to this skill?",
      onConfirm: handleUpdate,
    });
  };

  if (loading) return <FullScreenLoader />;

  if (!skill) {
    return (
      <Container maxWidth="sm" sx={{ mt: 10 }}>
        <Typography variant="h6" color="error" align="center">
          Failed to load the skill. Please try again later.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" mb={4} fontWeight="bold">
        Edit Skill
      </Typography>

      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            label="Title"
            fullWidth
            value={skill.title}
            onChange={(e) => setSkill({ ...skill, title: e.target.value })}
          />
          <TextField
            label="Category"
            fullWidth
            value={skill.category}
            onChange={(e) => setSkill({ ...skill, category: e.target.value })}
          />
        </Stack>

        <TextField
          label="Description"
          fullWidth
          multiline
          minRows={4}
          value={skill.description}
          onChange={(e) =>
            setSkill({ ...skill, description: e.target.value })
          }
        />

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            label="Level"
            fullWidth
            value={skill.level}
            onChange={(e) => setSkill({ ...skill, level: e.target.value })}
          />
          <TextField
            label="Experience"
            fullWidth
            value={skill.experience}
            onChange={(e) =>
              setSkill({ ...skill, experience: e.target.value })
            }
          />
        </Stack>

        <TextField
          label="Tools (comma separated)"
          fullWidth
          value={skill.tools.join(", ")}
          onChange={(e) =>
            setSkill({
              ...skill,
              tools: e.target.value.split(",").map((t) => t.trim()),
            })
          }
        />

        <TextField
          label="Tags (comma separated)"
          fullWidth
          value={skill.tags.join(", ")}
          onChange={(e) =>
            setSkill({
              ...skill,
              tags: e.target.value.split(",").map((t) => t.trim()),
            })
          }
        />

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            label="Location"
            fullWidth
            value={skill.location}
            onChange={(e) =>
              setSkill({ ...skill, location: e.target.value })
            }
          />
          <TextField
            label="Project Link"
            fullWidth
            value={skill.projectLink}
            onChange={(e) =>
              setSkill({ ...skill, projectLink: e.target.value })
            }
          />
        </Stack>

        <Box textAlign="right">
          <CustomButton

            sx={{ borderRadius: 2, px: 4, py: 1.2 }}
            onClick={handleConfirmUpdate}
          >
            Update Skill
          </CustomButton>
        </Box>
      </Box>
    </Container>
  );
};

export default EditSkill;
