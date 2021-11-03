import React, { useEffect, useState } from "react";
import { Box, Container, Typography, Button } from "@mui/material"
import { styled } from '@mui/system';
import { motion } from "framer-motion";
import { pageVariants, pageTransition } from "../../utils/pageTransitions"
import SuccessImage from '../../assets/logo/success.png'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router"
import { setJoinedParam } from "store/actions/App";

const ImageBox = styled('Box')(({theme}) => ({
  paddingTop: theme.spacing(10),
  marginBottom: theme.spacing(6),
  display: 'flex',
  justifyContent: 'center',
}))

const SuccessLogo = styled('img')(({ theme }) => ({
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
  boxShadow: "none",
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
  "&:hover": {
    color: theme.palette.button.primary.foreground,
    backgroundColor: theme.palette.button.primary.background,
    boxShadow: "none"
  },
}))

const JoinedSuccess = (props) => {
  const dispatch = useDispatch();

  const joinedParam = useSelector(state => state.app.joinedParam)

  const history = useHistory();

  useEffect(() => {
    if (!joinedParam) {
      history.push('/dashboard')
    }
  }, [joinedParam])
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
            Party Joined Success
          </Typography>
        </HeaderBox>
        <PriceBox>
          <Typography variant="subtitle1">
            ${joinedParam?.price}
          </Typography>
        </PriceBox>
        <Typography variant="subtitle2" textAlign="center">
          You have joined the {joinedParam?.party_name}.
        </Typography>
        <AddButton variant="contained" onClick={() => {history.push(joinedParam?.back_url); dispatch(setJoinedParam(null));}}>Done</AddButton>
      </Container>
    </motion.div>
  );
}
 
export default JoinedSuccess;