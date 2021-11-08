import React, {useState} from "react";
import { Box, Avatar, Typography, Link, Button } from "@mui/material";
import Switch, { SwitchProps } from "@mui/material/Switch";
import { styled } from "@mui/system";
import { useDispatch } from "react-redux";
import { setBlackTheme } from "store/actions/App";
import { RankingIcon } from "../../assets/logo/icon";
import UserAvatarImage1 from "../../assets/avatar/me.png";
import { useHistory } from "react-router";
import PrimaryButton from "components/Button/PrimaryButton";
import Logo from "assets/logo/logo.png";

import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import ConnectWalletModal from "components/Modal/ConnectWalletModal";
import { setNotificationData } from "store/actions/App";
import { switchNetwork } from "utils/web3utils";

const mockup_profile = {
  name: "James Lee",
  balance: "2,736.15",
  avatar: "https://a.com",
};

const ContentImage = styled(`img`)(({ theme }) => ({
  width: '175px'
}))


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

const BoxContainer = styled(Box)(({ theme }) => ({
  // padding: "20px",
}));

const BoxAvatar = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
}));

const NameTypography = styled(Typography)(({ theme }) => ({
  // cursor: "pointer",
}));

const GoldButton = styled(Button)(({ theme }) => ({
  backgroundColor: "rgba(255, 188, 31, 0.1)",
  color: "#FFBC1F",
  fontWeight: 300,
  fontSize: "12px",
  fontFamily: "Overpass",
  textTransform: "none",
  borderRadius: "8px",
  boxShadow: "none",
  fontWeight: "bold",
  padding: "6px 10px",
  "&:hover": {
    color: "#FFBC1F",
    backgroundColor: "rgba(255, 188, 31, 0.1)",
    boxShadow: "none",
  },
}));

const UserAvatar = styled(Avatar)(({ theme }) => ({
  width: "50px",
  height: "50px",
  border: "2px dashed #FFBC1F",
  marginLeft: "8px",
}));

const HeaderBar = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { activate, deactivate, account, library, chainId } = useWeb3React();
  const [openWallet, setOpenWallet] = useState(false);
  
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

  const handleToggle = (event) => {
    dispatch(setBlackTheme(event.target.checked));
  };

  return (
    <BoxContainer>
      {/*<Box width="100%" textAlign="right">
        <MaterialUISwitch sx={{ m: 1 }} onChange={handleToggle} />
      </Box>*/}
      <Box marginTop="20px" display="flex" justifyContent="space-between">
        <Box>
          <ContentImage src={Logo} />
          {/*<Typography variant="sm_title">Good morning,</Typography>
          <Box display="flex">
            <NameTypography variant="md_title">
              {mockup_profile.name}
            </NameTypography>
          </Box>*/}
        </Box>
        <BoxAvatar>
          {
            account ?
              <> 
                <GoldButton startIcon={<RankingIcon />}> Gold </GoldButton>
                <UserAvatar src={UserAvatarImage1} alt="ME" onClick={() => history.push('/profile')}/>  
              </>
            :
              <PrimaryButton variant="contained" style={{fontSize: "14px", padding: "8px 10px", borderRadius: "8px"}} 
                onClick={() => setOpenWallet(true)} text="Connect Wallet" />      
          }          
          
        </BoxAvatar>
      </Box>

      <ConnectWalletModal
        open={openWallet}
        onClose={() => setOpenWallet(false)}
        onSuccess={(selectedWallet) => handleConnectWallet(selectedWallet)}
      />
    </BoxContainer>
  );
};

export default HeaderBar;
