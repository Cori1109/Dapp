import React, { useEffect, useState } from "react";
import { Box, Container, Button, Avatar, Stack } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import { styled } from '@mui/system';
import { motion } from "framer-motion";
import { pageVariants, pageTransition } from "../../../utils/pageTransitions"
import { useHistory } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import { useWeb3React } from "@web3-react/core";

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
import { createPrivateParty } from "utils/api";
import { createParty } from "store/actions/App";

const Content = styled(Box)(({ theme }) => ({
  padding: `${theme.spacing(3)} ${theme.spacing(3)}`
}));

const PartyAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: 'lightgrey',
  margin: 'auto',
  width: '100px',
  height: '100px',
}))

const WrapButton = styled(LoadingButton)(({ theme }) => ({
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
  // "&:hover": {
  //   color: theme.palette.button.primary.foreground,
  //   backgroundColor: theme.palette.button.primary.background,
  //   boxShadow: "none"
  // },
}))

const PrivatePartyCreator = (props) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  const isDemo = useSelector((state) => state.app.isDemo);


  //const wallet = "0x9FB3ffD52d85656d33CF765Ce4CEEfde25b9B78B"
  const { account } = useWeb3React();
  const wallet = account;

  const [party, setParty] = useState({
    name: '',
    currentParticipants: 0,
    maxDeposit: '',
    duration: '',
    balance: '0',
    state: 'open'
  })

  const [validated, setValidated] = useState({
    name: true,
    participants: true,
    maxDeposit: true,
    duration: true
  })

  const [ableValidate, setAbleValidate] = useState(false)
   
  useEffect(() => {
      dispatch(setHeaderTitle('Party creator'))
  }, [])

  const handlecreatePrivateParty = async (party) => {
    if (!isDemo) {
      createPrivateParty(party.name, wallet, party.maxDeposit, party.participants, party.duration)
      .then((res) => {
        console.log(res)
        if (res.success) {
          setLoading(false)
  
          dispatch(setNotificationData({
            message: `Successfully Party created.`,
            variant: 'success',
            open: true
          }))
          // const partyId = Math.random().toString();
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
        } else {
          setLoading(false)
  
          dispatch(setNotificationData({
            message: res.message? res.message : 'error',
            variant: 'error',
            open: true
          }));
        }      
      })
      .catch((error) => {
        setLoading(false)
        console.log(error)
      });
    } else {
      setLoading(false)  
      dispatch(setNotificationData({
        message: `Successfully Party created.`,
        variant: 'success',
        open: true
      }))
      let partyId = `${parseInt(Math.random() * 10000).toString()}-${parseInt(Math.random() * 10000).toString()}`
      dispatch(createParty({
        ...party,
        _id: partyId,
        endDate: moment(new Date()).add(party.duration * 1000 * 3600 * 24)
      }))
      history.push({
        pathname: `/private-party/${partyId}`,
        search: '?join'
      })
    }
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
    setLoading(true)
    setAbleValidate(true)
    const _partyValidate = {
      name: party.name.length != 0,
      participants: party.participants.length != 0, 
      maxDeposit: party.maxDeposit.length != 0,
      duration: party.duration.length != 0
    }
    setValidated({
      ...validated,
      ..._partyValidate
    })

    if (_partyValidate.name && _partyValidate.participants && _partyValidate.maxDeposit && _partyValidate.duration) {
      handlecreatePrivateParty(party)
    } else {
      dispatch(setNotificationData({
        message: `Please input all fields`,
        variant: 'error',
        open: true
      }))
      setLoading(false)
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
            <InputBox id='participants' type={'number'} startIcon={<CountIcon/>} value={party.participants} placeholder='Number of participants' onChange={onInputChange} validated={validated.participants}/>
            <InputBox id='maxDeposit' type={'number'} startIcon={<DepositIcon/>} value={party.maxDeposit} placeholder='Max deposit per participant' onChange={onInputChange} validated={validated.maxDeposit}/>
            <InputBox id='duration' type={'number'} startIcon={<TimerIcon/>} endText='days' value={party.duration} placeholder='Duration' onChange={onInputChange} validated={validated.duration}/>
          </Stack>
          <WrapButton
            onClick={handleCreate}
            loading={loading}
            loadingPosition="end"
            variant="contained"
          >
            Create
          </WrapButton>
        </Content>
      </Container>
    </motion.div>
  );
}
 
export default PrivatePartyCreator;