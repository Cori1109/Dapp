import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { styled } from '@mui/system';

const RootBox = styled(Box)(({ theme }) => ({
  background: theme.palette.main.background,
  height: '100vh'
}));

const DefaultLayout = ({ children }) => {
  return (
    <RootBox>
      {children}
    </RootBox>
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.node
};

export default DefaultLayout;
 