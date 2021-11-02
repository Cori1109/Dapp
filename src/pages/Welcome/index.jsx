import React, { useEffect, useState } from "react";
import { Box, Container, Button, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useHistory } from "react-router";

import MyAvatar from "assets/logo/welcome.png";

const Content = styled(Box)(({ theme }) => ({
  padding: `${theme.spacing(3)} ${theme.spacing(3)}`,
}));


const ContentImage = styled(`img`)(({ theme }) => ({
  borderRadius: "16px",
  width: "calc(100% - 16px)",
}));

const LoginButton = styled(Button)(({ theme }) => ({
  color: theme.palette.button.primary.foreground,
  backgroundColor: theme.palette.button.primary.background,
  fontWeight: 500,
  fontSize: "16px",
  fontFamily: "Manrope",
  width: "100%",
  textTransform: "none",
  boxShadow: "none",
  borderRadius: "12px",
  marginTop: "24px",
  padding: "16px 24px",
  display: "flex",
  justifyContent: "center",
}));

const CreateButton = styled(Button)(({ theme }) => ({
  color: theme.palette.button.third.foreground,
  backgroundColor: theme.palette.button.third.background,
  fontWeight: 500,
  fontSize: "16px",
  fontFamily: "Manrope",
  width: "100%",
  textTransform: "none",
  boxShadow: "none",
  borderRadius: "12px",
  marginTop: "24px",
  padding: "16px 24px",
  display: "flex",
  justifyContent: "center",
  boxShadow: "none",
  "&:hover": {
    color: theme.palette.button.third.foreground,
    backgroundColor: theme.palette.button.third.background,
  },
}));

const Welcome = (props) => {
  const history = useHistory();
 
  const handleLogin = () => {
    history.push('/login')
  };

  const handleCreateAccount = () => {
    
  };

  return (
    <Container maxWidth="sm">
      <Content>
        <Typography variant="subtitle2" fontSize="16px" paddingBottom="10px" paddingTop="40px">Welcome to Rand</Typography>
        <Typography variant="subtitle1" fontSize="32px" lineHeight="42px" paddingBottom="50px">Managing your money is about to get a lot better.</Typography>
        <Box display="flex" alignItems="center" paddingBottom="40px">
          <ContentImage src={MyAvatar} alt="welcome" />
        </Box>
        <Box>
        <LoginButton variant="contained" onClick={handleLogin}>
          Login
        </LoginButton>
        <CreateButton variant="contained" onClick={handleCreateAccount}>
          Create an account
        </CreateButton>
        </Box>
        
      </Content>
    </Container>
  );
};

export default Welcome;
