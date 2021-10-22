import React from 'react';
import PropTypes from 'prop-types';
import NavBar from '../../components/NavBar';
import { Box } from '@mui/material';
import { styled } from '@mui/system';

const RootBox = styled(Box)(({ theme }) => ({
  background: theme.palette.main.background,
  height: 'calc(100vh - 32px)'
}));

const DetailLayout = ({ children }) => {
  return (
    <RootBox>
      <div >{children}</div>
    </RootBox>
  );
};

DetailLayout.propTypes = {
  children: PropTypes.node
};

export default DetailLayout;
 