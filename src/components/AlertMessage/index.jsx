import { Alert, Snackbar } from "@mui/material";
import React from "react";

export default function AlertMessage({ message, variant, onClose = null }) {
  const [open, setOpen] = React.useState(true);
  function handleClose(event, reason) {
    if (onClose) {
      onClose();
    }
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  }

  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={variant}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
