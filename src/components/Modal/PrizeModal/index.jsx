import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Box, Divider, Button } from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material';
import { styled } from '@mui/system';

const PrizeDialog = styled(Dialog)(({theme}) => ({
  '& .MuiPaper-root': {
    width: '600px',
    borderRadius: theme.spacing(4)
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
  fontFamily: 'Manrope',
  width: '100%',
  textTransform: 'none',
  borderRadius: '12px',
  padding: '16px'
}))

const PrizeModal = ({
  open,
  handleClose,
  list = [],
}) => {
  return (
    <PrizeDialog
      open={open}
    >
      <DialogHeader>
        <CloseIcon onClick={handleClose}/>
        <Typography variant="subtitle1">
          Prize distribution
        </Typography>
        <Box></Box>
      </DialogHeader>
      <DialogContent>
        <Box display="flex" justifyContent="space-around">
          <Typography variant="subtitle3">
            Amount
          </Typography>
          <Typography variant="subtitle3">
            Winners
          </Typography>
        </Box>
        <Box marginTop="20px">
          {
            list.map((item, index) => (
              <>
              <Box display="flex" justifyContent="space-between" padding="16px 48px">
                <Typography variant="subtitle2">
                  Tier {index + 1}: ${item.amount} 
                </Typography>
                <Typography variant="subtitle3">
                  {item.count} 
                </Typography>
              </Box>
              <Divider variant="middle" />
              </>
            ))
          }
        </Box>
      </DialogContent>
      <DialogActions>
        <Box padding="24px" width="100%">
          <AddButton variant="contained" onClick={() => {handleClose()}}>OK</AddButton>
        </Box>
      </DialogActions>
    </PrizeDialog>
  )
}

export default PrizeModal