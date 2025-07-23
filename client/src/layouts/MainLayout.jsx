// src/layouts/MainLayout.jsx
import Header from "../components/Header";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import BackToTopButton from "../components/BackToTopButton";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <>
      <Header />
      <Box component="main" sx={{ p: 2 }}>
        <Outlet />
      </Box>
      <BackToTopButton />
      <Footer/>
    </>
  );
};

export default MainLayout;
