import React, { useEffect, useState } from "react";
import { Box, Container, Button, Link, Stack, Typography, Divider } from "@mui/material";
import { styled } from "@mui/system";
import { motion } from "framer-motion";
import { pageVariants, pageTransition } from "../../../utils/pageTransitions";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import {
  ArrowBack as BackIcon,
  Lock as LockIcon,
  Call as CallIcon,
  Visibility as EyeIcon,
  VisibilityOff as EyeOffIcon,
} from "@mui/icons-material";

import { GoogleIcon } from "assets/logo/icon";
import { setHeaderTitle } from "store/actions/App";
import InputBox from "components/InputBox";
import PasswordInputBox from "components/InputBox/PasswordInputBox";
import { setNotificationData } from "store/actions/App";

const Content = styled(Box)(({ theme }) => ({
  padding: `${theme.spacing(3)} ${theme.spacing(3)}`,
}));

const WrapBackIcon = styled(BackIcon)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: "25px",
  paddingTop: "40px",
}));

const WrapTypography = styled(Typography)(({ theme }) => ({
  color: "grey"
}));

const WrapDivider = styled(Divider)(({ theme }) => ({
  paddingTop: "40px",
  fontSize: "16px",
  fontWeight: "400",
  textAlign: "center",
  color: "grey"
}));

const ForgotLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: "16px",
  paddingTop: "10px",
  paddingBottom: "40px",
  fontWeight: "500",
  float: "right",
  color: "blue",
}));

const SignUpLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: "16px",
  paddingTop: "10px",
  paddingBottom: "40px",
  fontWeight: "500",
  color: "blue",
  paddingLeft: "10px"
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

const GoogleLoginButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.button.third.background,
  fontWeight: 700,
  fontSize: "16px",
  fontFamily: "Manrope",
  boxShadow: "none",
  width: "100%",
  textTransform: "none",
  borderRadius: "12px",
  marginTop: "24px",
  padding: "16px 24px",
  display: "flex",
  justifyContent: "center",
  "&:hover": {
    color: theme.palette.button.third.foreground,
    backgroundColor: theme.palette.button.third.background,
  },
  "& .MuiButton-startIcon": {
    position: "absolute",
    left: "20px"
  }
}));

const Login = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    phoneNumber: "",
    password: "",
  });

  const [visible, setVisible] = useState(false);

  const [validated, setValidated] = useState({
    phoneNumber: true,
    password: true,
  });

  const [ableValidate, setAbleValidate] = useState(false);

  useEffect(() => {
    dispatch(setHeaderTitle(""));
  }, []);

  const onInputChange = (id, value) => {
    setUser({ ...user, [id]: value });

    if (ableValidate) {
      setValidated({
        ...validated,
        [id]: value.length != 0,
      });
    }
  };

  const handleLogin = () => {
    setAbleValidate(true);
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    
    const _userValidate = {
      phoneNumber: user.phoneNumber.length != 0 && user.phoneNumber.match(phoneno),
      password: user.password.length != 0,
    };
    setValidated({
      ...validated,
      ..._userValidate,
    });

    if (_userValidate.phoneNumber && _userValidate.password) {
      dispatch(
        setNotificationData({
          message: `Successfully User logined.`,
          variant: "success",
          open: true,
        })
      );

      history.push("/dashboard");
    } else {
      dispatch(
        setNotificationData({
          message: `Please input all validated phone number and password fields`,
          variant: "error",
          open: true,
        })
      );
    }
  };

  const handleForgotPassword = () => {};

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <Container maxWidth="sm">
        <Content>
          <WrapBackIcon
            onClick={() => {
              history.goBack();
            }}
          />
          <Typography
            variant="subtitle1"
            fontSize="24px"
            paddingTop="40px"
            lineHeight="36px"
          >
            {" "}
            Hi, Welcome Back!{" "}
          </Typography>
          <Typography variant="subtitle5" fontSize="16px" fontWeight="500">
            {" "}
            Sign in to your account.{" "}
          </Typography>
          <Stack direction="column" spacing={3} paddingTop="40px">
            <InputBox
              id="phoneNumber"
              type={"text"}
              startIcon={<CallIcon />}
              value={user.phoneNumber}
              placeholder="Phone Number"
              onChange={onInputChange}
              validated={validated.phoneNumber}
            />
            <PasswordInputBox
              id="password"
              type={visible ? "text" : "password"}
              startIcon={<LockIcon />}
              value={user.password}
              placeholder="Password"
              onChange={onInputChange}
              validated={validated.password}
              visible={visible}
              setVisible={setVisible}
            />
          </Stack>
          <ForgotLink
            component="button"
            variant="subtitle1"
            onClick={handleForgotPassword}
          >
            Forgot Password?
          </ForgotLink>
          <LoginButton
            variant="contained"
            onClick={handleLogin}
          >
            Login
          </LoginButton>
          <Box display="flex" justifyContent="center" paddingTop="10px">
            <WrapTypography
              paddingTop="20px"
              fontSize="16px"
              fontWeight="500"
              textAlign="center"
            >
              Don't have account?
            </WrapTypography>

            <SignUpLink
              component="button"
              variant="subtitle1"
              onClick={handleForgotPassword}
            >
              {" "}Sign Up
            </SignUpLink>
          </Box>
          <WrapDivider
            variant="subtitle1"
            
          >
            {" "}
            Or login with{" "}
          </WrapDivider>
          <GoogleLoginButton
            variant="contained"
            startIcon={<GoogleIcon />}
            onClick={handleLogin}
          >
            Login with Google
          </GoogleLoginButton>
        </Content>
      </Container>
    </motion.div>
  );
};

export default Login;
