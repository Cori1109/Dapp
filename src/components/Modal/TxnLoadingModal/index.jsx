import React, { useState } from "react";
import { Box, Dialog, DialogTitle, Typography, DialogContent, Button } from '@mui/material'
import {ContentCopy as ContentCopyIcon, Close as CloseIcon} from '@mui/icons-material';
import LoadingWrapper from "components/LoadingWrapper";
import { styled } from "@mui/system";
import { shorttenString } from "utils/functions";
import { useDispatch } from "react-redux";
import { setNotificationData } from "store/actions/App";

const LoadingModal = styled(Dialog)(({theme}) => ({
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
  boxShadow: "none",
  borderRadius: '12px',
  padding: '16px'
}))


const TxnLoadingModal = ({
  loading,
  txnHash,
  handleClose,
  title
}) => {
  const dispatch = useDispatch()
  const handleClickChainExplorer = () => {
    window.open(`https://ropsten.etherscan.io/tx/${txnHash}`);
  };

  const handleClickCopy = () => {
    if (txnHash) {
      navigator.clipboard.writeText(txnHash);
      dispatch(setNotificationData({
        message: `${txnHash} has been copied!`,
        variant: 'success',
        open: true
      }))
    }
  };

  return (
    <LoadingModal open={loading}>
      <DialogHeader>
        <CloseIcon onClick={handleClose}/>
        <Typography variant="subtitle1">
          Loading
        </Typography>
        <Box></Box>
      </DialogHeader>
      <DialogContent>
        <LoadingWrapper loading></LoadingWrapper>
        <Box justifyContent="center" display="flex">
          <Typography variant="subtitle3" textAlign="center">{title}</Typography>
        </Box>
        <Box display="flex" justifyContent="center" marginTop="24px">
          {txnHash && (
            <Typography variant="subtitle5" display="flex" alignItems="center">
              Hash: <span style={{ color: "#EA88F2" }}> {shorttenString(txnHash) || "loading..."} </span>
              <ContentCopyIcon style={{paddingLeft: '24px', cursor: 'pointer'}} onClick={() => {handleClickCopy()}}/>
            </Typography>
          )}
        </Box>
        {txnHash && (
          <Box marginTop="24px">
            <AddButton variant="contained" onClick={handleClickChainExplorer}>
              Check On Chain Explorer
            </AddButton>
          </Box>
        )}
      </DialogContent>
    </LoadingModal>
  )
};

export default TxnLoadingModal