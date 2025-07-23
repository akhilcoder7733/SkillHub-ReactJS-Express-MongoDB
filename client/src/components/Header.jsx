import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  Divider,
  Slide,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import CustomButton from "./CustomButton";
import NavLinkText from "./NavLinkText";
import useScrollDirection from "../hooks/useScrollDirection"; // or local import
import ThemeToggleButton from "./ThemeToggleButton";
import { useDialog } from "../contexts/DialogContext";
import FullScreenLoader from "./FullScreenLoader";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Skills", to: "/skills" },
  { label: "Profile", to: "/profile" },
  { label: "Contact", to: "/contact" },
  { label: "Explore", to: "/explore" },
  { label: "About us", to: "/about" },
];

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const scrollUp = useScrollDirection(); // Will be true if scrolling up
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { showDialog } = useDialog();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const toggleDrawer = (open) => () => setDrawerOpen(open);

  const handleLogout = async () => {
    setIsLoggingOut(true); // Show loader
    setTimeout(async () => {
      try {
        await logout();
        showToast("Logout successful!", "success");
        navigate("/login");
      } catch {
        showToast("Something went wrong during logout.", "error");
      } finally {
        setIsLoggingOut(false); // Hide loader
      }
    }, 2000);
  };

  const drawerContent = (
    <Box
      sx={{
        width: 260,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "#121212",
        color: "#fff",
        py: 2,
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List sx={{ flex: 1, width: 240 }}>
        {navLinks.map((link) => (
          <ListItem
            key={link.to}
            component={RouterLink}
            to={link.to}
            sx={{
              borderRadius: 2,
              mx: 1,
              mb: 1,
              px: 2,
              py: 1.2,
              bgcolor:
                location.pathname === link.to ? "primary.main" : "transparent",
              color:
                location.pathname === link.to
                  ? "#fff"
                  : "rgba(255,255,255,0.8)",
              fontWeight: location.pathname === link.to ? "bold" : "normal",
              "&:hover": {
                bgcolor: "primary.main",
                color: "#fff",
              },
              textDecoration: "none",
              transition: "all 0.3s ease-in-out",
            }}
          >
            <ListItemText primary={link.label} />
          </ListItem>
        ))}
      </List>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.2)", mx: 2, mb: 2 }} />

      <Box sx={{ px: 2, pb: 2 }}>
        {/* // Inside Box sx={{ px: 2, pb: 2 }} */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <ThemeToggleButton />
        </Box>

        {user ? (
          <Button
            variant="contained"
            fullWidth
            color="error"
            onClick={() =>
              showDialog({
                title: "Confirm Logout",
                message: "Are you sure you want to log out?",
                onConfirm: handleLogout,
              })
            }
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              borderRadius: 2,
              boxShadow: "0px 4px 20px rgba(255, 0, 0, 0.2)",
            }}
          >
            Logout
          </Button>
        ) : (
          <Button
            variant="contained"
            fullWidth
            onClick={() => navigate("/login")}
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              borderRadius: 2,
              bgcolor: "primary.main",
              color: "#fff",
              boxShadow: "0px 4px 20px rgba(0, 123, 255, 0.3)",
            }}
          >
            Login
          </Button>
        )}
      </Box>
    </Box>
  );

  return (
    <>
      {isLoggingOut && <FullScreenLoader />}
      {/* Slide Animation on mount */}
      <Slide in={scrollUp} direction="down" appear={false}>
        <AppBar
          position="sticky"
          color="default"
          elevation={2}
          sx={{
            backdropFilter: "blur(10px)",
            backgroundColor:
              theme.palette.mode === "dark"
                ? "rgba(15, 23, 42, 0.85)"
                : "rgba(255, 255, 255, 0.85)",
            // zIndex: theme.zIndex.drawer + 1,
            transition: "transform 0.3s ease-in-out",
          }}
        >
          <Toolbar
            sx={{ justifyContent: "space-between", px: { xs: 2, md: 6 } }}
          >
            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              sx={{
                textDecoration: "none",
                color: "primary.main",
                fontWeight: "bold",
                fontSize: "1.5rem",
                mr: 2,
              }}
            >
              SkillHub
            </Typography>

            {!isMobile && (
              <>
                <Box display="flex" alignItems="center" flexGrow={1} gap={3}>
                  {navLinks.map((link) => {
                    const isActive = location.pathname === link.to;
                    return (
                      <RouterLink
                        key={link.to}
                        to={link.to}
                        style={{ textDecoration: "none" }}
                      >
                        <NavLinkText active={isActive ? 1 : 0}>
                          {link.label}
                        </NavLinkText>
                      </RouterLink>
                    );
                  })}
                </Box>

                {user ? (
                  <>
                    <ThemeToggleButton />
                    <CustomButton
                      variantType="danger"
                      onClick={() =>
                        showDialog({
                          title: "Confirm Logout",
                          message: "Are you sure you want to log out?",
                          onConfirm: handleLogout,
                        })
                      }
                    >
                      Logout
                    </CustomButton>
                  </>
                ) : (
                  <CustomButton
                    variant="contained"
                    color="primary"
                    component={RouterLink}
                    to="/login"
                  >
                    Login
                  </CustomButton>
                )}
              </>
            )}

            {isMobile && (
              <IconButton
                edge="end"
                onClick={toggleDrawer(true)}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </AppBar>
      </Slide>

      {/* Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        transitionDuration={400}
        PaperProps={{
          sx: {
            borderTopLeftRadius: 16,
            borderBottomLeftRadius: 16,
          },
        }}
        ModalProps={{
          BackdropProps: {
            timeout: 400,
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Header;
