import React, { useEffect } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { LinkedIn, GitHub, Twitter } from "@mui/icons-material";
import AkiOne from "../assets/akki.jpg";
import AkiTwo from "../assets/akki2.jpg";
import CustomButton from "../components/CustomButton";

const About = () => {
  const teamMembers = [
    {
      name: "Akhil John",
      role: "Frontend Developer UI/UX",
      desc: "Loves building modern UIs using React and MUI.",
      image: AkiOne,
    },
    {
      name: "Akhil John",
      role: "UI/UX Designer",
      desc: "Passionate about crafting beautiful and functional designs.",
      image: AkiTwo,
    },
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = "About us - Terminal Wizard";
  }, []);

  return (
    <Box px={{ xs: 2, md: 6 }} py={{ xs: 4, md: 8 }}>
      {/* Hero Section */}
      <Box textAlign="center" mb={8} data-aos="fade-up">
        <Typography variant="h3" fontWeight="bold" mb={2}>
          Meet the Team Behind Flowblox
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          maxWidth="600px"
          mx="auto"
        >
          We're a passionate group of designers, engineers, and creators
          building tools to help teams work smarter and collaborate better — all
          from one platform.
        </Typography>
        <CustomButton variant="contained" size="large" sx={{ mt: 4 }}>
          Join Our Mission
        </CustomButton>
      </Box>

      {/* Team Showcase */}
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        gap={4}
        mb={10}
      >
        {teamMembers.map((member, i) => (
          <Box
            key={i}
            data-aos="zoom-in"
            data-aos-delay={i * 200}
            sx={{
              width: { xs: "100%", sm: "45%", md: "30%" },
              position: "relative",
              borderRadius: 4,
              overflow: "hidden",
              boxShadow: 4,
              cursor: "pointer",
              transition: "0.3s",
              "&:hover .hoverBox": {
                transform: "translateY(0)",
              },
              "&:hover img": {
                transform: "scale(1.05)",
                filter: "grayscale(0%)",
              },
            }}
          >
            {/* Image */}
            <Box
              component="img"
              src={member.image}
              alt={member.name}
              width="100%"
              height="auto"
              sx={{
                transition: "0.5s ease",
                filter: "grayscale(100%)",
              }}
            />

            {/* Hover Overlay */}
            <Box
              className="hoverBox"
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                background: "rgba(0, 0, 0, 0.85)",
                color: "#fff",
                p: 2,
                transform: "translateY(100%)",
                transition: "transform 0.4s ease",
              }}
            >
              <Typography variant="h6" fontWeight={600}>
                {member.name}
              </Typography>
              <Typography variant="body2" fontStyle="italic" mb={1}>
                {member.role}
              </Typography>
              <Typography variant="caption" display="block" mb={1}>
                {member.desc}
              </Typography>

              {/* Social Icons */}
              <Box display="flex" gap={1}>
                <IconButton
                  size="small"
                  sx={{ color: "white", "&:hover": { color: "#0A66C2" } }}
                >
                  <LinkedIn fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  sx={{ color: "white", "&:hover": { color: "#1DA1F2" } }}
                >
                  <Twitter fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  sx={{ color: "white", "&:hover": { color: "#333" } }}
                >
                  <GitHub fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Vision Section */}
      <Box
        textAlign="center"
        maxWidth="800px"
        mx="auto"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <Typography variant="h4" fontWeight="bold" mb={2}>
          Our Vision
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={4}>
          To empower every team on the planet to work better together. From
          startups to enterprises, our mission is to simplify workflows, boost
          productivity, and build meaningful digital collaboration experiences.
        </Typography>
        <CustomButton variant="outlined" size="large">
          Learn More
        </CustomButton>
      </Box>
    </Box>
  );
};

export default About;
