import React from "react";
import { Box, Container, Stack, Paper, Typography, Button } from "@mui/material";
import { styled } from '@mui/system';
import SwipeButton from '../../components/Button/SwipeButton';
import BalanceCard from '../../components/BalanceCard';
import { motion } from "framer-motion";
import { pageVariants, pageTransition } from "../../utils/pageTransitions"
import HeaderBar from "../../components/HeaderBar";
import PartiesList from "components/PartiesList";

const Item = styled(Paper)`
    textAlign: 'center',
`;

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
    name: 'Weekly Party',
    avatar: null,
    isPublic: true,
    balance: '1.443.650,90',
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
 
const Dashboard = (props) => {

return(
  <motion.div
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    transition={pageTransition}
  >
    <Box>
        <Stack spacing={2}>
            <HeaderBar setTheme={props.setTheme}/>
            <BalanceCard />
            <Item>Banner</Item>
            <ContentPaper>
              <ContentHeader>
                <Typography variant="subtitle3">
                  Your parites
                </Typography>
                <PrimaryButton variant="text">See all</PrimaryButton>
              </ContentHeader>
              <PartiesList list={mockup_data}/>
            </ContentPaper>
        </Stack>
            <SwipeButton 
                mainText="Swipe to join" 
                overlayText="" 
                onSwipeDone={() => {
                    console.log("Done!");
                }} 
                reset={0}
            />
    </Box>
  </motion.div>
  );
}
 
export default Dashboard;