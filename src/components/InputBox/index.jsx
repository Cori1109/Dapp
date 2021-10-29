import React from "react";
import { Input, InputAdornment } from "@mui/material";
import { styled } from '@mui/system';

const WrapInput = styled(Input)(({ theme }) => ({
    borderRadius: '16px',
    background: '#F9F9FA',
    padding: '16px',
    width: '100%'
}));

const InputBox = ({id, startIcon, placeholder, value, type, onChange, validated}) => {

    return (
        <WrapInput
            id={id}
            disableUnderline={true}
            label="TextField"
            type={type}
            startAdornment={
                <InputAdornment position="start">
                    {startIcon}
                </InputAdornment>
            }
            value={value}
            onChange={(e) => onChange(e.target.id, e.target.value)}
            placeholder={placeholder}
            style={{border: validated ? `none` : '2px solid red'}}
        />
    );
}

export default InputBox;