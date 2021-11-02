import React from "react";
import { Box } from "@mui/material";
import { styled } from '@mui/system';
import OptionButton from "components/Button/OptionButton";
import CoinImg from "../../assets/logo/coin.png";
import DownImg from "../../assets/logo/down.png";

const CardBox = styled(Box)(({ theme }) => ({
    borderRadius: '16px',
    padding: '16px 24px'
}));

const CryptoSelector = ({ setOpenCrypto, walletInfo, account, cryptoInfo }) => {

    return (
        <CardBox padding="32px 0px">
            <Box marginBottom="32px">
                <OptionButton text={account} startIcon={walletInfo.logo}/>
            </Box>
            <Box>
                <OptionButton text={cryptoInfo ? cryptoInfo.title : "Choose crypto"} startIcon={cryptoInfo ? cryptoInfo.logo : CoinImg} endIcon={DownImg} handleClick={() => setOpenCrypto(true)}/>
            </Box>
        </CardBox>
    );
}

export default CryptoSelector;