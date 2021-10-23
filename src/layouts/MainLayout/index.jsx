import React from 'react';
import PropTypes from 'prop-types';
import NavBar from '../../components/NavBar';
import { Box, Container } from '@mui/material';
import { styled } from '@mui/system';

const RootBox = styled(Box)(({ theme }) => ({
  background: theme.palette.main.background,
  height: '100vh'
}));

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
      <Container maxWidth="sm">
        <div >{children}</div>
        <NavbarBox>
          <NavBar />
        </NavbarBox>
      </Container>
    </RootBox>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node
};

export default MainLayout;
 