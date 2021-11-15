import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Box } from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material';
import { styled } from '@mui/system';
import SwipeButton from 'components/Button/SwipeButton';
import { useState } from 'react';
import BalanceSelector from 'components/BalanceSelector';
import LoadingWrapper from "components/LoadingWrapper";
import { setLoadingDeposit } from 'store/actions/App';
import { useDispatch, useSelector } from 'react-redux';

const DepositDialog = styled(Dialog)(({theme}) => ({
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
  padding: theme.spacing(6)
}))

const DepositModal = ({
  open,
  handleClose,
  handleSuccess,
  balance,
  isPrivate,
  maxDeposit,
}) => {
  const dispatch = useDispatch();

  const [selectedAmount, setSelectedAmount] = useState(0)
  const loadingDeposit = useSelector(state => state.app.loadingDeposit)

  return (
    <DepositDialog
      open={open}
    >
      <DialogHeader>
        <CloseIcon onClick={() => {setSelectedAmount(0); handleClose();}} style={{ color:"#4263EB"}}/>
        <Typography variant="sl_title">
          Amount to deposit
        </Typography>
        <Box></Box>
      </DialogHeader>
      <DialogContent>
        <Box marginBottom="20px" display="flex" justifyContent="space-between">
          <Typography variant="sm_content_gray"> Available: ${balance}</Typography>
          {isPrivate && <Typography variant="sm_content_gray"> Party max: ${maxDeposit}</Typography>}
        </Box>
        <BalanceSelector 
          max={maxDeposit ? (balance < maxDeposit ? balance : maxDeposit) : balance} 
          balance={selectedAmount} 
          setBalance={setSelectedAmount}
          overflowMessage={'Please input the available amount.'}
        />
      </DialogContent>
        <DialogActions>
          <Box padding="24px" width="100%">
          <LoadingWrapper loading={loadingDeposit}></LoadingWrapper>

            {
              selectedAmount != 0 &&
              <SwipeButton 
                mainText="Swipe to join" 
                overlayText="" 
                onSwipeDone={() => {
                  handleSuccess(selectedAmount)
                  setSelectedAmount(0)
                  dispatch(setLoadingDeposit(true));
                }} 
                reset={0}
              />
            }
          </Box>
        </DialogActions>
    </DepositDialog>
  )
}

export default DepositModal