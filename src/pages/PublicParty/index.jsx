import React, { useState } from "react";
import { Box, Container, Stack, Typography, Button, Grid, Avatar, Paper } from "@mui/material";
import { styled } from '@mui/system';
import { motion } from "framer-motion";
import { pageVariants, pageTransition } from "../../utils/pageTransitions"
import { Add as AddIcon, InfoOutlined as InfoOutlinedIcon } from '@mui/icons-material';
import PrizeModal from "components/Modal/PrizeModal";
import { useDispatch, useSelector } from "react-redux";
import { setBalance, editParty, setJoinedParam } from "store/actions/App";
import { useLocation, useHistory } from "react-router";
import DepositModal from "components/Modal/DepositModal";
import EmptyAccountModal from "components/Modal/EmptyAccountModal";
import StatusButton from "components/Button/StatusButton";
import { getFormatDate } from "utils/functions";
import PartyInfo from "components/PartyInfo";
import ShareFriendsModal from "components/Modal/ShareFriendsModal";
import LeavePartyModal from "components/Modal/LeavePartyModal";
import UserAvatarImage1 from "../../assets/avatar/me.png";
import UserAvatarImage2 from "../../assets/avatar/Brandon.png";
import UserAvatarImage3 from "../../assets/avatar/Julia.png";
import UserAvatarImage4 from "../../assets/avatar/Phillip.png";
import UserAvatarImage5 from "../../assets/avatar/Dianne.png";

const prizeResult = [{
  amount: 2273,
  count: 2
}, {
  amount: 537,
  count: 26
}, {
  amount: 250,
  count: 2356
}]

const participants = [{
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
},{
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
},{
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

const BalanceInfo = styled(Box)(({ theme }) => ({
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
  boxShadow: "none",
  borderRadius: '12px',
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
  fontFamily: 'Manrope',
  width: '100%',
  textTransform: 'none',
  boxShadow: "none",
  borderRadius: '12px',
  marginTop: '24px',
  fontWeight: 'bold',
  "&:hover": {
    color: theme.palette.button.text.secondary,
    boxShadow: "none"
  },
}))

const PublicParty = (props) => {
  const data = useSelector(state => state.app.partyList[2])
  const balance = useSelector(state => state.app.balance)
  const location = useLocation()
  const history = useHistory()
  const [prizeModalOpen, setPrizeModalOpen] = useState(false)
  const [joinModalOpen, setJoinModalOpen] = useState(false)
  const [shareModalOpen, setShareModalOpen] = useState(false)
  const [leaveModalOpen, setLeaveModalOpen] = useState(false)
  const [emptyAccountModalOpen, setEmptyAccountModalOpen] = useState(false)
  const dispatch = useDispatch()

  const handleJoinParty = (price) => {
    setJoinModalOpen(false)
    
    let _data = JSON.parse(JSON.stringify(data))
    _data.status = 'joined'
    dispatch(editParty(_data))
    dispatch(setBalance(balance - price))
    dispatch(setJoinedParam({
      price: price,
      party_name: data.name,
      back_url: location.pathname
    }))
    history.push('/joined-success')
  }

  const handleAddMoney = () => {
    setEmptyAccountModalOpen(false)
    history.push('/add-funds')
  }

  const handleLeaveParty = () => {
    setLeaveModalOpen(false)
    
    let _data = JSON.parse(JSON.stringify(data))
    _data.status = 'opened'
    dispatch(editParty(_data))
    // history.goBack()
  }

  const handleClickPartyStatus = (item) => {
    if (item && item.status == "opened") {
      if (balance !== 0)
        setJoinModalOpen(true)
      else
        setEmptyAccountModalOpen(true)
    }
  }

  const handleOpenShareModal = () => {
    setShareModalOpen(true);
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
            <WrapInfoOutlinedIcon onClick={() => { setPrizeModalOpen(true) }} />
          </Box>
          <PartyInfo party={data} />
          <Box marginTop="24px" display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="subtitle4">Participants counter</Typography>
            <Typography variant="subtitle4">{participants.length}</Typography>
          </Box>
          <Stack direction="row" spacing={-2} marginTop="24px">
            {
              participants.map((item, index) => (
                <Box key={`participant-${index}`}>
                  <PartyAvatar alt="A" src={item.avatar}/>
                </Box>
              ))
            }
          </Stack>
          <StatusButton status={data ? data.status : 'opened'} handleClick={() => handleClickPartyStatus(data)}/>
          <AddButton variant="contained" endIcon={<AddIcon />} onClick = {() => handleOpenShareModal()}>Share</AddButton>
        </ContentPaper>
        {data.status == 'joined' && (<TextButton variant="text" onClick={() => handleOpenLeaveModal()}>Leave Party</TextButton>)}
        
      </Container>
      <PrizeModal
        open={prizeModalOpen}
        handleClose={() => setPrizeModalOpen(false)}
        list={prizeResult}
      />
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

      <ShareFriendsModal
        open={shareModalOpen}
        handleClose={() => setShareModalOpen(false)}
      />

      <LeavePartyModal
        open={leaveModalOpen}
        handleClose={() => setLeaveModalOpen(false)}
        handleSuccess={() => handleLeaveParty()}
      />
    </motion.div>
  );
}

export default PublicParty;