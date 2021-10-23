import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Box, Divider, Button } from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material';
import { styled } from '@mui/system';
import SwipeButton from 'components/Button/SwipeButton';
import { useState } from 'react';
import BalanceSelector from 'components/BalanceSelector';

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
  handleSuccess,
  balance
}) => {

  const [selectedAmount, setSelectedAmount] = useState(0)

  return (
    <DepositDialog
      open={open}
    >
      <DialogHeader>
        <CloseIcon onClick={handleClose} style={{ color:"#4263EB"}}/>
        <Typography variant="subtitle1">
          Amount to deposit
        </Typography>
        <Box></Box>
      </DialogHeader>
      <DialogContent>
        <BalanceSelector 
          max={balance} 
          balance={selectedAmount} 
          setBalance={setSelectedAmount}/>
      </DialogContent>
      <DialogActions>
        <Box padding="24px" width="100%">
          <SwipeButton 
            mainText="Swipe to join" 
            overlayText="" 
            onSwipeDone={() => {
              handleSuccess()
            }} 
            reset={0}
          />
        </Box>
      </DialogActions>
    </DepositDialog>
  )
}

export default DepositModal