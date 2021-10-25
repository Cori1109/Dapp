import React from 'react';
import PropTypes from 'prop-types';
import NavBar from '../../components/NavBar';
import { Box } from '@mui/material';
import { styled } from '@mui/system';

const RootBox = styled(Box)(({ theme }) => ({
  background: theme.palette.main.background,
  height: '100vh'
}));

const NavbarBox = styled(Box)(({ theme }) => ({
  width: '100%',
  position: 'fixed',
  bottom: theme.spacing(4),
  display: 'flex',
  justifyContent: 'center',
}));

const MainLayout = ({ children }) => {
  return (
    <RootBox>
      <div >{children}</div>
      <NavbarBox>
        <NavBar />
      </NavbarBox>
    </RootBox>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node
};

export default MainLayout;
 