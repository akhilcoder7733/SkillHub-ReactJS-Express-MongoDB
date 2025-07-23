// components/NavLinkText.jsx
import { Typography } from "@mui/material";
import { styled } from "@mui/system";

const NavLinkText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "active",
})(({ active }) => ({
  fontWeight: active ? 700 : 500,
  color: active ? "#0a83f5ff" : "#b0b3b8",
  textDecoration: "none",
  position: "relative",
  padding: "6px 12px",
  cursor: "pointer",
  transition: "color 0.3s ease",

  "&::after": {
    content: '""',
    position: "absolute",
    left: 0,
    bottom: 0,
    width: active ? "100%" : "0%",
    height: "2px",
    background: "#0747bdff",
    transition: "width 0.3s ease",
    borderRadius: 4,
  },

  "&:hover": {
    color: "#0747bdff",
  },

  "&:hover::after": {
    width: "100%",
  },
}));

export default NavLinkText;
