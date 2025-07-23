import { createContext, useContext, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

const DialogContext = createContext();

export const DialogProvider = ({ children }) => {
  const [dialogConfig, setDialogConfig] = useState({
    open: false,
    title: "",
    message: "",
    onConfirm: () => {},
  });

  const showDialog = ({ title, message, onConfirm }) => {
    setDialogConfig({
      open: true,
      title,
      message,
      onConfirm,
    });
  };

  const handleClose = () => {
    setDialogConfig((prev) => ({ ...prev, open: false }));
  };

  const handleConfirm = () => {
    dialogConfig.onConfirm?.();
    handleClose();
  };

  return (
    <DialogContext.Provider value={{ showDialog }}>
      {children}
      <Dialog
        open={dialogConfig.open}
        onClose={handleClose}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            p: 2,
            borderRadius: 4,
            bgcolor: "background.paper",
            boxShadow: 24,
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: "bold" }}>
          {dialogConfig.title}
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">{dialogConfig.message}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="error" variant="contained">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </DialogContext.Provider>
  );
};

export const useDialog = () => useContext(DialogContext);
