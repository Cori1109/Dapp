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

const NoMetamaskModal = ({
  open,
  onClose,
  walletInfo
}) => {
  const handleGotoWebsite = (walletInfo) => {
    window.open(walletInfo?.url, '_blank');
  }
  
  return (
    <PrizeDialog
      open={open}
    >
      <DialogHeader>
        <CloseIcon onClick={onClose}/>
        <Typography variant="sl_title" textAlign="center">
          Don't have wallet?
        </Typography>
        <Box></Box>
      </DialogHeader>
      <DialogContent>
        <Box display="flex" justifyContent="space-around">
          <Typography variant="sm_content_gray">
            You can download  browser extension for Chrome, Firefox, Brave or Edge. For more guidance, check{" "}
            <a href="https://medium.com/coinmonks/how-to-set-up-metamask-and-add-networks-bsc-matic-smartbch-476d5d023191" target="_blank">here</a>.
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Box padding="24px" width="100%">
          <AddButton variant="contained" onClick={() => handleGotoWebsite(walletInfo)}>
            Go to {walletInfo?.title} Website
          </AddButton>
        </Box>
      </DialogActions>
    </PrizeDialog>
  )
}

export default NoMetamaskModal