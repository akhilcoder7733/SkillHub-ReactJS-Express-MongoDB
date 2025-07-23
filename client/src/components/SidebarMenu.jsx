// components/SidebarMenu.jsx
import {
  Box,
  Button,
  Divider,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

const SidebarMenu = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      width="250px"
      p={3}
      sx={{
        height: "auto",
        overflowY: "auto",
        backgroundColor: isDark ? "#121212" : "#fafafa",
        borderRight: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Typography variant="h6" mb={3} fontWeight="bold" color="primary">
        Terminal Wizard UI
      </Typography>

      <Stack spacing={1.5}>
        {/* Profile Settings */}
        <Typography variant="body2" color="text.secondary">
          Profile Settings
        </Typography>
        <SidebarButton label="Edit Profile" active />
        <SidebarButton label="Language" />
        <SidebarButton label="Notifications" />
        <Divider sx={{ my: 1 }} />

        {/* Finance */}
        <Typography variant="body2" color="text.secondary">
          Finance
        </Typography>
        <SidebarButton label="Payments" />
        <SidebarButton label="Taxes" />
        <SidebarButton label="Transactions" />
        <Divider sx={{ my: 1 }} />

        {/* Security */}
        <Typography variant="body2" color="text.secondary">
          Security
        </Typography>
        <SidebarButton label="Password" />
        <SidebarButton label="Access" />
        <SidebarButton label="Sessions" />
        <Divider sx={{ my: 1 }} />

        {/* Danger */}
        <Button
          fullWidth
          variant="outlined"
          color="error"
          sx={{
            textTransform: "none",
            fontWeight: 500,
            borderColor: theme.palette.error.main,
            "&:hover": {
              backgroundColor: theme.palette.error.light,
              color: "#fff",
              borderColor: theme.palette.error.main,
            },
          }}
        >
          Delete Account
        </Button>
      </Stack>
    </Box>
  );
};

// Custom styled button with active/highlight effect
const SidebarButton = ({ label, active }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Button
      fullWidth
      variant={active ? "contained" : "text"}
      sx={{
        justifyContent: "flex-start",
        textTransform: "none",
        fontWeight: active ? "bold" : 500,
        backgroundColor: active
          ? theme.palette.primary.main
          : "transparent",
        color: active
          ? theme.palette.getContrastText(theme.palette.primary.main)
          : isDark
          ? "#ccc"
          : "#333",
        "&:hover": {
          backgroundColor: active
            ? theme.palette.primary.dark
            : theme.palette.action.hover,
        },
        borderRadius: 2,
        px: 2,
      }}
    >
      {label}
    </Button>
  );
};

export default SidebarMenu;
