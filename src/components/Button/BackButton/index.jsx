import React from 'react';
import { styled } from '@mui/system';
import {
    ArrowBack as BackIcon,
} from "@mui/icons-material";
import { useHistory } from "react-router";

const WrapBackIcon = styled(BackIcon)(({ theme }) => ({
    color: theme.palette.primary_gray,
    fontSize: "24px",
}));

const BackButton = (props) => {
    const history = useHistory();
    return (
        <WrapBackIcon
            onClick={() => {
                history.goBack();
            }}
        />
    );
}

export default BackButton;