import React from 'react';
import { styled } from '@mui/system';
import { Button, Typography, Box } from "@mui/material";

const ButtonContainer = styled('button')(({ theme }) => ({
    width: '100%',
    border: '1px solid #F5F7FE',
    backgroundColor: 'transparent',
    borderRadius: '16px',
    padding: '16px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    '&:disabled': {
        cursor: 'not-allowed'
    }
}));

const Icon = styled('img')(({ theme }) => ({
    marginRight: '16px',
}))

const OptionButton = (props) => {
    return(
        <ButtonContainer variant="contained" disabled={props.disabled} onClick={props.handleClick}>
            <Box display="flex" alignItems="center">
                <Icon src={props.startIcon}/>
                <Typography variant="xs_content_gray">{props.text}</Typography>
            </Box>
            <Icon src={props.endIcon}/>
        </ButtonContainer>        
    );
}

export default OptionButton;