import React, { useEffect, useState } from "react";
import { Box, Container, Button, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useHistory } from "react-router";

import MyAvatar from "assets/logo/welcome.png";
import PrimaryButton from "components/Button/PrimaryButton";

const Content = styled(Box)(({ theme }) => ({
  padding: `20px 20px`,
}));

const ContentImage = styled(`img`)(({ theme }) => ({
  borderRadius: "16px",
  width: "100%",
}));

const Welcome = (props) => {
  const history = useHistory();

  const handleDashboard = () => {
    history.push('/dashboard')
  };

  const handleLogin = () => {
    history.push('/login')
  };

  const handleCreateAccount = () => {
    history.push('/signup')
  };

  return (
    <Container maxWidth="sm">
      <Content>
        <Typography variant="sm_title" marginTop="36px">Welcome to Rand</Typography>
        <Typography variant="lg_title" marginTop="16px" marginBottom="64px">Managing your money is about to get a lot better.</Typography>
        <Box display="flex" alignItems="center" paddingBottom="75px">
          <ContentImage src={MyAvatar} alt="welcome" />
        </Box>
        <Box paddingBottom="16px">
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
