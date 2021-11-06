import React, { useEffect, useState } from "react";
import { Box, Container, Stack, Typography, Button, Grid, Avatar } from "@mui/material";
import { styled } from '@mui/system';
import { motion } from "framer-motion";
import { pageVariants, pageTransition } from "../../../utils/pageTransitions"
import { useParams, useHistory, useLocation } from "react-router";
import { useDispatch, useSelector } from 'react-redux';

import { 
  Add as AddIcon, 
  InfoOutlined as InfoOutlinedIcon, 
  CheckCircleOutline as CheckCircleOutlineIcon,
} from '@mui/icons-material';
// import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import StatusButton from "../../../components/Button/StatusButton";
import DepositModal from "../../../components/Modal/DepositModal";
import EmptyAccountModal from "components/Modal/EmptyAccountModal";
import { setHeaderTitle, editParty, setBalance, setJoinedParam } from "store/actions/App";
import PartyInfo from "../../../components/PartyInfo";
import LeavePartyModal from "components/Modal/LeavePartyModal";
import UserAvatarImage1 from "../../../assets/avatar/me.png";
import UserAvatarImage2 from "../../../assets/avatar/Brandon.png";
import UserAvatarImage3 from "../../../assets/avatar/Julia.png";
import UserAvatarImage4 from "../../../assets/avatar/Phillip.png";
import UserAvatarImage5 from "../../../assets/avatar/Dianne.png";
import PrimaryButton from "components/Button/PrimaryButton";

const Content = styled(Box)(({ theme }) => ({
  padding: `${theme.spacing(3)} ${theme.spacing(3)}`
}));

const PartyAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.button.primary.background,
  margin: 'auto'
}))

const WrapTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary_gray,
  lineHeight: '0'
}))

const AddButton = styled(Button)(({ theme }) => ({
  color: theme.palette.button.primary.foreground,
  backgroundColor: theme.palette.button.primary.background,
  fontWeight: 500,
  fontSize: '16px',
  fontFamily: 'Overpass',
  width: '100%',
  textTransform: 'none',
  borderRadius: '12px',
  boxShadow: "none",
  marginTop: '24px',
  padding: '16px 24px',
  display: 'flex',
  justifyContent: 'space-between',
  "&:hover": {
    color: theme.palette.button.primary.foreground,
    backgroundColor: theme.palette.button.primary.background,
    boxShadow: "none"
  },
}))

const TextButton = styled(Button)(({ theme }) => ({
  color: theme.palette.button.text.secondary,
  fontWeight: 500,
  fontSize: '16px',
  fontFamily: 'Overpass',
  width: '100%',
  textTransform: 'none',
  borderRadius: '12px',
  boxShadow: "none",
  marginTop: '24px',
  fontWeight: 'bold',
  "&:hover": {
    color: theme.palette.button.text.secondary,
    boxShadow: "none"
  },
}))

const WrapInfoOutlinedIcon = styled(InfoOutlinedIcon)(({ theme }) => ({
  color: theme.palette.secondary_gray,
  width: "19px",
  height: "19px",
  cursor: 'pointer',
  marginLeft: "8px"
}));

const mockup_participants = [{
  name: 'Phillip',
  avatar: UserAvatarImage4
}, {
  name: 'Brandon',
  avatar: UserAvatarImage2
}, {
  name: 'Julia',
  avatar: UserAvatarImage3
}, {
  name: 'Dianne',
  avatar: UserAvatarImage5
}]


const PrivateParty = (props) => {
  const { partyId } = useParams()

  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()

  const isJoin = location.search ? true : false

  const partyList = useSelector(state => state.app.partyList)
  const balance = useSelector(state => state.app.balance)

  const [party, setParty] = useState(null)
  const [participants, setParticipants] = useState(mockup_participants)
  const [joinModalOpen, setJoinModalOpen] = useState(isJoin)
  const [emptyAccountModalOpen, setEmptyAccountModalOpen] = useState(false)
  const [leaveModalOpen, setLeaveModalOpen] = useState(false)


  const getParty = (_party) => {
    return _party.partyId == partyId;
  }

  useEffect(() => {
    setParty(partyList.find(getParty))
  }, [partyId, partyList])

  useEffect(() => {
    if (party) {
      dispatch(setHeaderTitle(party.name))
    }
  }, [party])

  const handleClickPartyStatus = (item) => {
    if (item && item.status == "Opened") {
      if (balance !== 0)
        setJoinModalOpen(true)
      else
        setEmptyAccountModalOpen(true)
    }
  }

  const handleJoinParty = (price) => {
    setJoinModalOpen(false)
    
    let _party = JSON.parse(JSON.stringify(party))
    _party.status = 'Joined'
    dispatch(editParty(_party))
    dispatch(setBalance(balance - price))
    dispatch(setJoinedParam({
      price: price,
      party_name: party.name,
      back_url: location.pathname
    }))
    history.push('/joined-success')
  }

  const handleLeaveParty = () => {
    setLeaveModalOpen(false)
    
    let _data = JSON.parse(JSON.stringify(party))
    _data.status = 'Opened'
    dispatch(editParty(_data))
    setParty(_data)
    // history.goBack()
  }

  const handleAddMoney = () => {
    setEmptyAccountModalOpen(false)
    history.push('/add-funds')
  }

  const handleOpenLeaveModal = () => {
    setLeaveModalOpen(true);
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
            <WrapTypography variant="sm_title">
              Total amount
            </WrapTypography>
            <WrapInfoOutlinedIcon/>
          </Box>
          <PartyInfo party={party}/>
          <Box marginTop="27px">
            <Typography variant="sm_title">Participants</Typography>
          </Box>
          <Stack direction="row" spacing={2} justifyContent="space-between" marginTop="24px" marginBottom="45px">
            <Box>
              <PartyAvatar alt="A" src={UserAvatarImage1}/>
              <Typography variant="ss_content" textAlign="center">Me</Typography>
            </Box>
            {
              participants.map((item, index) => (
                <Box key={`participants-${index}`}>
                  <PartyAvatar alt="A" src={item.avatar}/>
                  <Typography variant="ss_content" textAlign="center">{item.name}</Typography>
                </Box>
              ))
            }
          </Stack>
          <PrimaryButton variant="contained" style={{justifyContent: "space-between", backgroundColor: "#3F51B5", marginBottom: "26px"}} endIcon={<CheckCircleOutlineIcon />} onClick={() => handleClickPartyStatus(party)} text={party ? party.status : 'Opened'} />
          <PrimaryButton variant="contained" style={{justifyContent: "space-between"}} endIcon={<AddIcon />} text="Add participants" />
          {party && party.status == 'Joined' && (<TextButton variant="text" onClick={() => handleOpenLeaveModal()}>Leave Party</TextButton>)}

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
      <LeavePartyModal
        open={leaveModalOpen}
        handleClose={() => setLeaveModalOpen(false)}
        handleSuccess={() => handleLeaveParty()}
      />
    </motion.div>
  );
}
 
export default PrivateParty;