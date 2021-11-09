import React, { useEffect, useState } from "react";
import { Box, Container, Stack, Typography, Button, Grid, Avatar, Badge } from "@mui/material";
import { styled } from '@mui/system';
import { motion } from "framer-motion";
import { pageVariants, pageTransition } from "../../utils/pageTransitions"
import { useHistory, useLocation } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import UserAvatarImage1 from "../../assets/avatar/me.png";
import IncomeIcon from "../../assets/logo/income.png";
import CameraIcon from "../../assets/logo/camera.png";
import LockIcon from "../../assets/logo/lock.svg";
import Switch, { SwitchProps } from "@mui/material/Switch";
import { ArrowRightIcon, QuizIcon, RankingIcon} from "../../assets/logo/icon";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import ConnectWalletModal from "components/Modal/ConnectWalletModal";
import { setNotificationData, setBlackTheme } from "store/actions/App";
import { switchNetwork } from "utils/web3utils";
import { getAbbreviationAddress, getFormatNumber } from "utils/functions";

const WrapContainer = styled(Container)(({ theme }) => ({
  height: 'calc(100vh - 200px)',
  overflow: 'auto'
}))

const Content = styled(Box)(({ theme }) => ({
  padding: `${theme.spacing(3)} ${theme.spacing(3)}`
}));

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

const QuizButton = styled(Button)(({ theme }) => ({
  color: theme.palette.button.primary.foreground,
  backgroundColor: '#15141F',
  fontWeight: 500,
  fontSize: '11px',
  fontFamily: 'Overpass',
  width: '100%',
  textTransform: 'none',
  borderRadius: '12px',
  boxShadow: "none",
  marginTop: '24px',
  padding: '16px 24px',
  display: 'flex',
  justifyContent: 'space-between',
  "&:hover": {
    color: theme.palette.button.primary.foreground,
    boxShadow: "none",
    backgroundColor: '#15141F',
  },
}))

const WithdrawButton = styled(Button)(({ theme }) => ({
  color: "#FB4E4E",
  border: "1px solid #E8E8E8",
  fontWeight: 500,
  fontSize: '16px',
  fontFamily: 'Overpass',
  width: '100%',
  textTransform: 'none',
  borderRadius: '12px',
  boxShadow: "none",
  marginTop: '24px',
  fontWeight: 'bold',
  "&:hover": {
    color: "#FB4E4E",
    boxShadow: "none",
  },
}))

const ConnectButton = styled(Button)(({ theme }) => ({
  color: "#FB4E4E",
  border: "1px solid #E8E8E8",
  fontWeight: 500,
  fontSize: '16px',
  fontFamily: 'Overpass',
  width: '100%',
  textTransform: 'none',
  borderRadius: '12px',
  boxShadow: "none",
  marginTop: '24px',
  fontWeight: 'bold',
  "&:hover": {
    color: "#FB4E4E",
    boxShadow: "none",
  },
}))


const GoldButton = styled(Button)(({ theme }) => ({
  backgroundColor: "rgba(255, 188, 31, 0.1)",
  color: "#FFBC1F",
  fontWeight: 300,
  fontSize: '12px',
  fontFamily: 'Overpass',
  textTransform: 'none',
  borderRadius: '8px',
  boxShadow: "none",
  fontWeight: 'bold',
  marginTop: '10px',
  "&:hover": {
    color: "#FFBC1F",
    backgroundColor: "rgba(255, 188, 31, 0.1)",
    boxShadow: "none"
  },
}))

const UserAvatar = styled(Avatar)(({ theme }) => ({
  width: '85px',
  height: '85px',
  border: "2px dashed #FFBC1F",
  marginBottom: "10px"
}))

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: 'lightgrey',
  width: '30px',
  height: '30px',
}))

const WrapImage = styled(`img`)(({ theme }) => ({
  borderRadius: "16px",
  paddingRight: "10px",
  width: "27px",
  height: "27px"
}));

const WrapBox = styled(Box)(({ theme }) => ({
  margin: "1px",
  padding: "10px",
  borderRadius: "16px",
  backgroundColor: theme.palette.box.background
}))

const Profile = (props) => {
  
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()

  const { activate, deactivate, account, library, chainId } = useWeb3React();
  const [openWallet, setOpenWallet] = useState(false);

  const balance = useSelector(state => state.app.balance)
  const lockBalance = useSelector(state => state.app.lockBalance)
  
  const handleToggle = (event) => {
    dispatch(setBlackTheme(event.target.checked));
  };

  const handleConnectWallet = (walletInfo) => {
    const { connector, type } = walletInfo;
    // setSelectedWalletInfo(walletInfo)
    if (connector) {
      activate(connector, undefined, true)
        .then(async res => {
          await switchNetwork('0x4')
          // setStep(1)
        })
        .catch(error => {
          if (error instanceof UnsupportedChainIdError) {
            activate(connector);
          } else {
            if (error.code == 4001) {
              dispatch(setNotificationData({
                message: `You should switch Ethereum network to Rinkeby`,
                variant: 'error',
                open: true
              }))
            } else if (type === 'metamask') {
              // setNoMetamask(true);
            }
            console.info("Connection Error - ", error);
          }
        })
        .finally(() => {
          setOpenWallet(false);
        });
    }
  }

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <WrapContainer maxWidth="sm">
        <Content>
          <Box display="flex" paddingBottom="30px" >
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={
                <SmallAvatar alt="camera" src={CameraIcon} />
              }
            >
              <UserAvatar src={UserAvatarImage1} alt="ME"/>
            </Badge>
            
            <Box display="" alignItems="center" padding="10px" marginLeft="20px">
              <Typography variant="sl_title" >
                {account && getAbbreviationAddress(account)}
              </Typography>
              <GoldButton endIcon={<RankingIcon/>}> Member Gold </GoldButton>
            </Box>
            <MaterialUISwitch sx={{ m: 1 }} onChange={handleToggle} />
          </Box>
          <Box paddingBottom="12px">
            <Typography variant="sm_content_gray">Overview</Typography>
          </Box>
          {
            account ? 
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <WrapBox>
                  <Typography variant="xs_content_gray" >Total Balance</Typography>
                  <Box display='flex' marginTop="10px">
                    <WrapImage src={IncomeIcon} alt='' />
                    <Typography variant="sl_title" >${getFormatNumber(balance)}</Typography>
                  </Box>
                </WrapBox>                        
              </Grid>
              <Grid item xs={6}>
                <WrapBox>
                  <Typography variant="xs_content_gray">Lock in Parties</Typography>
                  <Box display='flex' marginTop="10px">
                    <WrapImage src={LockIcon} alt='' />
                    <Typography variant="sl_title" >${getFormatNumber(lockBalance)}</Typography>
                  </Box>
                </WrapBox>
              </Grid>
            </Grid>
            :
              <ConnectButton onClick={() => setOpenWallet(true)}>Connect wallet</ConnectButton>
          }
          
          <WithdrawButton> Withdraw money </WithdrawButton>
          <QuizButton href="https://rand.network" variant="contained" startIcon={<QuizIcon />} endIcon={<ArrowRightIcon />}>Got any questions for Rand? <br/> Our CS are ready 24/7 to help!</QuizButton>
          <Box marginTop="24px" textAlign="center" fontSize="12px">
            <Typography variant="sm_content_gray" >You joined Rand on September 2021. It’s been 1 month since then and our mission is still the same, making your savings work for you.</Typography>
          </Box>
        </Content>
      </WrapContainer>
      
      <ConnectWalletModal
        open={openWallet}
        onClose={() => setOpenWallet(false)}
        onSuccess={(selectedWallet) => handleConnectWallet(selectedWallet)}
      />
    </motion.div>
  );
}
 
export default Profile;