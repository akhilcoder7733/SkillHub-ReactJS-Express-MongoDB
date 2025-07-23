import { useState } from "react";
import {
  Box, TextField, Button, Chip, Stack, Typography
} from "@mui/material";
import API from "../utils/axiosInstance";

const SkillForm = ({ onPostCreated }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    content: "",
    tags: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const postData = {
        ...form,
        tags: form.tags.split(",").map(tag => tag.trim()),
      };
      await API.post("/skills", postData);
      setForm({ title: "", description: "", content: "", tags: "" });
      onPostCreated(); // refresh the feed
    } catch (err) {
      alert("Failed to create post");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>Share a Skill or Tutorial</Typography>
      <TextField fullWidth label="Title" margin="normal" value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })} />
      <TextField fullWidth label="Short Description" margin="normal" value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })} />
      <TextField fullWidth multiline rows={4} label="Content / Tutorial"
        margin="normal" value={form.content}
        onChange={(e) => setForm({ ...form, content: e.target.value })} />
      <TextField fullWidth label="Tags (comma separated)" margin="normal"
        value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} />
      <Button variant="contained" type="submit" sx={{ mt: 2 }}>Post</Button>
    </Box>
  );
};

export default SkillForm;
