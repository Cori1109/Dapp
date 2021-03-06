import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Box, Divider, Button } from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material';
import { styled } from '@mui/system';

const PrizeDialog = styled(Dialog)(({theme}) => ({
  '& .MuiPaper-root': {
    width: '600px',
    borderRadius: theme.spacing(4),
    backgroundColor: theme.palette.sub.background,
  }
}))

const DialogHeader = styled(DialogTitle)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(4)
}))

const AddButton = styled(Button)(({ theme }) => ({
  color: theme.palette.button.primary.foreground,
  backgroundColor: theme.palette.button.primary.background,
  fontWeight: 500,
  fontSize: '16px',
  fontFamily: 'Overpass',
  width: '100%',
  textTransform: 'none',
  boxShadow: "none",
  borderRadius: '12px',
  padding: '16px',
  "&:hover": {
    color: theme.palette.button.primary.foreground,
    backgroundColor: theme.palette.button.primary.background,
    boxShadow: "none"
  },
}))

const EmptyAccountModal = ({
  open,
  handleClose,
  handleSuccess,
}) => {
  return (
    <PrizeDialog
      open={open}
    >
      <DialogHeader>
        <CloseIcon onClick={handleClose}/>
        <Typography variant="sl_title" textAlign="center">
          Oops! Your account <br /> it's empty
        </Typography>
        <Box></Box>
      </DialogHeader>
      <DialogContent>
        <Box display="flex" justifyContent="space-around">
          <Typography variant="sm_content_gray">
            Add money to join a party
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Box padding="24px" width="100%">
          <AddButton variant="contained" onClick={() => {handleSuccess();}}>Add money</AddButton>
        </Box>
      </DialogActions>
    </PrizeDialog>
  )
}

export default EmptyAccountModal