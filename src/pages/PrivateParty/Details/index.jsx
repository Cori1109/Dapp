import React, { useState } from "react";
import { Box, Container, Stack, Paper, Typography, Button, Grid, Avatar } from "@mui/material";
import { fontSize, styled } from '@mui/system';
import { motion } from "framer-motion";
import { pageVariants, pageTransition } from "../../../utils/pageTransitions"
import { ArrowBack as BackIcon } from '@mui/icons-material';
import { useParams, useHistory } from "react-router";

const RootBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.sub.background
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
}));

const Content = styled(Box)(({ theme }) => ({
  padding: `${theme.spacing(3)} ${theme.spacing(2)}`
}));

const BalanceInfo = styled(Box)(({ theme}) => ({
  display: 'flex',
  alignItems: 'center'
}))

const PartyAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.button.primary.background,
  margin: 'auto'
}))

const StatusButton = styled(Button)(({ theme }) => ({
  color: theme.palette.button.primary.foreground,
  backgroundColor: theme.palette.button.secondary.background,
  fontWeight: 500,
  fontSize: '16px',
  fontFamily: 'Manrope',
  width: '100%',
  textTransform: 'none',
  borderRadius: '12px',
  marginTop: '24px',
  padding: '16px'
}))

const AddButton = styled(Button)(({ theme }) => ({
  color: theme.palette.button.primary.foreground,
  backgroundColor: theme.palette.button.primary.background,
  fontWeight: 500,
  fontSize: '16px',
  fontFamily: 'Manrope',
  width: '100%',
  textTransform: 'none',
  borderRadius: '12px',
  marginTop: '24px',
  padding: '16px'
}))

const TextButton = styled(Button)(({ theme }) => ({
  color: theme.palette.button.text.secondary,
  fontWeight: 500,
  fontSize: '16px',
  fontFamily: 'Manrope',
  width: '100%',
  textTransform: 'none',
  borderRadius: '12px',
  marginTop: '24px',
  fontWeight: 'bold'
}))

const mockup_data = {
  partyId: '1234-5678',
  name: 'Monthly Beers',
  avatar: null,
  isPublic: false,
  balance: '450,90',
  leftHours: '12 Hours 30 Min'
}

const mockup_participants = [{
  name: 'Phillip',
  avatar: null
}, {
  name: 'Brandon',
  avatar: null
}, {
  name: 'Julia',
  avatar: null
}, {
  name: 'Dianne',
  avatar: null
}]

const PrivateParty = (props) => {

  const { partyId } = useParams()
  const history = useHistory()

  const [data, setData] = useState(mockup_data)
  const [participants, setParticipants] = useState(mockup_participants)

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <RootBox>
        <Container maxWidth="sm">
          <HeaderBox>
            <WrapBackIcon onClick={() => {history.push('/private-party')}}/>
            <HeaderTitle variant="subtitle1_dark">
              {data.name}
            </HeaderTitle>
            <Box></Box>
          </HeaderBox>
        </Container>
        <ContentBox>
          <Container maxWidth="sm">
            <Content>
              <Typography variant="subtitle2" paddingBottom="8px">
                Total amount
              </Typography>
              <BalanceInfo>
                <Typography variant="h1" paddingRight="8px">
                  ${data.balance}
                </Typography>
                <Typography variant="subtitle5">
                  +3.1% from last month
                </Typography>
              </BalanceInfo>
              <Box marginTop="32px" padding="24px" borderRadius="16px" backgroundColor="#F0EEFE">
                <Grid container spacing={2} >
                  <Grid item xs={8}>
                  <Typography variant="subtitle2">Party closes in</Typography>
                    <Typography variant="subtitle1">{data.leftHours}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                  </Grid>
                </Grid>
              </Box>
              <Box marginTop="24px">
                <Typography variant="subtitle3">Participants</Typography>
              </Box>
              <Stack direction="row" spacing={2} justifyContent="space-between" marginTop="24px">
                <Box>
                  <PartyAvatar alt="A" />
                  <Typography textAlign="center">Me</Typography>
                </Box>
                {
                  participants.map((item, index) => (
                    <Box>
                      <PartyAvatar alt="A" />
                      <Typography textAlign="center">{item.name}</Typography>
                    </Box>
                  ))
                }
              </Stack>
              <StatusButton variant="contained" color="success" >Joined</StatusButton>
              <AddButton variant="contained">Add participants</AddButton>
              <TextButton variant="text" onClick={() => {history.push('/private-party')}}>Leave Party</TextButton>
            </Content>
          </Container>
        </ContentBox>
      </RootBox>
    </motion.div>
  );
}
 
export default PrivateParty;