import React from 'react';
import styled from "styled-components";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

const IconButton = styled(Button)(({ theme }) => ({
    borderRadius: '40px',
}));

const JoinPartyButton = props => {

    return (
        <IconButton variant="contained" endIcon={<SendIcon />}>
            Join Party
        </IconButton>        
    );
}

export default JoinPartyButton;