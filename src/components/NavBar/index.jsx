import * as React from 'react';
import Box from '@mui/material/Box';
import { useHistory } from "react-router-dom";
import { styled } from '@mui/system';
import { 
  Language as LanguageIcon, 
  Home as DashboardIcon,
  PeopleAlt as PartiesIcon
} from '@mui/icons-material';

const RootBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.button.primary.background,
  width: '50%',
  height: theme.spacing(5),
  borderRadius: '16px',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center'
}));

const WrapLanguageIcon = styled(LanguageIcon)(({ theme }) => ({
  color: theme.palette.button.primary.foreground,
  '&:hover': {
    color: theme.palette.button.primary.hover.foreground,
  }
}))

const WrapDashboardIcon = styled(DashboardIcon)(({ theme }) => ({
  color: theme.palette.button.primary.foreground,
  '&:hover': {
    color: theme.palette.button.primary.hover.foreground,
  }
}))

const WrapPartiesIcon = styled(PartiesIcon)(({ theme }) => ({
  color: theme.palette.button.primary.foreground,
  '&:hover': {
    color: theme.palette.button.primary.hover.foreground,
  }
}))

const NavBar = props => {
  const history = useHistory();

  return (
    <RootBox>
      <Box onClick={() => {history.push('/public-party')}}>
        <WrapLanguageIcon />
      </Box>
      <Box onClick={() => {history.push('/dashboard')}}>
        <WrapDashboardIcon />
      </Box>
      <Box onClick={() => {history.push('/private-party')}}>
        <WrapPartiesIcon />
      </Box>
    </RootBox>
  );
}

export default NavBar;
