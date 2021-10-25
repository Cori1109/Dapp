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

const PaymentMethodSelector = ({ }) => {

    return (
        <CardBox padding="32px 0px">
            <Box marginBottom="32px">
                <OptionButton text="With debit card" startIcon={PaymentCardImg} endIcon={DownImg} />
            </Box>
            <Box>
                <OptionButton text="With crypto" startIcon={PaymentCardImg} endIcon={DownImg} />
            </Box>
        </CardBox>
    );
}

export default PaymentMethodSelector;