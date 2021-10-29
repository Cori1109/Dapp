import React from "react";
import { Box, Input, Typography, InputAdornment } from "@mui/material";
import { styled } from '@mui/system';
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import { useDispatch } from "react-redux";
import { setNotificationData } from "store/actions/App";

const CardBox = styled(Box)(({ theme }) => ({
    background: '#F5F7FE',
    borderRadius: '32px',
    padding: '32px'
}));

const CardBody = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: '24px'
}));

const BalanceCurrency = styled(Typography)(({ theme }) => ({
    color: 'black',
    fontSize: '20px',
    fontWeight: 'bold',
    display: 'flex'
}));

const BalanceNumber = styled(Input)(({ theme }) => ({
    '& input': {
        padding: '0px',
        fontSize: '36px',
        color: 'black',
        fontSize: '48px',
        fontWeight: 'bold'
    },
    '& .MuiOutlinedInput-notchedOutline': {
        border: '0px'
    },
    '& .MuiTypography-root': {
        fontSize: '24px',
        paddingBottom: '12px',
        color: 'black',
        fontWeight: 'bold',
    }
}));


const BalanceSelector = ({max, balance, setBalance, overflowMessage, currency}) => {
const dispatch = useDispatch()
const handleDecreaseBalance = () => {
    if (balance == 0) {
        dispatch(setNotificationData({
            message: overflowMessage,
            variant: 'error',
            open: true
        }))
    } else if (balance < 100) {
        setBalance('0')
    } else {
        let _n_balance = Number(balance) - 100;
        setBalance((Math.ceil(_n_balance / 100) * 100).toString())
    }
}

const handleIncreaseBalance = () => {
    if (balance == max) {
        dispatch(setNotificationData({
            message: overflowMessage,
            variant: 'error',
            open: true
        }))
    } else if (max !== -1 && Number(balance) > max - 100) {
        setBalance(max.toString())
    } else {
        let _n_balance = Number(balance) + 100;
        setBalance((parseInt(_n_balance / 100) * 100).toString())
    }
}

const handleChangeBalance = (value) => {
    let _value = parseInt(value)
    
    if (value.length == 0 || value < 0) {
        dispatch(setNotificationData({
            message: overflowMessage,
            variant: 'error',
            open: true
        }))
        _value = 0;
    }
    if (max !== -1 && Number(value) > max) {
        dispatch(setNotificationData({
            message: overflowMessage,
            variant: 'error',
            open: true
        }))
        _value = max
    }

    setBalance(_value.toString())
}

return(
    <CardBox>
        <Typography variant="subtitle2" textAlign="center">
            {`Amount (${currency ? currency : 'USD'})`}
        </Typography>
        <CardBody>
            <RemoveIcon style={{ color:"#4263EB"}} onClick={() => handleDecreaseBalance()}/>
            <BalanceCurrency>
                <BalanceNumber 
                    disableUnderline={true}  
                    type="number" 
                    value={balance} 
                    onChange={(e) => handleChangeBalance(e.target.value)}
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    style={{width: (balance.toString().length + 1) * 30 + 10}}
                />
            </BalanceCurrency>
            <AddIcon style={{ color:"#4263EB"}} onClick={() => handleIncreaseBalance()}/>
        </CardBody>
    </CardBox>
    );
}
 
export default BalanceSelector;