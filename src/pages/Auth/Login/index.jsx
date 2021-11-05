import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Button,
  Link,
  Stack,
  Typography,
  Divider,
} from "@mui/material";
import { styled } from "@mui/system";
import { motion } from "framer-motion";
import { pageVariants, pageTransition } from "../../../utils/pageTransitions";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { LockIcon, LockDarkIcon, CallIcon, CallDarkIcon } from "assets/logo/icon";

import { GoogleIcon } from "assets/logo/icon";
import { setHeaderTitle } from "store/actions/App";
import InputBox from "components/InputBox";
import PasswordInputBox from "components/InputBox/PasswordInputBox";
import { setNotificationData } from "store/actions/App";
import SimpleBackdrop from "components/Backdrop";
import BackButton from "components/Button/BackButton";
import PrimaryButton from "components/Button/PrimaryButton";

const Content = styled(Box)(({ theme }) => ({
  padding: `20px 20px`,
  height: "100vh",
}));

const PrimaryTypography = styled(Typography)(({ theme }) => ({
  cursor: "pointer",
}));

const WrapDivider = styled(Divider)(({ theme }) => ({
  marginTop: "134px",
  marginBottom: "16px",
  color: theme.palette.secondary_gray
}));

const GoogleLoginButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary_gray,
  backgroundColor: theme.palette.white,
  fontWeight: 700,
  fontSize: "16px",
  fontFamily: "Overpass",
  boxShadow: "none",
  width: "100%",
  textTransform: "none",
  borderRadius: "16px",
  border: `1px solid #E8E8E8`,
  padding: "16px 24px",
  display: "flex",
  justifyContent: "center",
  "&:hover": {
    color: theme.palette.primary_gray,
    backgroundColor: theme.palette.white,
    boxShadow: "none",
  },
  "& .MuiButton-startIcon": {
    position: "absolute",
    left: "20px",
  },
}));

const phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

const Login = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const timer = React.useRef();

  const [user, setUser] = useState({
    phoneNumber: "",
    password: "",
  });

  const [visible, setVisible] = useState(false);

  const [loading, setLoading] = useState(false);

  const [validated, setValidated] = useState({
    phoneNumber: true,
    password: true,
  });

  const [iconValidated, setIconValidated] = useState({
    phoneNumber: false,
    password: false,
  });

  const [ableValidate, setAbleValidate] = useState(false);

  useEffect(() => {
    dispatch(setHeaderTitle(""));
  }, []);

  const onInputChange = (id, value) => {
    const _user = { ...user, [id]: value }
    setUser({ ...user, [id]: value });

    setIconValidated({
      phoneNumber:
        _user.phoneNumber.match(phoneno),
      password: _user.password.length >= 6,
    });

    if (ableValidate) {
      setValidated({
        ...validated,
        [id]: value.length != 0,
      });
    }
  };

  const handleLogin = () => {
    setAbleValidate(true);

    const _userValidate = {
      phoneNumber:
        user.phoneNumber.length != 0 && user.phoneNumber.match(phoneno),
      password: user.password.length >= 6,
    };
    setValidated({
      ...validated,
      ..._userValidate,
    });

    if (_userValidate.phoneNumber && _userValidate.password) {
      if (!loading) {
        setLoading(true);
        timer.current = window.setTimeout(() => {
          setLoading(false);
          dispatch(
            setNotificationData({
              message: `Successfully User logined.`,
              variant: "success",
              open: true,
            })
          );

          history.push("/dashboard");
        }, 2000);
      }
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

  const handleForgotPassword = () => { };

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
          <Box marginTop="36px" marginBottom="32px">
            <BackButton />
          </Box>
          <Typography variant="md_title" marginBottom="4px">
            Hi, Welcome Back!
          </Typography>
          <Typography variant="sm_title" marginBottom="32px">
            Sign in to your account.
          </Typography>
          <Stack direction="column" spacing={3}>
            <InputBox
              id="phoneNumber"
              type={"text"}
              startIcon={iconValidated.phoneNumber ? <CallIcon /> : <CallDarkIcon />}
              value={user.phoneNumber}
              placeholder="Phone Number"
              onChange={onInputChange}
              validated={validated.phoneNumber}
            />
            <PasswordInputBox
              id="password"
              type={visible ? "text" : "password"}
              startIcon={iconValidated.password ? <LockIcon /> : <LockDarkIcon />}
              value={user.password}
              placeholder="Password"
              onChange={onInputChange}
              validated={validated.password}
              visible={visible}
              setVisible={setVisible}
            />
          </Stack>
          <PrimaryTypography
            variant="sm_content"
            width= "100%"
            textAlign= "right"
            marginTop= "16px"
            marginBottom= "32px"            
            onClick={handleForgotPassword}
          >
            Forgot Password?
          </PrimaryTypography>
          <PrimaryButton variant="contained" onClick={handleLogin} text="Login" />
          <Box display="flex" justifyContent="center" marginTop="24px">
            <Typography
              variant="sm_title"
            >
              Don't have account?
            </Typography>

            <PrimaryTypography
              variant="sm_content"
              marginLeft="4px"
              onClick={handleForgotPassword}
            >
              Sign Up
            </PrimaryTypography>
          </Box>
          <WrapDivider> Or login with </WrapDivider>
          <GoogleLoginButton
            variant="contained"
            startIcon={<GoogleIcon />}
            onClick={handleLogin}
          >
            Login with Google
          </GoogleLoginButton>
        </Content>
      </Container>
      <SimpleBackdrop open={loading}></SimpleBackdrop>
    </motion.div>
  );
};

export default Login;
