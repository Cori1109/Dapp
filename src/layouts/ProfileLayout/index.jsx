import React from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Typography } from "@mui/material";
import { styled } from '@mui/system';
import { useSelector } from 'react-redux';
import { ArrowBack as BackIcon } from '@mui/icons-material';
import { useHistory } from "react-router";
import NavBar from '../../components/NavBar';


const RootBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.header.background,
  height: '100vh'
}));

const HeaderBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: `${theme.spacing(5)} ${theme.spacing(2)}`,
  alignItems: 'center'
}));

const HeaderTitle = styled(Typography)(({theme}) => ({
  color: theme.palette.text.dark
}))

const WrapBackIcon = styled(BackIcon)(({ theme }) => ({
  color: theme.palette.text.dark,
  fontSize: '30px'
}))

const ContentBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.dark.background,
  borderRadius: '26px 26px 0px 0px',
  height: 'calc(100vh - 110px)',
  overflow: 'auto'
}));

const NavbarBox = styled(Box)(({ theme }) => ({
  width: '50%',
  position: 'absolute',
  left: 0,
  bottom: '25px',
  right: 0,
  margin: 'auto'
}));

const ProfileLayout = ({ children }) => {
  const history = useHistory();

  return (
    <RootBox>
      <Container maxWidth="sm">
        <HeaderBox>
          <WrapBackIcon onClick={() => {history.goBack()}}/>
          <HeaderTitle variant="sl_title_dark">
            
          </HeaderTitle>
          <Box></Box>
        </HeaderBox>
      </Container>
      <ContentBox>
        {children}
        
      </ContentBox>
      <NavbarBox>
          <NavBar />
        </NavbarBox>
    </RootBox>
  );
};

ProfileLayout.propTypes = {
  children: PropTypes.node
};

export default ProfileLayout;
 