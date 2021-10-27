import React, { useEffect, useState } from "react";
import { Box, Container, Typography, Button, Divider } from "@mui/material"
import { styled } from '@mui/system';
import { motion } from "framer-motion";
import { pageVariants, pageTransition } from "../../utils/pageTransitions"
import SuccessImage from '../../assets/logo/success.png'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router"
import { setTransferParam } from "store/actions/App";
import {ContentCopy as ContentCopyIcon} from '@mui/icons-material';
import { getAbbreviationAddress, shorttenString } from "utils/functions";
import AlertMessage from "components/AlertMessage";

const ImageBox = styled('Box')(({theme}) => ({
  paddingTop: theme.spacing(10),
  marginBottom: theme.spacing(6),
  display: 'flex',
  justifyContent: 'center',
}))

const SuccessLogo = styled('img')(({ theme }) => ({
}));

const WalletImg = styled('img')(({ theme }) => ({
}));

const HeaderBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
}));

const PriceBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  padding: `${theme.spacing(2)} ${theme.spacing(5)}`,
  marginTop: theme.spacing(4)
}));

const AddButton = styled(Button)(({ theme }) => ({
  color: theme.palette.button.primary.foreground,
  backgroundColor: theme.palette.button.primary.background,
  fontWeight: 500,
  fontSize: '16px',
  fontFamily: 'Manrope',
  width: '100%',
  textTransform: 'none',
  borderRadius: '12px',
  marginTop: '100px',
  padding: '16px 24px',
  display: 'flex',
  justifyContent: 'center',
}))

const TransferSuccess = (props) => {
  const dispatch = useDispatch();

  const transferParam = useSelector(state => state.app.transferParam)

  const history = useHistory();

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    if (!transferParam) {
      history.push('/dashboard')
    }
  }, [transferParam])

  const handleClickCopy = (txnHash) => {
    if (txnHash) {
      navigator.clipboard.writeText(txnHash);
      setShowAlert(true);
      setAlertMessage(`${txnHash} has been copied!`);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <Container maxWidth="sm">
        <ImageBox>
          <SuccessLogo src={SuccessImage} alt="Success Logo"/>
        </ImageBox>
        <HeaderBox>
          <Typography variant="subtitle1">
            Transfer Success
          </Typography>
        </HeaderBox>
        <PriceBox>
          <Typography variant="subtitle1">
            ${transferParam?.price}
          </Typography>
        </PriceBox>
        <Divider variant="middle" />
        <Box display="flex" justifyContent="space-between" padding="16px 48px">
          <Typography variant="subtitle2">
            Transfer from
          </Typography>
          <Box display="flex">
            <WalletImg src={transferParam?.walletInfo.logo}/>
            <Typography variant="subtitle3">
              :{getAbbreviationAddress(transferParam?.from)}
            </Typography>
          </Box>
        </Box>
        <Divider variant="middle" />
        <Box display="flex" justifyContent="space-between" padding="16px 48px">
          <Typography variant="subtitle2">
            Transaction Hash
          </Typography>
          <Typography variant="subtitle5" display="flex" alignItems="center">
            <span style={{ color: "#EA88F2" }}> {shorttenString(transferParam?.txnHash) || "loading..."} </span>
            <ContentCopyIcon style={{paddingLeft: '24px', cursor: 'pointer'}} onClick={() => {handleClickCopy(transferParam?.txnHash)}}/>
          </Typography>
        </Box>
        <AddButton variant="contained" onClick={() => {history.push(transferParam?.back_url); dispatch(setTransferParam(null));}}>Done</AddButton>
      </Container>
      {showAlert && (
        <AlertMessage
          key={Math.random()}
          message={alertMessage}
          variant="info"
          onClose={() => setShowAlert(false)}
        />
      )}
    </motion.div>
  );
}
 
export default TransferSuccess;