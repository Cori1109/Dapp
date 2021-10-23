import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { styled } from '@mui/system';
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';

const CardBox = styled(Box)(({ theme }) => ({
    background: '#F5F7FE',
    borderRadius: '32px',
    padding: '32px'
}));

const CardBody = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '24px'
}));

const BalanceCurrency = styled(Typography)(({ theme }) => ({
    color: 'black',
    fontSize: '20px',
    fontWeight: 'bold',
    display: 'flex'
}));

const BalanceNumber = styled(Typography)(({ theme }) => ({
    color: 'black',
    fontSize: '48px',
    fontWeight: 'bold'
}));


const BalanceSelector = ({max, balance, setBalance}) => {

const handleDecreaseBalance = () => {
    if (balance < 100) {
        setBalance(0)
    } else {
        setBalance(balance - 100)
    }
}

const handleIncreaseBalance = () => {
    if (balance > max - 100) {
        setBalance(parseInt(max / 100) * 100)
    } else {
        setBalance(balance + 100)
    }
}

return(
    <CardBox>
        <Typography variant="subtitle2" textAlign="center">
            Amount (USD)
        </Typography>
        <CardBody>
            <RemoveIcon style={{ color:"#4263EB"}} onClick={() => handleDecreaseBalance()}/>
            <BalanceCurrency>
                $<BalanceNumber>{balance}</BalanceNumber>
            </BalanceCurrency>
            <AddIcon style={{ color:"#4263EB"}} onClick={() => handleIncreaseBalance()}/>
        </CardBody>
    </CardBox>
    );
}
 
export default BalanceSelector;