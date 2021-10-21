import * as React from 'react';
import Box from '@mui/material/Box';
import { useHistory } from "react-router-dom";
import useStyles from './style';
import { 
  Language as LanguageIcon, 
  Home as DashboardIcon,
  PeopleAlt as PartiesIcon
} from '@mui/icons-material';

const NavBar = props => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box onClick={() => {history.push('/public-party')}}>
        <LanguageIcon className={classes.icon} />
      </Box>
      <Box onClick={() => {history.push('/dashboard')}}>
        <DashboardIcon className={classes.icon} />
      </Box>
      <Box onClick={() => {history.push('/private-party')}}>
        <PartiesIcon className={classes.icon} />
      </Box>
    </Box>
  );
}

export default NavBar;
