import React, { useEffect, useState } from "react";
import { Box, Container, Stack, Typography, Button, Grid, Avatar } from "@mui/material";
import { styled } from '@mui/system';
import { motion } from "framer-motion";
import { pageVariants, pageTransition } from "../../../utils/pageTransitions"
import { useParams, useHistory, useLocation } from "react-router";
import { useAppContext } from "providers/use-app-context";
import { 
  Add as AddIcon, 
  InfoOutlined as InfoOutlinedIcon, 
} from '@mui/icons-material';
import StatusButton from "../../../components/Button/StatusButton";
import DepositModal from "../../../components/Modal/DepositModal";
import EmptyAccountModal from "components/Modal/EmptyAccountModal";

const Content = styled(Box)(({ theme }) => ({
  padding: `${theme.spacing(3)} ${theme.spacing(3)}`
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

const WrapInfoOutlinedIcon = styled(InfoOutlinedIcon)(({ theme }) => ({
  color: theme.palette.text.secondary,
  cursor: 'pointer'
}));

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
  const location = useLocation()

  const { setHeaderTitle, partyList, setPartyList,  balance, setBalance, setJoinedParam } = useAppContext();

  const [index, setIndex] = useState(-1)
  const [participants, setParticipants] = useState(mockup_participants)
  const [joinModalOpen, setJoinModalOpen] = useState(false)
  const [emptyAccountModalOpen, setEmptyAccountModalOpen] = useState(false)

  const getParty = (_party) => {
    return _party.partyId == partyId;
  }

  useEffect(() => {
    setIndex(partyList.findIndex(getParty))
  }, [partyId])

  useEffect(() => {
    if (index != -1) {
      setHeaderTitle(partyList[index].name)
    }
  }, [index])

  const handleClickPartyStatus = (item) => {
    if (item && item.status == "opened") {
      if (balance != 0)
        setJoinModalOpen(true)
      else
        setEmptyAccountModalOpen(true)
    }
  }

  const handleJoinParty = (price) => {
    setJoinModalOpen(false)
    
    let _partyList = JSON.parse(JSON.stringify(partyList))
    _partyList[index].status = 'joined'
    setPartyList(_partyList)

    setBalance(balance - price)
    setJoinedParam({
      price: price,
      party_name: partyList[index].name,
      back_url: location.pathname
    })
    history.push('/joined-success')
  }

  const handleAddMoney = () => {
    setEmptyAccountModalOpen(false)
    history.push('/add-funds')
  }

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <Container maxWidth="sm">
        <Content>
          <Box display="flex" alignItems="center" paddingBottom="8px" >
            <Typography variant="subtitle2" marginRight="8px" >
              Total amount
            </Typography>
            <WrapInfoOutlinedIcon/>
          </Box>
          <BalanceInfo>
            <Typography variant="h1" paddingRight="8px">
              ${index != -1 ? partyList[index].balance : 0}
            </Typography>
            <Typography variant="subtitle5">
              +3.1% from last month
            </Typography>
          </BalanceInfo>
          <Box marginTop="32px" padding="24px" borderRadius="16px" backgroundColor="#F0EEFE">
            <Grid container spacing={2} >
              <Grid item xs={8}>
              <Typography variant="subtitle2">Party closes in</Typography>
                <Typography variant="subtitle1">{index != -1 ? partyList[index].leftHours : ''}</Typography>
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
          <StatusButton status={index != -1 ? partyList[index].status : 'opened'} handleClick={() => handleClickPartyStatus(partyList[index])}/>
          <AddButton variant="contained" endIcon={<AddIcon />}>Add participants</AddButton>
          <TextButton variant="text" onClick={() => {history.goBack()}}>Leave Party</TextButton>
        </Content>
      </Container>
      <DepositModal 
        open={joinModalOpen}
        balance={balance}
        handleClose={() => setJoinModalOpen(false)}
        handleSuccess={(balance) => handleJoinParty(balance)}
      />
      <EmptyAccountModal
        open={emptyAccountModalOpen}
        handleClose={() => setEmptyAccountModalOpen(false)}
        handleSuccess={() => handleAddMoney()}
      />
    </motion.div>
  );
}
 
export default PrivateParty;