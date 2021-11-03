import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Box, Divider, Button } from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material';
import { styled } from '@mui/system';
import React, { useState } from 'react';
import { WALLETS } from 'utils/constants';

const ConnectWalletDialog = styled(Dialog)(({theme}) => ({
  '& .MuiPaper-root': {
    width: '600px',
    borderRadius: theme.spacing(4)
  }
}))

const WalletImage = styled('img')(({theme}) => ({

}));

const WalletList = styled('ul')(({ theme }) => ({
  marginTop: '20px',
  padding: '0px'
}))

const DialogHeader = styled(DialogTitle)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(4)
}))

const WalletBox = styled(Box)(({ theme}) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "16px 48px",
  height: '80px',
}))

const WalletContainer = styled('li')(({theme}) => ({
  cursor: 'pointer',
  listStyleType: 'none',
}))

const ConnectWalletModal = ({
  open,
  onClose,
  onSuccess
}) => {
  // const [selectedWallet, setSelectedWallet] = useState(0)

  return (
    <ConnectWalletDialog
      open={open}
    >
      <DialogHeader>
        <CloseIcon onClick={onClose}/>
        <Typography variant="subtitle1">
          Choose wallet
        </Typography>
        <Box></Box>
      </DialogHeader>
      <DialogContent>
        <WalletList marginTop="20px">
          <Divider variant="middle" />
          {
            WALLETS.map((item, index) => (
              <WalletContainer>
                <WalletBox onClick={() => onSuccess(WALLETS[index])}>
                  <Box width="50px" display="flex" justifyContent="center">
                    <WalletImage src={item.logo} alt={item.title} />
                  </Box>
                  <Typography variant="subtitle3">
                    {item.title} 
                  </Typography>
                </WalletBox>
                <Divider variant="middle" />
              </WalletContainer>
            ))
          }
        </WalletList>
      </DialogContent>
      {/* <DialogActions>
        <Box padding="24px" width="100%">
          <AddButton variant="contained" onClick={() => {onSuccess(WALLETS[selectedWallet])}}>Connect</AddButton>
        </Box>
      </DialogActions> */}
    </ConnectWalletDialog>
  )
}

export default ConnectWalletModal