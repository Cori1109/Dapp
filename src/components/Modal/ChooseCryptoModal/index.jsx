import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Box, Divider, Button } from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material';
import { styled } from '@mui/system';
import React, { useState } from 'react';
import { CRYPTOS } from 'utils/constants';

const ConnectCryptoDialog = styled(Dialog)(({theme}) => ({
  '& .MuiPaper-root': {
    width: '600px',
    borderRadius: theme.spacing(4)
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
  '&:active': {
    backgroundColor: 'lightblue',
    borderRadius: '20px'
  },
  '&:hover': {
    backgroundColor: 'lightblue',
    borderRadius: '20px'
  }
}))

const SelectedCryptoContainer = styled('li')(({theme}) => ({
  cursor: 'pointer',
  listStyleType: 'none',
  backgroundColor: 'lightblue',
  borderRadius: '20px'
}))

const AddButton = styled(Button)(({ theme }) => ({
  color: theme.palette.button.primary.foreground,
  backgroundColor: theme.palette.button.primary.background,
  fontWeight: 500,
  fontSize: '16px',
  fontFamily: 'Manrope',
  width: '100%',
  textTransform: 'none',
  borderRadius: '12px',
  padding: '16px'
}))

const ChooseCryptoModal = ({
  open,
  onClose,
  onSuccess
}) => {
  const [selectedCrypto, setSelectedCrypto] = useState(0)

  return (
    <ConnectCryptoDialog
      open={open}
    >
      <DialogHeader>
        <CloseIcon onClick={onClose}/>
        <Typography variant="subtitle1">
          Choose crypto
        </Typography>
        <Box></Box>
      </DialogHeader>
      <DialogContent>
        <CryptoList marginTop="20px">
          {
            CRYPTOS.map((item, index) => (
              selectedCrypto === index 
              ? 
              <SelectedCryptoContainer>
                <CryptoBox onClick={() => setSelectedCrypto(index)}>
                  <Box width="50px" display="flex" justifyContent="center">
                    <CryptoImage src={item.logo} alt={item.title} />
                  </Box>
                  <Typography variant="subtitle3">
                    {item.title} 
                  </Typography>
                </CryptoBox>
                <Divider variant="middle" />
              </SelectedCryptoContainer>
              :
              <CryptoContainer>
                <CryptoBox onClick={() => setSelectedCrypto(index)}>
                  <Box width="50px" display="flex" justifyContent="center">
                    <CryptoImage src={item.logo} alt={item.title} />
                  </Box>
                  <Typography variant="subtitle3">
                    {item.title} 
                  </Typography>
                </CryptoBox>
                <Divider variant="middle" />
              </CryptoContainer>
            ))
          }
        </CryptoList>
      </DialogContent>
      <DialogActions>
        <Box padding="24px" width="100%">
          <AddButton variant="contained" onClick={() => {onSuccess(CRYPTOS[selectedCrypto])}}>Select</AddButton>
        </Box>
      </DialogActions>
    </ConnectCryptoDialog>
  )
}

export default ChooseCryptoModal