import React, { useEffect, useState } from "react";
import { Box, Container, Button, Typography, FormControlLabel, Checkbox } from "@mui/material";
import { styled } from "@mui/system";
import { useHistory } from "react-router";

import MyAvatar from "assets/logo/welcome.png";
import PrimaryButton from "components/Button/PrimaryButton";
import { setIsDemo } from "store/actions/App";
import { useDispatch, useSelector } from "react-redux";

const Content = styled(Box)(({ theme }) => ({
  padding: `20px 20px`,
}));

const ContentImage = styled(`img`)(({ theme }) => ({
  borderRadius: "16px",
  width: "100%",
}));

const Welcome = (props) => {
  const isDemo = useSelector((state) => state.app.isDemo);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleDashboard = () => {
    history.push('/dashboard')
  };

  const handleLogin = () => {
    history.push('/login')
  };

  const handleCreateAccount = () => {
    history.push('/signup')
  };

  const toggleIsDemo = () => {
    dispatch(setIsDemo(!isDemo));
  };

  return (
    <Container maxWidth="sm">
      <Content>
        <Typography variant="sm_title" marginTop="36px">Welcome to Rand</Typography>
        <Typography variant="lg_title" marginTop="16px" marginBottom="64px">Managing your money is about to get a lot better.</Typography>
        <Box display="flex" alignItems="center" paddingBottom="55px">
          <ContentImage src={MyAvatar} alt="welcome" />
        </Box>
        <FormControlLabel
          label="Demo Mode"
          control={<Checkbox checked={isDemo} onChange={toggleIsDemo} />}
        />
        <Box paddingBottom="16px" paddingTop="16px">
          <PrimaryButton variant="contained" onClick={handleDashboard} text='Try it now' />
        </Box>
        <Box hidden paddingBottom="16px">
          <PrimaryButton variant="contained" onClick={handleLogin} text='Login' />
        </Box>
        {/*<PrimaryButton variant="text" onClick={handleCreateAccount} text='Create an account' />*/}
      </Content>
    </Container>
  );
};

export default Welcome;
