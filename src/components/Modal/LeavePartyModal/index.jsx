import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Box, Divider, Button } from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material';
import { styled } from '@mui/system';
import LoadingButton from '@mui/lab/LoadingButton';
import { useState } from 'react';

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

const WrapButton = styled(LoadingButton)(({ theme }) => ({
  color: theme.palette.button.fourth.foreground,
  backgroundColor: theme.palette.button.fourth.background,
  fontWeight: 500,
  fontSize: '16px',
  fontFamily: 'Overpass',
  width: '135px',
  boxShadow: "none",
  textTransform: 'none',
  borderRadius: '12px',
  padding: '16px',
  // "&:hover": {
  //   color: theme.palette.button.fourth.foreground,
  //   backgroundColor: theme.palette.button.fourth.background,
  //   boxShadow: "none"
  // },
}))

const StayButton = styled(Button)(({ theme }) => ({
  color: theme.palette.button.primary.foreground,
  backgroundColor: theme.palette.button.primary.background,
  fontWeight: 500,
  fontSize: '16px',
  fontFamily: 'Overpass',
  width: '135px',
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

const LeavePartyModal = ({
  open,
  handleClose,
  handleSuccess,
}) => {
  const [loading, setLoading] = useState(false);

  return (
    <PrizeDialog
      open={open}
    >
      <DialogHeader>
        <CloseIcon onClick={handleClose}/>
        <Typography variant="sl_title" textAlign="center">
          Are you sure want<br /> to leave the party?
        </Typography>
        <Box></Box>
      </DialogHeader>
      <DialogContent>
        <Box display="flex" justifyContent="space-around">
          <Typography variant="xs_content_gray" textAlign="center">
            If you leave the party now you won't be <br />able to claim any prize
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Box padding="24px" display="flex" justifyContent="space-around" width="100%">
          <WrapButton
            onClick={() => {handleSuccess(); setLoading(true)}}
            loading={loading}
            loadingPosition="end"
            variant="contained"
          >
            Leave
          </WrapButton>
          <StayButton variant="contained" onClick={handleClose}>Stay</StayButton>
        </Box>
      </DialogActions>
    </PrizeDialog>
  )
}

export default LeavePartyModal