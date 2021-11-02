import React from "react";
import { Box } from "@mui/material";
import { styled } from '@mui/system';
import OptionButton from "components/Button/OptionButton";
import PaymentCardImg from "../../assets/logo/payment_card.png";
import DownImg from "../../assets/logo/down.png";

const CardBox = styled(Box)(({ theme }) => ({
    borderRadius: '16px',
    padding: '16px 24px'
}));

const PaymentMethodSelector = ({ setOpenWallet }) => {

    return (
        <CardBox padding="32px 0px">
            <Box marginBottom="32px">
                <OptionButton text="With debit card" startIcon={PaymentCardImg} endIcon={DownImg} disabled={true}/>
            </Box>
            <Box>
                <OptionButton text="With crypto" startIcon={PaymentCardImg} endIcon={DownImg} handleClick={() => setOpenWallet(true)}/>
            </Box>
        </CardBox>
    );
}

export default PaymentMethodSelector;