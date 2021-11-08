import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Box, Divider, Button } from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material';
import { styled } from '@mui/system';
import { Fragment } from 'react';

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
        <Typography variant="sl_title">
          Prize distribution
        </Typography>
        <Box></Box>
      </DialogHeader>
      <DialogContent>
        <Box marginTop="20px">
          {
            list && list.map((item, index) => (
              <Fragment key={`prize-item-${index}`}>
              <Box display="flex" justifyContent="space-between" padding="16px 18px">
                <Typography variant="sm_content_gray">
                  Tier {index + 1}: ${item[0]} 
                </Typography>
                <Typography variant="sm_content_gray">
                  {item[1]} 
                </Typography>
              </Box>
              <Divider variant="middle" />
              </Fragment>
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