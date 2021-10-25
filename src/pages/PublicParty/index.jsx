import React, { useState } from "react";
import { Box, Container, Stack, Typography, Button, Grid, Avatar, Paper } from "@mui/material";
import { styled } from '@mui/system';
import { motion } from "framer-motion";
import { pageVariants, pageTransition } from "../../utils/pageTransitions"
import { Add as AddIcon, InfoOutlined as InfoOutlinedIcon } from '@mui/icons-material';
import PrizeModal from "components/Modal/PrizeModal";

const HeaderBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  padding: theme.spacing(5)
}));

const WrapInfoOutlinedIcon = styled(InfoOutlinedIcon)(({ theme }) => ({
  color: theme.palette.text.secondary,
  cursor: 'pointer'
}));

const ContentPaper = styled(Paper)(({ theme }) => ({
  boxShadow: '0px 20px 46px rgba(0, 0, 0, 0.1)',
  borderRadius: '16px',
  padding: `${theme.spacing(3)} ${theme.spacing(3)} ${theme.spacing(8)} ${theme.spacing(3)}`
}));

const BalanceInfo = styled(Box)(({ theme}) => ({
  display: 'flex',
  alignItems: 'center'
}))

const PartyAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.button.primary.background,
  margin: 'auto'
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
  padding: '16px 24px',
  display: 'flex',
  justifyContent: 'space-between'
}))


const mockup_data = {
  partyId: '1234-5678',
  name: 'Monthly Beers',
  avatar: null,
  isPublic: false,
  balance: '75,691.54',
  leftHours: '12 Hrs 30 Min'
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
}, {
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
}, {
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

const mockup_prize_result = [{
  amount: 2273,
  count: 2
}, {
  amount: 537,
  count: 26
}, {
  amount: 250,
  count: 2356
}]

const PublicParty = (props) => {
  
  const [data, setData] = useState(mockup_data);
  const [participants, setParticipants] = useState(mockup_participants)
  const [prizeResult, setPrizeResult] = useState(mockup_prize_result)
  const [prizeModalOpen, setPrizeModalOpen] = useState(false)

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
            Public Parites
          </Typography>
        </HeaderBox>
        <ContentPaper>
          <Box display="flex" alignItems="center" paddingBottom="8px" >
            <Typography variant="subtitle2" marginRight="8px">
              Expected prize
            </Typography>
            <WrapInfoOutlinedIcon onClick={() => {setPrizeModalOpen(true)}}/>
          </Box>
          <BalanceInfo>
            <Typography variant="h1" paddingRight="8px">
              ${data ? data.balance : 0}
            </Typography>
            <Typography variant="subtitle5">
              +3.1% from last month
            </Typography>
          </BalanceInfo>
          <Box marginTop="32px" padding="24px" borderRadius="16px" backgroundColor="#F0EEFE">
            <Grid container spacing={2} >
              <Grid item xs={8}>
              <Typography variant="subtitle2">Party closes in</Typography>
                <Typography variant="subtitle1">{data ? data.leftHours : ''}</Typography>
              </Grid>
              <Grid item xs={4}>
              </Grid>
            </Grid>
          </Box>
          <Box marginTop="24px" display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="subtitle4">Participants counter</Typography>
            <Typography variant="subtitle4">{participants.length}</Typography>
          </Box>
          <Stack direction="row" spacing={-2} marginTop="24px">
            {
              participants.map((item, index) => (
                <Box key={`participant-${index}`}>
                  <PartyAvatar alt="A" />
                </Box>
              ))
            }
          </Stack>
          <AddButton variant="contained" endIcon={<AddIcon />}>Add Money</AddButton>
          <AddButton variant="contained" endIcon={<AddIcon />}>Share</AddButton>
        </ContentPaper>
      </Container>
      <PrizeModal 
        open={prizeModalOpen}
        handleClose={() => setPrizeModalOpen(false)}
        list={prizeResult}
      />
    </motion.div>
  );
}
 
export default PublicParty;