import React from "react";
import { Box, Container, Stack, Paper, Typography, Button } from "@mui/material";
import { styled } from '@mui/system';
import BalanceCard from '../../components/BalanceCard';
import { motion } from "framer-motion";
import { pageVariants, pageTransition } from "../../utils/pageTransitions"
import HeaderBar from "../../components/HeaderBar";
import PartiesList from "components/PartiesList";
import Banner from "components/Banner";
import { useSelector } from "react-redux";

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

const Dashboard = (props) => {
  const partyList = useSelector(state => state.app.partyList)
  return (
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
            <Banner />
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
    </Box>
  </motion.div>
  );
}

export default Dashboard;