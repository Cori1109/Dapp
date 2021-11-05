import React from 'react';
import { styled } from '@mui/system';
import { Button, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

const ButtonContainer = styled(Button)(({ theme }) => ({
    fontsize: "14px",
    background: "rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(30px)",
    borderRadius: "40px",
    padding: "12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    textTransform: 'none',
    boxShadow: "none",
    "&: hover": {
        background: "rgba(255, 255, 255, 0.2)",
        boxShadow: "none"
    }
}));

const Text = styled(Typography)(({ theme }) => ({
    fontSize: '12px',
    color: 'white',
}));


const FundsButton = (props) => {
    return(
        <ButtonContainer variant="contained" startIcon={<AddIcon />} onClick={props.onClick}>
            {props.text}
        </ButtonContainer>        
    );
}

export default FundsButton;