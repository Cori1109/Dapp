import { useSnackbar, OptionsObject } from "notistack";

export const useAlertMessage = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const showAlertMessage = (message, options = null) => {
    const snackId = enqueueSnackbar(message, options);
    return snackId;
  };

  const closeAlertMessage = (snackId) => {
    closeSnackbar(snackId);
  };

  return { showAlertMessage, closeAlertMessage };
};
