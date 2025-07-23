// CustomButton.jsx
import { Button } from "@mui/material";
import { styled } from "@mui/system";

const StyledButton = styled(Button)(({ variantType }) => ({
  padding: "8px 20px",
  fontWeight: 600,
  borderRadius: 12,
  textTransform: "none",
  fontSize: "1rem",
  transition: "all 0.3s ease",
  boxShadow: "none",

  ...(variantType === "danger" && {
    backgroundColor: "#ef4444",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#dc2626",
      transform: "translateY(-1px)",
      boxShadow: "0 4px 12px rgba(239, 68, 68, 0.4)",
    },
  }),

  ...(variantType === "primary" && {
    backgroundColor: "#38bdf8",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#0ea5e9",
      transform: "translateY(-1px)",
      boxShadow: "0 4px 12px rgba(56, 189, 248, 0.4)",
    },
  }),

  ...(variantType === "outlined" && {
    border: "2px solid #38bdf8",
    backgroundColor: "transparent",
    color: "#38bdf8",
    "&:hover": {
      backgroundColor: "#0ea5e920",
      borderColor: "#0ea5e9",
      transform: "translateY(-1px)",
    },
  }),
}));

const CustomButton = ({ children, variantType = "primary", ...props }) => {
  return (
    <StyledButton variantType={variantType} {...props}>
      {children}
    </StyledButton>
  );
};

export default CustomButton;
