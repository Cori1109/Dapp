import React, { useEffect, useState } from "react";
import { Box, Container, Button, Avatar, Stack } from "@mui/material";
import { styled } from '@mui/system';
import { motion } from "framer-motion";
import { pageVariants, pageTransition } from "../../../utils/pageTransitions"
import { useHistory } from "react-router";
import { useDispatch } from 'react-redux';

import { 
  AccountBalanceOutlined as PartyIcon,
  PeopleOutline as CountIcon,
  AttachMoney as DepositIcon,
  Timer as TimerIcon
} from '@mui/icons-material';

import { setHeaderTitle } from "store/actions/App";
import MyAvatar from "assets/avatar/me.png";
import InputBox from "components/InputBox";
import { setNotificationData } from "store/actions/App";
import moment from "moment";
import { createParty } from "utils/api";

const Content = styled(Box)(({ theme }) => ({
  padding: `${theme.spacing(3)} ${theme.spacing(3)}`
}));

const PartyAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: 'lightgrey',
  margin: 'auto',
  width: '100px',
  height: '100px',
}))

const AddButton = styled(Button)(({ theme }) => ({
  color: theme.palette.button.primary.foreground,
  backgroundColor: theme.palette.button.primary.background,
  boxShadow: "none",
  fontWeight: 500,
  fontSize: '16px',
  fontFamily: 'Overpass',
  width: '100%',
  textTransform: 'none',
  borderRadius: '12px',
  marginTop: '24px',
  padding: '16px 24px',
  display: 'flex',
  justifyContent: 'center',
  "&:hover": {
    color: theme.palette.button.primary.foreground,
    backgroundColor: theme.palette.button.primary.background,
    boxShadow: "none"
  },
}))

const PrivatePartyCreator = (props) => {
  const history = useHistory()
  const dispatch = useDispatch()

  const wallet = "0x9FB3ffD52d85656d33CF765Ce4CEEfde25b9B78B"

  const [party, setParty] = useState({
    name: '',
    participantCount: '',
    maxDepositAmount: '',
    duration: '',
    balance: '0',
    status: 'Opened'
  })

  const [validated, setValidated] = useState({
    name: true,
    participantCount: true,
    maxDepositAmount: true,
    duration: true
  })

  const [ableValidate, setAbleValidate] = useState(false)
   
  useEffect(() => {
      dispatch(setHeaderTitle('Party creator'))
  }, [])

  const createPrivateParty = async (party) => {
    createParty(party.name, wallet, party.maxDepositAmount, party.participantCount, party.duration)
    .then((res) => {
      dispatch(setNotificationData({
        message: `Successfully Party created.`,
        variant: 'success',
        open: true
      }))
      const partyId = res.id
      // dispatch(createParty({
      //   ...party, 
      //   partyId: partyId,
      //   endDate: moment(new Date()).add(party.duration * 1000 * 3600 * 24)
      // }))
      history.push({
        pathname: `/private-party/${partyId}`,
        search: '?join'
      })
      console.log(res)
    })
    .catch((error) => {
      console.log(error)
    });
  }

  const onInputChange = (id, value) => {
    setParty({...party, [id]: value})

    if (ableValidate) {
      setValidated({
        ...validated,
        [id]: value.length != 0
      })
    }
  }

  const handleCreate = () => {
    setAbleValidate(true)
    const _partyValidate = {
      name: party.name.length != 0,
      participantCount: party.participantCount.length != 0, 
      maxDepositAmount: party.maxDepositAmount.length != 0,
      duration: party.duration.length != 0
    }
    setValidated({
      ...validated,
      ..._partyValidate
    })

    if (_partyValidate.name && _partyValidate.participantCount && _partyValidate.maxDepositAmount && _partyValidate.duration) {
      createPrivateParty(party)      
    } else {
      dispatch(setNotificationData({
        message: `Please input all fields`,
        variant: 'error',
        open: true
      }))
    }
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
          <Box display="flex" alignItems="center" paddingBottom="40px" >
            <PartyAvatar src={MyAvatar} alt="ME"/>
          </Box>
          <Stack direction="column" spacing={2}>
            <InputBox id='name' type={'text'} startIcon={<PartyIcon/>} value={party.name} placeholder='Title of your party' onChange={onInputChange} validated={validated.name}/>
            <InputBox id='participantCount' type={'number'} startIcon={<CountIcon/>} value={party.participantCount} placeholder='Number of participants' onChange={onInputChange} validated={validated.participantCount}/>
            <InputBox id='maxDepositAmount' type={'number'} startIcon={<DepositIcon/>} value={party.maxDepositAmount} placeholder='Max deposit per participant' onChange={onInputChange} validated={validated.maxDepositAmount}/>
            <InputBox id='duration' type={'number'} startIcon={<TimerIcon/>} endText='days' value={party.duration} placeholder='Duration' onChange={onInputChange} validated={validated.duration}/>
          </Stack>
          <AddButton variant="contained" onClick={handleCreate}>Create</AddButton>
        </Content>
      </Container>
    </motion.div>
  );
}
 
export default PrivatePartyCreator;