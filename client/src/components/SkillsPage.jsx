// pages/SkillsPage.jsx
import React from "react";
import { Container, Divider } from "@mui/material";
import AddSkillForm from "../components/AddSkillForm";
import SkillsTable from "../components/SkillsTable";

const SkillsPage = () => {
  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <AddSkillForm />
      <Divider sx={{ my: 4 }} />
      <SkillsTable />
    </Container>
  );
};

export default SkillsPage;
