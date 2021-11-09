import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Box, Divider, Button } from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material';
import { styled } from '@mui/system';
import React, { useState } from 'react';
import { CRYPTOS } from 'utils/constants';

const ConnectCryptoDialog = styled(Dialog)(({theme}) => ({
  '& .MuiPaper-root': {
    width: '600px',
    borderRadius: theme.spacing(4),
    backgroundColor: theme.palette.sub.background,
  }
}))

const CryptoImage = styled('img')(({theme}) => ({

}));

const CryptoList = styled('ul')(({ theme }) => ({
  marginTop: '20px',
  padding: '0px'
}))

const DialogHeader = styled(DialogTitle)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(4)
}))

const CryptoBox = styled(Box)(({ theme}) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "16px 48px",
  height: '80px',
}))

const CryptoContainer = styled('li')(({theme}) => ({
  cursor: 'pointer',
  listStyleType: 'none',
}))

const ChooseCryptoModal = ({
  open,
  onClose,
  onSuccess
}) => {
  // const [selectedCrypto, setSelectedCrypto] = useState(0)

  return (
    <ConnectCryptoDialog
      open={open}
    >
      <DialogHeader>
        <CloseIcon onClick={onClose}/>
        <Typography variant="sl_title">
          Choose crypto
        </Typography>
        <Box></Box>
      </DialogHeader>
      <DialogContent>
        <CryptoList>
          <Divider variant="middle" />
          {
            CRYPTOS.map((item, index) => (
              <CryptoContainer key={index}>
                <CryptoBox onClick={() => onSuccess(CRYPTOS[index])}>
                  <Box width="50px" display="flex" justifyContent="center">
                    <CryptoImage src={item.logo} alt={item.title} />
                  </Box>
                  <Typography variant="sm_content_gray">
                    {item.title} 
                  </Typography>
                </CryptoBox>
                <Divider variant="middle" />
              </CryptoContainer>
            ))
          }
        </CryptoList>
      </DialogContent>
      {/* <DialogActions>
        <Box padding="24px" width="100%">
          <AddButton variant="contained" onClick={() => {onSuccess(CRYPTOS[selectedCrypto])}}>Select</AddButton>
        </Box>
      </DialogActions> */}
    </ConnectCryptoDialog>
  )
}

export default ChooseCryptoModal