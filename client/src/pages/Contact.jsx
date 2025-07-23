import React, { useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Link,
  Stack,
} from "@mui/material";
import { Facebook, Twitter, LinkedIn, Email } from "@mui/icons-material";
import ContactImg from "../assets/contact-cover.jpeg";
import CustomButton from "../components/CustomButton";

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = "Contact - Terminal Wizard";
  }, []);
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      {/* Top Banner */}
      <Box
        sx={{
          height: 300,
          width: "100%",
          backgroundImage: `url(${ContactImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "0 0 24px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h3" fontWeight="bold" color="white">
          Contact Us
        </Typography>
      </Box>

      {/* Contact Info & Form Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          p: 4,
          gap: 4,
        }}
      >
        {/* Contact Details */}
        <Box
          data-aos="fade-up"
          data-aos-delay="100"
          sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}
        >
          <Typography variant="h5" fontWeight="bold">
            We are always ready to help
          </Typography>
          <Typography color="text.secondary">
            Define your goals and identify areas where AI can add value to your
            business.
          </Typography>

          <Box>
            <Typography variant="body1" fontWeight="bold">
              Call Center
            </Typography>
            <Typography>+91 80074 74744</Typography>
            <Typography>+91 12234 56789</Typography>
          </Box>

          <Box>
            <Typography variant="body1" fontWeight="bold">
              Our Location
            </Typography>
            <Typography>Kottayam, Kerala, India</Typography>
            <Typography>St: First Avenue 1</Typography>
          </Box>

          <Box>
            <Typography variant="body1" fontWeight="bold">
              Email
            </Typography>
            <Link href="mailto:terminalwizard@terminal.co">
              terminalwizard@terminal.co.in
            </Link>
          </Box>

          <Box>
            <Typography variant="body1" fontWeight="bold">
              Social Network
            </Typography>
            <Stack direction="row" spacing={2} mt={1}>
              <IconButton color="primary">
                <Facebook />
              </IconButton>
              <IconButton color="primary">
                <Twitter />
              </IconButton>
              <IconButton color="primary">
                <LinkedIn />
              </IconButton>
              <IconButton color="primary">
                <Email />
              </IconButton>
            </Stack>
          </Box>
        </Box>

        {/* Contact Form */}
        <Box
          sx={{
            flex: 1,
            bgcolor: "background.paper",
            p: 4,
            borderRadius: 4,
            boxShadow: 3,
          }}
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Get in Touch
          </Typography>

          <Stack spacing={2}>
            <TextField label="Full Name" fullWidth variant="outlined" />
            <TextField label="Email" fullWidth variant="outlined" />
            <TextField label="Subject" fullWidth variant="outlined" />
            <TextField
              label="Message"
              fullWidth
              variant="outlined"
              multiline
              rows={4}
            />
            <CustomButton
              variant="contained"
              size="large"
              sx={{ borderRadius: 2 }}
            >
              Send a Message
            </CustomButton>
          </Stack>
        </Box>
      </Box>

      {/* Map Section */}
      <Box
        sx={{
          width: "100%",
          height: 300,
          mt: 4,
          borderRadius: 4,
          overflow: "hidden",
          p: 2,
        }}
      >
        <iframe
          src="https://maps.google.com/maps?q=London%20Eye&t=&z=13&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="100%"
          frameBorder="0"
          style={{ borderRadius: 12 }}
          allowFullScreen=""
          aria-hidden="false"
          tabIndex="0"
          title="Google Map"
        ></iframe>
      </Box>

      {/* Footer Section */}
      <Box
        sx={{
          width: "100%",
          bgcolor: "grey.900",
          color: "white",
          mt: 6,
          py: 6,
          px: 4,
          borderRadius: "24px 24px 0 0",
          textAlign: "center",
        }}
        data-aos="zoom-in"
        data-aos-delay="100"
      >
        <Typography variant="h5" fontWeight="bold">
          It’s blow your mind! <br /> Meet Neural Networks
        </Typography>
        <Typography mt={1}>www.terminalWizard.com</Typography>
      </Box>
    </Box>
  );
};

export default ContactPage;
