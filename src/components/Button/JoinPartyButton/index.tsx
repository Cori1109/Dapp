import React from 'react';
import styled from "styled-components";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

const ButtonContainer = styled(Button)`
    && {
        border-radius: 40px;
    }
`;


interface ButtonProps {
    text?: string,
    children?: any,
    disabled?: boolean;
}

const JoinPartyButton = (props: ButtonProps) => {
    return(
        <ButtonContainer variant="contained" endIcon={<SendIcon />}>
        Join Party
        </ButtonContainer>        
    );
}

export default JoinPartyButton;