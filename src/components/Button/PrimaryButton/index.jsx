import React from 'react';
import { styled } from '@mui/system';
import { Button } from "@mui/material";

const FillButtonContainer = styled(Button)(({ theme }) => ({
    color: theme.palette.white,
    backgroundColor: theme.palette.primary_blue,
    fontWeight: 700,
    fontSize: '16px',
    lineHeight: '25.6px',
    padding: '16px 24px',
    width: "100%",
    fontFamily: "Overpass",
    textTransform: "none",
    boxShadow: "none",
    borderRadius: "12px",
    "&:hover": {
        color: theme.palette.white,
        backgroundColor: theme.palette.primary_blue,
        boxShadow: "none"
    },
}));

const TextButtonContainer = styled(Button)(({ theme }) => ({
    color: theme.palette.primary_blue,
    backgroundColor: theme.palette.light_blue,
    fontWeight: 700,
    fontSize: '16px',
    lineHeight: '25.6px',
    padding: '16px',
    width: "100%",
    fontFamily: "Overpass",
    textTransform: "none",
    boxShadow: "none",
    borderRadius: "12px",
    "&:hover": {
        color: theme.palette.primary_blue,
        backgroundColor: theme.palette.light_blue,
        boxShadow: "none"
    },
}));

const PrimaryButton = (props) => {
    console.log(props.text)
    return (
        props.variant == "contained" ?
            <FillButtonContainer variant={props.variant} onClick={props.onClick} endIcon={props.endIcon} startIcon={props.startIcon} style={props.style}>
                {props.text}
            </FillButtonContainer>
            :
            <TextButtonContainer variant={props.variant} onClick={props.onClick} endIcon={props.endIcon} startIcon={props.startIcon} style={props.style}>
                {props.text}
            </TextButtonContainer>

    );
}

export default PrimaryButton;