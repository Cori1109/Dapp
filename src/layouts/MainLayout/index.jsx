import React from 'react';
import PropTypes from 'prop-types';
import NavBar from '../../components/NavBar';
import { Box, Container } from '@mui/material';
import { styled } from '@mui/system';

const RootBox = styled(Box)(({ theme }) => ({
  background: theme.palette.main.background,
  height: '100vh'
}));

const WrapContainer = styled(Container)(({ theme }) => ({
  height: 'calc(100vh - 100px)',
  overflow: 'auto'
}))

const WrapContent = styled(Box)(({ theme }) => ({
  marginBottom: '40px'
}))

const NavbarBox = styled(Box)(({ theme }) => ({
  width: '50%',
  position: 'absolute',
  left: 0,
  bottom: '34px',
  right: 0,
  margin: 'auto'
}));

const MainLayout = ({ children }) => {
  return (
    <RootBox>
      <WrapContainer maxWidth="sm">
        <WrapContent>{children}</WrapContent>
        <NavbarBox>
          <NavBar />
        </NavbarBox>
      </WrapContainer>
    </RootBox>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node
};

export default MainLayout;
 