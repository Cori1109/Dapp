import React from "react";
import { Box, Container, Stack, Paper } from "@mui/material";
import { styled } from '@mui/system';
import SwipeButton from '../../components/Button/SwipeButton';
import BalanceCard from '../../components/BalanceCard';
import { motion } from "framer-motion";
import { pageVariants, pageTransition } from "../../utils/pageTransitions"
import HeaderBar from "../../components/HeaderBar";


const Item = styled(Paper)`
    textAlign: 'center',
    color: 'white', 
`;

 

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
        <Container maxWidth="sm">
        <Stack spacing={2}>
            <HeaderBar setTheme={props.setTheme}/>
            <BalanceCard />
            <Item>Banner</Item>
            <Item>Your parties component</Item>
        </Stack>
            <SwipeButton 
                mainText="Swipe to join" 
                overlayText="" 
                onSwipeDone={() => {
                    console.log("Done!");
                }} 
                reset={0}
            />
        </Container>
    </Box>
  </motion.div>
  );
}
 
export default Dashboard;