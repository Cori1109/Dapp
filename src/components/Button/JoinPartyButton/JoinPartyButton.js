import React from 'react';
import styled from "styled-components";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import useStyles from './style';

const JoinPartyButton = props => {

    const classes = useStyles();

    return(
        <Button variant="contained" endIcon={<SendIcon />} className={classes.root}>
            Join Party
        </Button>        
    );
}

export default JoinPartyButton;