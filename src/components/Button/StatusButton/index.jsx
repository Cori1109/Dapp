import React from "react";
import { Button } from "@mui/material";
import { styled } from '@mui/system';
import { 

  CheckCircleOutlined as CheckCircleOutlinedIcon 
} from '@mui/icons-material';

const WrapButton = styled(Button)(({ theme }) => ({
  color: theme.palette.button.primary.foreground,
  backgroundColor: theme.palette.button.secondary.background,
  fontWeight: 500,
  fontSize: '16px',
  fontFamily: 'Manrope',
  width: '100%',
  textTransform: 'none',
  borderRadius: '12px',
  marginTop: '24px',
  padding: '16px 24px',
  display: 'flex',
  justifyContent: 'space-between'
}))

const JoinButton = styled(Button)(({ theme }) => ({
  color: theme.palette.button.primary.foreground,
  backgroundColor: theme.palette.button.secondary.background,
  fontWeight: 500,
  fontSize: '16px',
  fontFamily: 'Manrope',
  width: '100%',
  textTransform: 'none',
  borderRadius: '12px',
  marginTop: '24px',
  padding: '16px 24px',
  display: 'flex',
  justifyContent: 'center'
}))

const StatusButton = ({status, handleClick}) => {

  return (
    status == "joined" ?
      <WrapButton variant="contained" endIcon={<CheckCircleOutlinedIcon />}>Joined</WrapButton>
    : status == "finished" ?
      <WrapButton variant="contained" endIcon={<CheckCircleOutlinedIcon />}>Finished</WrapButton>
    : 
      <JoinButton variant="contained" onClick={handleClick}>Join</JoinButton>
  );
}
 
export default StatusButton;