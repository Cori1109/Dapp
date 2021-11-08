import React from "react";
import { Input, InputAdornment } from "@mui/material";
import { styled } from '@mui/system';

const WrapInput = styled(Input)(({ theme }) => ({
    borderRadius: '16px',
    background: '#F9F9FA',
    padding: '16px',
    width: '100%',
    color: theme.palette.primary_gray,
    fontFamily: 'Overpass',
    fontWeight: 600,
    '&::placeholder': {
        color: theme.palette.secondary_gray,
        fontWeight: 400
    }
}));

const WrapInputAdornment = styled(InputAdornment)(({ theme }) => ({
    '& svg': {
        color: theme.palette.primary_gray
    }
}))

const InputBox = ({id, startIcon, endText, placeholder, value, type, onChange, validated}) => {

    return (
        <WrapInput
            id={id}
            disableUnderline={true}
            label="TextField"
            type={type}
            startAdornment={
                <WrapInputAdornment position="start">
                    {startIcon}
                </WrapInputAdornment>
            }
            endAdornment={
                endText ?
                <WrapInputAdornment position="end">
                    {endText}
                </WrapInputAdornment>
                :
                null
            }
            value={value}
            onChange={(e) => onChange(e.target.id, e.target.value)}
            placeholder={placeholder}
            style={{border: validated ? `none` : '2px solid red'}}
        />
    );
}

export default InputBox;