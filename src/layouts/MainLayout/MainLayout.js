import React from 'react';
import PropTypes from 'prop-types';
import NavBar from '../../components/NavBar';
import useStyles from './style';
import { Box } from '@mui/material';

const MainLayout = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div >{children}</div>
      <Box className={classes.navbar}>
        <NavBar />
      </Box>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node
};

export default MainLayout;
 