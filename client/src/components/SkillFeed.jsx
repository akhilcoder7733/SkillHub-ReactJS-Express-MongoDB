import { useEffect, useState } from "react";
import { Card, CardContent, Typography, Chip, Stack, Box } from "@mui/material";
import API from "../utils/axiosInstance";

const SkillFeed = () => {
  const [posts, setPosts] = useState([]);

  const loadPosts = async () => {
    try {
      const res = await API.get("/skills");
      setPosts(res.data.reverse());
    } catch (err) {
      alert("Failed to load skills");
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>🧠 Skill Feed</Typography>
      {posts.map(post => (
        <Card key={post._id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{post.title}</Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>{post.description}</Typography>
            <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
              {post.content}
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
              {post.tags.map((tag, i) => (
                <Chip label={tag} key={i} />
              ))}
            </Stack>
            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
              Posted by {post.author?.name || "Anonymous"} on {new Date(post.createdAt).toLocaleDateString()}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default SkillFeed;
