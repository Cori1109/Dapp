import React from "react";
import { Box, Container, Stack, Paper } from "@mui/material";
import { styled } from '@mui/system';
import SwipeButton from '../../components/Button/SwipeButton';
import BalanceCard from '../../components/BalanceCard';

const Item = styled(Paper)`
    textAlign: 'center',
    color: 'white', 
`;

const Dashboard = () => {

return(
    <Box>
        <Container maxWidth="sm">
        <Stack spacing={2}>
            <Item>Top bar - config</Item>
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
    );
}
 
export default Dashboard;