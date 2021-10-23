import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Box, Divider, Button } from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material';
import { styled } from '@mui/system';
import SwipeButton from 'components/Button/SwipeButton';

const DepositDialog = styled(Dialog)(({theme}) => ({
  '& .MuiPaper-root': {
    width: '600px',
    borderRadius: theme.spacing(4)
  }
}))

const DialogHeader = styled(DialogTitle)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(6)
}))

const DepositModal = ({
  open,
  handleClose,
  balance
}) => {
  return (
    <DepositDialog
      open={open}
    >
      <DialogHeader>
        <CloseIcon onClick={handleClose}/>
        <Typography variant="subtitle1">
          Amount to deposit
        </Typography>
        <Box></Box>
      </DialogHeader>
      <DialogContent>
        <Box display="flex" justifyContent="space-around">
          <Typography variant="subtitle2">
            Amount (USD)
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Box padding="24px" width="100%">
          <SwipeButton 
            mainText="Swipe to join" 
            overlayText="" 
            onSwipeDone={() => {
                console.log("Done!");
            }} 
            reset={0}
          />
        </Box>
      </DialogActions>
    </DepositDialog>
  )
}

export default DepositModal