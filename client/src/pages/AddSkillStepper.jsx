import { useEffect, useRef, useState } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  Chip,
  Stack,
  Paper,
  Fade,
  Typography,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import API from "../utils/axiosInstance";
import { useToast } from "../contexts/ToastContext";
import { useDialog } from "../contexts/DialogContext";
import CustomButton from "../components/CustomButton";

const steps = [
  "Skill Title",
  "Description & Category",
  "Level & Experience",
  "Location & Project Link",
  "Tools",
  "Tags",
];

const AddSkillStepper = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    level: "",
    experience: "",
    tools: [],
    tags: [],
    projectLink: "",
    location: "",
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = "Add Skill - Terminal Wizard";
  }, []);

  const [toolInput, setToolInput] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const { showToast } = useToast();
  const { showDialog } = useDialog();
  const navigate = useNavigate();
  const topRef = useRef();

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeStep]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const addTool = () => {
    if (toolInput.trim()) {
      setForm({ ...form, tools: [...form.tools, toolInput.trim()] });
      setToolInput("");
    }
  };

  const removeTool = (tool) =>
    setForm({ ...form, tools: form.tools.filter((t) => t !== tool) });

  const addTag = () => {
    if (tagInput.trim()) {
      setForm({ ...form, tags: [...form.tags, tagInput.trim()] });
      setTagInput("");
    }
  };

  const removeTag = (tag) =>
    setForm({ ...form, tags: form.tags.filter((t) => t !== tag) });

  const handleNext = () => {
    const error = validateStep(activeStep);
    if (error) {
      showToast(error, "error");
      return;
    }
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleSubmit = () => {
    const error = validateStep(activeStep);
    if (error) {
      showToast(error, "error");
      return;
    }

    showDialog({
      title: "Confirm Submission",
      message: "Are you sure you want to submit this skill?",
      onConfirm: async () => {
        try {
          await API.post("/skills", form);
          showToast("Skill posted successfully!", "success");
          navigate("/skills");
        } catch {
          showToast("Failed to post skill", "error");
        }
      },
    });
  };

  const validateStep = (step) => {
    switch (step) {
      case 0:
        if (!form.title.trim()) return "Skill title is required.";
        break;
      case 1:
        if (!form.description.trim()) return "Description is required.";
        if (!form.category.trim()) return "Category is required.";
        break;
      case 2:
        if (!form.level.trim()) return "Level is required.";
        if (!form.experience.trim()) return "Experience is required.";
        break;
      case 3:
        if (!form.location.trim()) return "Location is required.";
        if (!form.projectLink.trim()) return "Project link is required.";
        break;
      case 4:
        if (form.tools.length === 0) return "Add at least one tool.";
        break;
      case 5:
        if (form.tags.length === 0) return "Add at least one tag.";
        break;
      default:
        return null;
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <TextField
            fullWidth
            label="Enter Skill Title"
            name="title"
            value={form.title}
            onChange={handleChange}
          />
        );
      case 1:
        return (
          <Stack spacing={2}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Description"
              name="description"
              value={form.description}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Category"
              name="category"
              value={form.category}
              onChange={handleChange}
            />
          </Stack>
        );
      case 2:
        return (
          <Stack spacing={2}>
            <TextField
              fullWidth
              select
              name="level"
              label="Level"
              value={form.level}
              onChange={handleChange}
              SelectProps={{ native: true }}
            >
              <option value="">Select Level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </TextField>
            <TextField
              fullWidth
              name="experience"
              label="Experience"
              value={form.experience}
              onChange={handleChange}
            />
          </Stack>
        );
      case 3:
        return (
          <Stack spacing={2}>
            <TextField
              fullWidth
              name="location"
              label="Location"
              value={form.location}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              name="projectLink"
              label="Project Link"
              value={form.projectLink}
              onChange={handleChange}
            />
          </Stack>
        );
      case 4:
        return (
          <Box>
            <TextField
              fullWidth
              label="Add Tool (Press Enter)"
              value={toolInput}
              onChange={(e) => setToolInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && (e.preventDefault(), addTool())
              }
            />
            <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
              {form.tools.map((tool) => (
                <Chip
                  key={tool}
                  label={tool}
                  onDelete={() => removeTool(tool)}
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Stack>
          </Box>
        );
      case 5:
        return (
          <Box>
            <TextField
              fullWidth
              label="Add Tag (Press Enter)"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && (e.preventDefault(), addTag())
              }
            />
            <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
              {form.tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  onDelete={() => removeTag(tag)}
                  color="secondary"
                  variant="outlined"
                />
              ))}
            </Stack>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ py: 6, px: 2, minHeight: "100vh" }} ref={topRef}>
      <Paper
        elevation={5}
        sx={{
          maxWidth: "1100px",
          mx: "auto",
          borderRadius: 4,
          overflow: "hidden",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        {/* Sidebar */}
        <Box sx={{ p: 4, width: { xs: "100%", md: "30%" } }}>
          <Typography variant="h6" fontWeight={600} mb={3}>
            Create Skill
          </Typography>
          <Stepper
            activeStep={activeStep}
            orientation="vertical"
            sx={{
              "& .MuiStepLabel-label": { fontSize: "15px", pl: 1 },
              "& .MuiStepIcon-root": { color: "#70c0b1" },
            }}
          >
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel
                  sx={{
                    ".MuiStepLabel-label": {
                      fontWeight: activeStep === index ? 600 : 400,
                    },
                  }}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        {/* Main Content */}
        <Box
          sx={{
            flex: 1,
            p: 4,
            borderLeft: { md: "1px solid #e0e0e0" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Fade in timeout={500} key={activeStep}>
            <Box sx={{ mb: 6 }}>{renderStepContent()}</Box>
          </Fade>

          <Divider sx={{ my: 2 }} />

          {/* Bottom Buttons */}
          <Box
            display="flex"
            justifyContent="space-between"
            mt="auto"
            position="sticky"
            bottom={0}
            py={2}
            // bgcolor="background.paper"
            zIndex={2}
          >
            <Button onClick={handleBack} disabled={activeStep === 0}>
              Back
            </Button>
            {activeStep === steps.length - 1 ? (
              <CustomButton variant="contained" onClick={handleSubmit}>
                Submit
              </CustomButton>
            ) : (
              <CustomButton variant="contained" onClick={handleNext}>
                Next
              </CustomButton>
            )}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default AddSkillStepper;
