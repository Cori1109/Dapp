import React from 'react';
import { styled } from '@mui/system';
import { Button, Typography } from "@mui/material";
import ControlPointIcon from '@mui/icons-material/ControlPoint';

const ButtonContainer = styled(Button)(({ theme }) => ({
    borderRadius: '40px'
}));

const AddIcon = styled(ControlPointIcon)(({ theme }) => ({
}));

const Text = styled(Typography)(({ theme }) => ({
    fontSize: '12px'
}));


interface ButtonProps {
    text?: string,
    children?: any,
    disabled?: boolean;
}

const FundsButton = (props: ButtonProps) => {
    return(
        <ButtonContainer variant="contained" startIcon={<AddIcon />}>
            <Text>{props.text}</Text>
        </ButtonContainer>        
    );
}

export default FundsButton;