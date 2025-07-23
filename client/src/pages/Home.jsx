import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Stack,
  Card,
  CardContent,
  CardMedia,
  Avatar,
} from "@mui/material";
import { Link } from "react-router-dom";
import Masonry from "@mui/lab/Masonry";
// import { Rocket, Puzzle, Briefcase } from "lucide-react"; // Optional icons
import Slider from "react-slick";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import CustomButton from "../components/CustomButton";

const dimensions = ["300/200", "300/300", "300/150", "250/250", "350/200"];

const testimonials = [
  {
    name: "Ananya Sharma",
    title: "Frontend Developer at Infosys",
    story: "SkillHub helped me land my dream job with a stunning portfolio!",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    name: "Rohit Kumar",
    title: "ML Engineer at TCS",
    story:
      "I transitioned from a mechanical background into AI & ML with SkillHub!",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    name: "Meera Raj",
    title: "UI/UX Designer at Wipro",
    story:
      "The bootcamps and projects gave me confidence to freelance full time.",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
  },
];

const steps = [
  {
    title: "Discover Skills",
    desc: "Identify your talents and align with in-demand technologies.",
    icon: <SchoolIcon sx={{ fontSize: 40, color: "#fff" }} />,
    bg: "linear-gradient(135deg, #38bdf8, #0ea5e9)",
  },
  {
    title: "Build Projects",
    desc: "Create hands-on projects to solidify your learning.",
    icon: <WorkIcon sx={{ fontSize: 40, color: "#fff" }} />,
    bg: "linear-gradient(135deg, #a855f7, #9333ea)",
  },
  {
    title: "Get Hired",
    desc: "Present your work and attract top recruiters globally.",
    icon: <RocketLaunchIcon sx={{ fontSize: 40, color: "#fff" }} />,
    bg: "linear-gradient(135deg, #f43f5e, #e11d48)",
  },
];

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1, // Adjust for responsiveness
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  responsive: [
    {
      breakpoint: 960,
      settings: {
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const Home = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = "Home-Terminal Wizard";
  }, []);
  return (
    <Box
      sx={{
        px: { xs: 2, md: 8 },
        py: { xs: 4, md: 6 },
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          textAlign: "center",
          py: { xs: 6, md: 10 },
          background: "linear-gradient(135deg, #5d9c7dff, #125c7eff)",
          borderRadius: 4,
          mb: 6,
        }}
      >
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Experience the Power of Your Skills!
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Discover, Build, and Share Projects That Launch Careers.
        </Typography>
        <CustomButton
          component={Link}
          to="/portfolio"
          sx={{ mt: 3, borderRadius: 3, px: 4 }}
        >
          Build Your Portfolio
        </CustomButton>
      </Box>

      {/* Partner Logos */}
      {/* Partner Logos */}
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography
          variant="h6"
          color="text.secondary"
          mb={3}
          sx={{ fontWeight: "bold" }}
        >
          Trusted by recruiters from
        </Typography>
        <Stack
          direction="row"
          spacing={6}
          justifyContent="center"
          flexWrap="wrap"
        >
          {["LinkedIn", "Google", "TCS", "Infosys", "Wipro"].map(
            (brand, index) => (
              <Typography
                key={index}
                sx={{
                  fontSize: { xs: 24, md: 32 },
                  fontWeight: "bold",
                  color: "text.primary",
                  opacity: 0.5,
                  letterSpacing: 1.5,
                }}
              >
                {brand}
              </Typography>
            )
          )}
        </Stack>
      </Box>

      {/* Popular Skills Section (Masonry Layout) */}
      <Box mb={6} ml={2}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Popular Skill Tracks
        </Typography>
        <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={2}>
          {[
            "Web Dev",
            "UI/UX",
            "Python",
            "React",
            "AI & ML",
            "Cybersecurity",
            "Data Science",
            "Cloud",
            "Mobile Dev",
          ].map((skill, idx) => (
            <Card key={idx} sx={{ borderRadius: 3 }}>
              <CardMedia
                component="img"
                height="auto"
                width="100%"
                image={`https://picsum.photos/${
                  dimensions[Math.floor(Math.random() * dimensions.length)]
                }?random=${Math.random().toString(36).substring(2, 8)}`}
                alt={skill}
              />
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {skill} Bootcamp
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Master {skill} with hands-on projects and expert mentorship.
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Masonry>
      </Box>

      {/* Journey Steps Section */}
      <Box mb={10} px={{ xs: 2, sm: 4, md: 10 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          mb={6}
          sx={{
            // color: "#0f172a",
            textShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          Journey to Career Made Simple!
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {steps.map((step, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                elevation={4}
                sx={{
                  background: step.bg,
                  borderRadius: 5,
                  px: 4,
                  py: 6,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  color: "#fff",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 12px 24px rgba(0,0,0,0.25)",
                  },
                }}
              >
                <Box mb={3}>{step.icon}</Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {step.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ opacity: 0.95, maxWidth: "90%", lineHeight: 1.6 }}
                >
                  {step.desc}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Testimonials Section */}
      <Box mb={8} pt={8}>
        <Typography
          variant="h5"
          fontWeight="bold"
          textAlign="center"
          gutterBottom
        >
          Student Success Stories
        </Typography>

        <Box mt={4} px={{ xs: 2, md: 10 }}>
          <Slider {...sliderSettings}>
            {testimonials.map((t, i) => (
              <Box key={i} px={2}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 4,
                    borderRadius: 3,
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Stack spacing={2} alignItems="center" textAlign="center">
                    <Avatar
                      src={t.avatar}
                      alt={t.name}
                      sx={{ width: 64, height: 64 }}
                    />
                    <Typography variant="subtitle1" fontWeight="bold">
                      {t.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {t.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      "{t.story}"
                    </Typography>
                  </Stack>
                </Paper>
              </Box>
            ))}
          </Slider>
        </Box>
      </Box>

      {/* Promo Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          p: 4,
          bgcolor: "#0c7772ff",
          borderRadius: 4,
          mb: 8,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Boost Your Career with a Premium Account – 20% OFF!
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Unlock unlimited learning resources, mentorship, and faster profile
            boosting.
          </Typography>
        </Box>
        <Box sx={{ mt: { xs: 3, md: 0 } }}>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            sx={{ px: 4 }}
          >
            Upgrade Now
          </Button>
        </Box>
      </Box>

      {/* CTA Footer */}
      <Box textAlign="center">
        <Typography variant="h6" fontWeight="medium">
          Ready to Elevate Your Journey?
        </Typography>
        <CustomButton
          sx={{ mt: 2, px: 4, borderRadius: 3 }}
          component={Link}
          to="/skills"
        >
          Join SkillHub – It's Free!
        </CustomButton>
      </Box>
    </Box>
  );
};

export default Home;
