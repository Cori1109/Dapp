import React from "react";
import { Box, TextField, Typography } from "@mui/material";
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

const BalanceNumber = styled(TextField)(({ theme }) => ({
    '& input': {
        padding: '0px',
        fontSize: '36px',
        maxWidth: '200px',
        textAlign: 'center',
        color: 'black',
        fontSize: '48px',
        fontWeight: 'bold'
    },
    '& .MuiOutlinedInput-notchedOutline': {
        border: '0px'
    }
}));


const BalanceSelector = ({max, balance, setBalance}) => {

const handleDecreaseBalance = () => {
    if (balance < 100) {
        setBalance(0)
    } else {
        let _n_balance = Number(balance) - 100;
        setBalance(Math.ceil(_n_balance / 100) * 100)
    }
}

const handleIncreaseBalance = () => {
    if (balance > max - 100) {
        setBalance(max)
    } else {
        let _n_balance = Number(balance) + 100;
        setBalance(parseInt(_n_balance / 100) * 100)
    }
}

const handleChangeBalance = (value) => {
    let _value = value
    
    if (value.length == 0 && value < 0) {
        _value = 0;
    }
    if (Number(value) > max) {
        _value = max
    }

    setBalance(_value)
}

return(
    <CardBox>
        <Typography variant="subtitle2" textAlign="center">
            Amount (USD)
        </Typography>
        <CardBody>
            <RemoveIcon style={{ color:"#4263EB"}} onClick={() => handleDecreaseBalance()}/>
            <BalanceCurrency>
                $<BalanceNumber type="number" value={balance} onChange={(e) => handleChangeBalance(e.target.value)}/>
            </BalanceCurrency>
            <AddIcon style={{ color:"#4263EB"}} onClick={() => handleIncreaseBalance()}/>
        </CardBody>
    </CardBox>
    );
}
 
export default BalanceSelector;