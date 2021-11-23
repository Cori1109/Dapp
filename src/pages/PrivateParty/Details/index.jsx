import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Stack,
  Typography,
  Button,
  Grid,
  Avatar,
} from "@mui/material";
import { styled } from "@mui/system";
import { motion } from "framer-motion";
import { pageVariants, pageTransition } from "../../../utils/pageTransitions";
import { useParams, useHistory, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useWeb3React } from "@web3-react/core";

import {
  Add as AddIcon,
  InfoOutlined as InfoOutlinedIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
} from "@mui/icons-material";
// import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import StatusButton from "../../../components/Button/StatusButton";
import DepositModal from "../../../components/Modal/DepositModal";
import EmptyAccountModal from "components/Modal/EmptyAccountModal";
import {
  setHeaderTitle,
  editParty,
  setBalance,
  setJoinedParam,
} from "store/actions/App";
import PartyInfo from "../../../components/PartyInfo";
import LeavePartyModal from "components/Modal/LeavePartyModal";
import UserAvatarImage1 from "../../../assets/avatar/me.png";
import UserAvatarImage2 from "../../../assets/avatar/Brandon.png";
import UserAvatarImage3 from "../../../assets/avatar/Julia.png";
import UserAvatarImage4 from "../../../assets/avatar/Phillip.png";
import UserAvatarImage5 from "../../../assets/avatar/Dianne.png";
import PrimaryButton from "components/Button/PrimaryButton";
import ShareFriendsModal from "components/Modal/ShareFriendsModal";
import { changePartyAmount, getPrivatePartyDetails } from "utils/api";
import { setNotificationData } from "store/actions/App";
import { setLoading } from "store/actions/App";
import { getFormatDate } from "utils/functions";
import { setLoadingDeposit } from "store/actions/App";

const Content = styled(Box)(({ theme }) => ({
  padding: `${theme.spacing(3)} ${theme.spacing(3)}`,
}));

const PartyAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.button.primary.background,
  margin: "auto",
}));

const WrapTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary_gray,
  lineHeight: "0",
}));

const AddButton = styled(Button)(({ theme }) => ({
  color: theme.palette.button.primary.foreground,
  backgroundColor: theme.palette.button.primary.background,
  fontWeight: 500,
  fontSize: "16px",
  fontFamily: "Overpass",
  width: "100%",
  textTransform: "none",
  borderRadius: "12px",
  boxShadow: "none",
  marginTop: "24px",
  padding: "16px 24px",
  display: "flex",
  justifyContent: "space-between",
  "&:hover": {
    color: theme.palette.button.primary.foreground,
    backgroundColor: theme.palette.button.primary.background,
    boxShadow: "none",
  },
}));

const TextButton = styled(Button)(({ theme }) => ({
  color: theme.palette.button.text.secondary,
  fontWeight: 500,
  fontSize: "16px",
  fontFamily: "Overpass",
  width: "100%",
  textTransform: "none",
  borderRadius: "12px",
  boxShadow: "none",
  marginTop: "24px",
  fontWeight: "bold",
  "&:hover": {
    color: theme.palette.button.text.secondary,
    boxShadow: "none",
  },
}));

const WrapInfoOutlinedIcon = styled(InfoOutlinedIcon)(({ theme }) => ({
  color: theme.palette.secondary_gray,
  width: "19px",
  height: "19px",
  cursor: "pointer",
  marginLeft: "8px",
}));

const mockup_participants = [
  {
    name: "Phillip",
    avatar: UserAvatarImage4,
  },
  {
    name: "Brandon",
    avatar: UserAvatarImage2,
  },
  {
    name: "Julia",
    avatar: UserAvatarImage3,
  },
  {
    name: "Dianne",
    avatar: UserAvatarImage5,
  },
];

const PrivateParty = (props) => {
  const { partyId } = useParams();

  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const balance = useSelector((state) => state.app.balance);
  const joinedParam = useSelector((state) => state.app.joinedParam);

  const [party, setParty] = useState(null);
  const [participants, setParticipants] = useState(mockup_participants);
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [emptyAccountModalOpen, setEmptyAccountModalOpen] = useState(false);
  const [leaveModalOpen, setLeaveModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const isDemo = useSelector((state) => state.app.isDemo);  
  const partyListDemo = useSelector((state) => state.app.partyListDemo);
  const partyList = useSelector((state) => state.app.partyList);

  useEffect(() => {
    dispatch(setLoading(true));
    getPrivatePartyDetailsInfo();
  }, [partyId]);

  const getParty = (_party) => {
    return _party._id == partyId;
  }

  const getPrivatePartyDetailsInfo = async () => {
    if (!isDemo) {
      getPrivatePartyDetails(partyId)
      .then((res) => {
        let _party = { ...res, expectedPrize: res.amount };
        // _party.endDate = 0;
        // _party.currentParticipants = 2;
        setParty(_party);
        location.search && setJoinModalOpen(true);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
    } else {
      let _party = { ...partyList?.find(getParty), expectedPrize: partyList?.find(getParty).amount };
      setParty(_party)
      dispatch(setBalance(1000));
      location.search && setJoinModalOpen(true);
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (party) {
      dispatch(setHeaderTitle(party.name));
    }
  }, [party]);

  const wallet = "0x9FB3ffD52d85656d33CF765Ce4CEEfde25b9B78B";

  const { account } = useWeb3React();
  // const wallet = account;

  const handlePartyAmount = async (price) => {
    if (!isDemo) {
      changePartyAmount(wallet, price, partyId)
      .then((res) => {
        console.log(res);
        if (res.success) {
          handlePartyAmountResponse(price);
        } else {          
          dispatch(
            setNotificationData({
              message: res.message ? res.message : "error",
              variant: "error",
              open: true,
            })
          );
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setJoinModalOpen(false);
        setLeaveModalOpen(false);
        dispatch(setLoadingDeposit(false));
      });
    } else {
      handlePartyAmountResponse(price);
      setJoinModalOpen(false);
      setLeaveModalOpen(false);
      dispatch(setLoadingDeposit(false));
    }    
  };

  const handlePartyAmountResponse = (price) => {
    if (joinModalOpen) {
      dispatch(setBalance(balance - price));
      dispatch(
        setJoinedParam({
          price: price,
          party_name: party.name,
          back_url: location.pathname,
          state: "joined",
        })
      );
      let _party = JSON.parse(JSON.stringify(party));
      _party.currentParticipants += 1;
      dispatch(editParty(_party));
      history.push("/joined-success");
    } else {
      dispatch(
        setJoinedParam({
          price: joinedParam.price,
          party_name: party.name,
          back_url: location.pathname,
          state: "open",
        })
      );
      let _party = JSON.parse(JSON.stringify(party));
      _party.currentParticipants -= 1;
      dispatch(editParty(_party));
      setParty(_party)
    }
  }

  const handleClickPartyStatus = (item) => {
    dispatch(setLoading(true));
    dispatch(setLoadingDeposit(false));
    getPrivatePartyDetailsInfo();

    if (item && item.state == "open") {
      if (balance !== 0) setJoinModalOpen(true);
      else setEmptyAccountModalOpen(true);
    }
  };

  const handleJoinParty = (price) => {
    handlePartyAmount(price);
  };

  const handleLeaveParty = () => {
    handlePartyAmount(-joinedParam.price);
    // history.goBack()
  };

  const handleAddMoney = () => {
    setEmptyAccountModalOpen(false);
    history.push("/add-funds");
  };

  const handleOpenLeaveModal = () => {
    dispatch(setLoading(true));
    getPrivatePartyDetailsInfo();
    setLeaveModalOpen(true);
  };

  const handleOpenShareModal = () => {
    setShareModalOpen(true);
  };

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
          <Box display="flex" alignItems="center" paddingBottom="8px">
            <WrapTypography variant="sm_title">Total amount</WrapTypography>
            <WrapInfoOutlinedIcon />
          </Box>
          <PartyInfo party={party} />
          <Box marginTop="27px">
            <Typography variant="sm_title">Participants</Typography>
          </Box>

          {party && party.currentParticipants !== 0 ? (
            <Stack
              direction="row"
              spacing={2}
              justifyContent="space-between"
              marginTop="24px"
              marginBottom="45px"
            >
              <Box>
                <PartyAvatar alt="A" src={UserAvatarImage1} />
                <Typography variant="ss_content" textAlign="center">
                  Me
                </Typography>
              </Box>
              {participants.map((item, index) => (
                <Box key={`participants-${index}`}>
                  <PartyAvatar alt="A" src={item.avatar} />
                  <Typography variant="ss_content" textAlign="center">
                    {item.name}
                  </Typography>
                </Box>
              ))}
            </Stack>
          ) : (
            <Stack
              direction="row"
              spacing={2}
              justifyContent="center"
              marginTop="24px"
              marginBottom="45px"
            >
              <Typography variant="ss_content" textAlign="center">
                Waiting for participants to join.
              </Typography>
            </Stack>
          )}
          {party && getFormatDate(party.endDate) == 0 ? (
            <Stack
              direction="row"
              spacing={2}
              justifyContent="center"
              marginTop="24px"
              marginBottom="45px"
            >
              <Typography variant="ss_content" textAlign="center">
                Party ended on {party.endDate}
              </Typography>
            </Stack>
          ) : (
            <>
              <PrimaryButton
                variant="contained"
                style={{
                  justifyContent: "space-between",
                  backgroundColor: "#3F51B5",
                  marginBottom: "26px",
                }}
                endIcon={<CheckCircleOutlineIcon />}
                onClick={() => handleClickPartyStatus(joinedParam)}
                text={joinedParam ? joinedParam.state : "open"}
              />
              <PrimaryButton
                variant="contained"
                style={{ justifyContent: "space-between" }}
                endIcon={<AddIcon />}
                onClick={() => handleOpenShareModal()}
                text="Add participants"
              />
              {joinedParam && joinedParam.state == "joined" && (
                <TextButton
                  variant="text"
                  onClick={() => handleOpenLeaveModal()}
                >
                  Leave Party
                </TextButton>
              )}
            </>
          )}
        </Content>
      </Container>
      <DepositModal
        open={joinModalOpen}
        balance={balance}
        maxDeposit={party && party.maxDeposit}
        handleClose={() => setJoinModalOpen(false)}
        handleSuccess={(price) => handleJoinParty(price)}
        isPrivate={true}
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
      <ShareFriendsModal
        open={shareModalOpen}
        handleClose={() => setShareModalOpen(false)}
      />
    </motion.div>
  );
};

export default PrivateParty;
