import React, { useEffect, useState } from "react";
import { Box, Container, Stack, Typography, Button, Grid, Avatar, Badge } from "@mui/material";
import { styled } from '@mui/system';
import { motion } from "framer-motion";
import { pageVariants, pageTransition } from "../../utils/pageTransitions"
import { useParams, useHistory, useLocation } from "react-router";
import { useDispatch, useSelector } from 'react-redux';

import { 
  Add as AddIcon, 
  InfoOutlined as InfoOutlinedIcon,
} from '@mui/icons-material';
import EmptyAccountModal from "components/Modal/EmptyAccountModal";
import { setHeaderTitle, editParty, setBalance, setJoinedParam } from "store/actions/App";
import UserAvatarImage1 from "../../assets/avatar/me.png";
import IncomeIcon from "../../assets/logo/income.png";
import CameraIcon from "../../assets/logo/camera.png";
import { ArrowRightIcon, QuizIcon, RankingIcon, LockIcon } from "../../assets/logo/icon";

import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import ConnectWalletModal from "components/Modal/ConnectWalletModal";
import { setNotificationData } from "store/actions/App";
import { switchNetwork } from "utils/web3utils";
import { getAbbreviationAddress } from "utils/functions";

const WrapContainer = styled(Container)(({ theme }) => ({
  height: 'calc(100vh - 200px)',
  overflow: 'auto'
}))

const Content = styled(Box)(({ theme }) => ({
  padding: `${theme.spacing(3)} ${theme.spacing(3)}`
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
  paddingTop: "5px",
  paddingRight: "10px",
  width: "27px",
  height: "27px"
}));

const WrapBox = styled(Box)(({ theme }) => ({
  margin: "1px",
  padding: "20px",
  borderRadius: "16px",
  backgroundColor: "#F5F7FE"
}))

const Profile = (props) => {
  
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()

  const { activate, deactivate, account, library, chainId } = useWeb3React();
  const [openWallet, setOpenWallet] = useState(false);

  const balance = useSelector(state => state.app.balance)
  
  const handleConnectWallet = (walletInfo) => {
    const { connector, type } = walletInfo;
    // setSelectedWalletInfo(walletInfo)
    if (connector) {
      activate(connector, undefined, true)
        .then(async res => {
          await switchNetwork('0x3')
          // setStep(1)
        })
        .catch(error => {
          if (error instanceof UnsupportedChainIdError) {
            activate(connector);
          } else {
            if (error.code == 4001) {
              dispatch(setNotificationData({
                message: `You should switch Ethereum network to Ropsten`,
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
              <Typography variant="subtitle1" >
                {account && getAbbreviationAddress(account)}
              </Typography>
              <GoldButton endIcon={<RankingIcon/>}> Member Gold </GoldButton>
            </Box>
          </Box>
          <Box paddingBottom="12px">
            <Typography variant="subtitle3">Overview</Typography>
          </Box>
          {
            account ? 
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <WrapBox>
                  <Typography variant="" >Total Balance</Typography>
                  <Box display='flex' marginTop="10px">
                    <WrapImage src={IncomeIcon} alt='' />
                    <Typography variant="subtitle1" >$4,500</Typography>
                  </Box>
                </WrapBox>                        
              </Grid>
              <Grid item xs={6}>
                <WrapBox>
                  <Typography variant="">Lock in Parties</Typography>
                  <Box display='flex' marginTop="10px">
                    <WrapImage src={LockIcon} alt='' />
                    <Typography variant="subtitle1" >$1,500</Typography>
                  </Box>
                </WrapBox>
              </Grid>
            </Grid>
            :
              <ConnectButton onClick={() => setOpenWallet(true)}>Connect wallet</ConnectButton>
          }
          
          <WithdrawButton> Withdraw money </WithdrawButton>
          <QuizButton variant="contained" startIcon={<QuizIcon />} endIcon={<ArrowRightIcon />}>Got any questions for Rand? <br/> Our CS are ready 24/7 to help!</QuizButton>
          <Box marginTop="24px" textAlign="center" fontSize="12px">
            <Typography variant="subtitle2" >You joined Finpay on September 2021. It’s been 1 month since then and our mission is still the same, help you better manage your finance.</Typography>
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