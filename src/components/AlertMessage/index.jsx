import { Alert, Snackbar } from "@mui/material";
import React from "react";

export default function AlertMessage({ message, variant, open, onClose = null }) {
  function handleClose(event, reason) {
    if (onClose) {
      onClose();
    }
    if (reason === "clickaway") {
      return;
    }
    onClose();
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
