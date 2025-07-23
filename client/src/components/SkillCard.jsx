import { useContext, useState } from "react";
import {
  Paper,
  Avatar,
  Typography,
  Box,
  Stack,
  Chip,
  Divider,
  IconButton,
  Tooltip,
  Link,
} from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import CategoryIcon from "@mui/icons-material/Category";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import PlaceIcon from "@mui/icons-material/Place";
import LinkIcon from "@mui/icons-material/Link";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import API from "../utils/axiosInstance";
import { useDialog } from "../contexts/DialogContext"; // 👈 import DialogContext
import { useToast } from "../contexts/ToastContext"; // 👈 import ToastContext
import { AuthContext } from "../contexts/AuthContext";

const SkillCard = ({ skill, onDelete }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const isOwner = user?._id === skill?.user?._id;
  const { showDialog } = useDialog();
  const { showToast } = useToast();

  const handleDelete = () => {
    showDialog({
      title: "Delete Skill",
      message: `Are you sure you want to delete the skill "${skill.title}"?`,
      onConfirm: async () => {
        try {
          setLoading(true);
          await API.delete(`/skills/${skill._id}`);
          showToast("Skill deleted successfully.", "success");
          onDelete(skill._id); // update UI
        } catch (err) {
          showToast("Failed to delete skill.", "error");
        } finally {
          setLoading(false);
        }
      },
    });
  };

  return (
    <Paper
      elevation={4}
      sx={{
        p: 3,
        borderRadius: 4,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "auto",
        width: "100%",
        gap: 2,
      }}
    >
      {/* Header */}
      <Stack direction="row" spacing={1} justifyContent="flex-end">
        {isOwner && (
          <>
            <Tooltip title="Edit Skill">
              <IconButton onClick={() => navigate(`/edit-skill/${skill._id}`)}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete Skill">
              <IconButton
                color="error"
                onClick={handleDelete}
                disabled={loading}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </>
        )}
      </Stack>

      {/* Title & User */}
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar sx={{ bgcolor: "primary.main" }}>
          <WorkIcon />
        </Avatar>
        <Box>
          <Typography variant="h6" fontWeight="bold">
            {skill.title}
          </Typography>
          {skill.user && (
            <Typography variant="caption" color="text.secondary">
              Posted by: {skill.user.name}
            </Typography>
          )}
        </Box>
      </Stack>

      {/* Description */}
      <Typography variant="body1" sx={{ flexGrow: 1 }} color="text.primary">
        {skill.description || "No description provided."}
      </Typography>

      {/* Category, Level, Experience */}
      <Stack direction="row" spacing={1} flexWrap="wrap">
        {skill.category && (
          <Chip
            icon={<CategoryIcon />}
            label={skill.category}
            color="secondary"
          />
        )}
        {skill.level && (
          <Chip
            label={`Level: ${skill.level}`}
            variant="outlined"
            color="primary"
          />
        )}
        {skill.experience && (
          <Chip label={skill.experience} variant="outlined" color="success" />
        )}
      </Stack>

      {/* Tools */}
      {skill.tools?.length > 0 && (
        <Box>
          <Typography variant="body2" mt={1} fontWeight="bold">
            Tools Used:
          </Typography>
          <Stack direction="row" spacing={1} mt={0.5} flexWrap="wrap">
            {skill.tools.map((tool) => (
              <Chip key={tool} label={tool} size="small" />
            ))}
          </Stack>
        </Box>
      )}

      {/* Tags */}
      {skill.tags?.length > 0 && (
        <Box>
          <Typography variant="body2" mt={1} fontWeight="bold">
            Tags:
          </Typography>
          <Stack direction="row" spacing={1} mt={0.5} flexWrap="wrap">
            {skill.tags.map((tag) => (
              <Chip
                key={tag}
                label={`#${tag}`}
                variant="outlined"
                size="small"
              />
            ))}
          </Stack>
        </Box>
      )}

      {/* Location & Project Link */}
      <Stack direction="row" spacing={2} mt={1} flexWrap="wrap">
        {skill.location && (
          <Chip
            icon={<PlaceIcon />}
            label={skill.location}
            variant="outlined"
            size="small"
            color="info"
          />
        )}
        {skill.projectLink && (
          <Chip
            icon={<LinkIcon />}
            label="View Project"
            variant="outlined"
            size="small"
            color="primary"
            component={Link}
            href={skill.projectLink}
            target="_blank"
            rel="noopener"
            clickable
          />
        )}
      </Stack>

      <Divider sx={{ my: 2 }} />

      {/* Fake social actions */}
      <Stack direction="row" spacing={2} justifyContent="space-around">
        <Tooltip title="Like">
          <IconButton>
            <ThumbUpAltOutlinedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Comment">
          <IconButton>
            <ChatBubbleOutlineOutlinedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Share">
          <IconButton>
            <ShareOutlinedIcon />
          </IconButton>
        </Tooltip>
      </Stack>
    </Paper>
  );
};

export default SkillCard;
