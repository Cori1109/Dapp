import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { styled } from '@mui/system';
import FundsButton from '../Button/FundsButton';

const CardBox = styled(Box)(({ theme }) => ({
    background: '#0C2073',
    borderRadius: '10px',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
    wordWrap: 'break-word',
    backgroundClip: 'border-box',
    border: '1px solid rgba(0,0,0,.125)'
}));

const CardBody = styled('div')(({ theme }) => ({
    flex: '1 1 auto',
    padding: '1.25rem'
}));

const Title = styled(Typography)(({ theme }) => ({
    color: 'white',
    background: '#586599',
    borderRadius: '10px',
    padding: '.75rem 1.25rem',
    marginBottom: 0,
    fontWeight: 'bold'
}));

const BalanceNumber = styled(Typography)(({ theme }) => ({
    color: 'white',
    fontWeight: 'bold'
}));


const BalanceCard = (props) => {

return(
    <CardBox>
        <Title>Your Balance</Title>
        <CardBody>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <BalanceNumber variant="h5">$2,736.15</BalanceNumber>
                </Grid>
                <Grid item xs={6} sx={{textAlign:'right'}}>
                    <FundsButton text="Add Money"/>
                </Grid>
            </Grid>
        </CardBody>
    </CardBox>
    );
}
 
export default BalanceCard;