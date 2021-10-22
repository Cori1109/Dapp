import React from "react";
import { Box, Container, Stack, Paper, Typography, Button } from "@mui/material";
import { styled } from '@mui/system';
import { motion } from "framer-motion";
import { pageVariants, pageTransition } from "../../../utils/pageTransitions"
import parivatePartyImage from '../../../assets/landing/private-party.png'
import PartiesList from '../../../components/PartiesList'

const HeaderBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  padding: theme.spacing(5)
}));

const ContentPaper = styled(Paper)(({ theme }) => ({
  boxShadow: '0px 20px 46px rgba(0, 0, 0, 0.1)',
  borderRadius: '16px',
  padding: theme.spacing(2)
}));

const ContentHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const PrimaryButton = styled(Button)(({ theme }) => ({
  color: theme.palette.button.text.foreground,
  fontWeight: 500,
  fontSize: '16px',
  fontFamily: 'Manrope'
}))

const ContentImage = styled(`img`)(({ theme }) => ({
  borderRadius: '16px',
  width: 'calc(100% - 16px)',
  padding: `${theme.spacing(2)} ${theme.spacing(1)}`
}))

const mockup_data = [
  {
    partyId: '1234-5678',
    name: 'Monthly Beers',
    avatar: null,
    isPublic: false,
    balance: '450,90',
    leftHours: '12 Hours 30 Min'
  }, {
    partyId: '1324-1142',
    name: 'Trip to Ibiza',
    avatar: null,
    isPublic: false,
    balance: '650,90',
    leftHours: '12 Hours 30 Min'
  }, {
    partyId: '5619-3131',
    name: 'Family Party',
    avatar: null,
    isPublic: false,
    balance: '780,90',
    leftHours: '12 Hours 30 Min'
  }
]
const PrivatePartyList = (props) => {
  
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <Container maxWidth="sm">
        <HeaderBox>
          <Typography variant="subtitle1">
            Private Parites
          </Typography>
        </HeaderBox>
        <ContentPaper>
          <ContentHeader>
            <Typography variant="subtitle3">
              Your private parites
            </Typography>
            <PrimaryButton variant="text">Create</PrimaryButton>
          </ContentHeader>
          <ContentImage src={parivatePartyImage} />
          <PartiesList list={mockup_data}/>
        </ContentPaper>
      </Container>
    </motion.div>
  );
}
 
export default PrivatePartyList;