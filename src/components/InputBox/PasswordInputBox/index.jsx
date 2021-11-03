import React from "react";
import { Input, InputAdornment } from "@mui/material";
import { styled } from '@mui/system';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const WrapInput = styled(Input)(({ theme }) => ({
    borderRadius: '16px',
    background: '#F9F9FA',
    padding: '16px',
    width: '100%'
}));

const WrapInputAdornment = styled(InputAdornment)(({ theme }) => ({
    '& svg': {
        color: theme.palette.text.third
    }
}))

const PasswordInputBox = ({id, startIcon, type, placeholder, value, onChange, validated, visible, setVisible}) => {

    return (
        <WrapInput
            id={id}
            disableUnderline={true}
            label="TextField"
            type={type}
            startAdornment={
                <WrapInputAdornment position="start" >
                    {startIcon}
                </WrapInputAdornment>
            }
            endAdornment={
                <WrapInputAdornment position="end"  onClick={() => {setVisible(!visible)}}>
                    {visible == true ? <VisibilityOff /> : <Visibility />}
                </WrapInputAdornment>
            }
            value={value}
            onChange={(e) => onChange(e.target.id, e.target.value)}
            placeholder={placeholder}
            style={{border: validated ? `none` : '2px solid red'}}
        />
    );
}

export default PasswordInputBox;