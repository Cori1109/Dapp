import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Stack,
  Typography,
  Button,
  Grid,
  Avatar,
  Paper,
} from "@mui/material";
import { styled } from "@mui/system";
import { motion } from "framer-motion";
import { pageVariants, pageTransition } from "../../utils/pageTransitions";
import {
  Add as AddIcon,
  InfoOutlined as InfoOutlinedIcon,
} from "@mui/icons-material";
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
import PrimaryButton from "components/Button/PrimaryButton";
import { changePartyAmount, getPublicParty } from "utils/api";
import { setNotificationData } from "store/actions/App";
import { useWeb3React } from "@web3-react/core";
import { setLoading } from "store/actions/App";


const participants = [
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

const WrapTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary_gray,
  lineHeight: "0",
}));

const WrapContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(0),
}));

const HeaderBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  padding: theme.spacing(5),
}));

const WrapInfoOutlinedIcon = styled(InfoOutlinedIcon)(({ theme }) => ({
  color: theme.palette.secondary_gray,
  width: "19px",
  height: "19px",
  cursor: "pointer",
  marginLeft: "8px",
}));

const ContentPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.sub.background,
  boxShadow: "0px 20px 46px rgba(0, 0, 0, 0.1)",
  borderRadius: "16px",
  padding: `${theme.spacing(3)} ${theme.spacing(3)} ${theme.spacing(
    8
  )} ${theme.spacing(3)}`,
}));

const BalanceInfo = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
}));

const PartyAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.button.primary.background,
  margin: "auto",
}));

const TextButton = styled(Button)(({ theme }) => ({
  color: theme.palette.button.text.secondary,
  fontWeight: 500,
  fontSize: "16px",
  fontFamily: "Overpass",
  width: "100%",
  textTransform: "none",
  boxShadow: "none",
  borderRadius: "12px",
  marginTop: "24px",
  marginBottom: "50px",
  fontWeight: "bold",
  "&:hover": {
    color: theme.palette.button.text.secondary,
    boxShadow: "none",
  },
}));

const PublicParty = (props) => {
  // const data = useSelector(state => state.app.partyList[2])
  const [data, setData] = useState(null);
  const [prizeDistribution, setPrizeDistribution] = useState([]);
  const balance = useSelector((state) => state.app.balance);
  const joinedParam = useSelector((state) => state.app.joinedParam);
  const location = useLocation();
  const history = useHistory();
  const [prizeModalOpen, setPrizeModalOpen] = useState(false);
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [leaveModalOpen, setLeaveModalOpen] = useState(false);
  const [emptyAccountModalOpen, setEmptyAccountModalOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    getPublicPartyInfo();
  }, []);

  const getPublicPartyInfo = async () => {
    getPublicParty()
      .then((res) => {
        dispatch(setLoading(false));
        let _data = { ...res };
        setData(_data);
        let _prizeDistribution = [
          _data.prizeDistribution.tier1,
          _data.prizeDistribution.tier2,
          _data.prizeDistribution.tier3,
        ];
        setPrizeDistribution(_prizeDistribution);
      })
      .catch((error) => {
        dispatch(setLoading(false));
        console.log(error);
      });
  };

  //const wallet = "0x9FB3ffD52d85656d33CF765Ce4CEEfde25b9B78B";
  const { account } = useWeb3React();
  const wallet = account;
  
  const handlePartyAmount = async (price) => {
    changePartyAmount(wallet, price, data.partyId)
      .then((res) => {
        console.log(res);
        if (res.success) {
          if (joinModalOpen) {
            setJoinModalOpen(false);
            // let _data = JSON.parse(JSON.stringify(data))
            // _data.state = 'joined'
            // dispatch(editParty(_data))
            dispatch(setBalance(balance - price));
            let _joinedParam = {
              price: price,
              party_name: data.name,
              party_id: data.partyId,
              back_url: location.pathname,
              state: "joined",
            };
            dispatch(setJoinedParam(_joinedParam));
            console.log(_joinedParam);
            history.push("/joined-success");
          } else {
            setLeaveModalOpen(false);
            // let _data = JSON.parse(JSON.stringify(data))
            // _data.state = 'open'
            // dispatch(editParty(_data))
            dispatch(
              setJoinedParam({
                price: joinedParam.price,
                party_name: data.name,
                party_id: data.partyId,
                back_url: location.pathname,
                state: "open",
              })
            );
          }
        } else {
          dispatch(setNotificationData({
            message: res.message? res.message : 'error',
            variant: 'error',
            open: true
          }));
        }
        
      })
      .catch((error) => {
        console.log(error);
        dispatch(setNotificationData({
          message: error.message,
          variant: 'error',
          open: true
        }));
      });
  };

  const handleJoinParty = (price) => {
    handlePartyAmount(price);
  };

  const handleAddMoney = () => {
    setEmptyAccountModalOpen(false);
    history.push("/add-funds");
  };

  const handleLeaveParty = () => {
    handlePartyAmount(-joinedParam.price);
  };

  const handleClickPartyStatus = (item) => {
    console.log(item);
    if (item && item.state == "open") {
      if (balance !== 0) setJoinModalOpen(true);
      else setEmptyAccountModalOpen(true);
    }
  };

  const handleOpenShareModal = () => {
    setShareModalOpen(true);
  };

  const handleOpenLeaveModal = () => {
    setLeaveModalOpen(true);
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <WrapContainer maxWidth="sm">
        <HeaderBox>
          <WrapTypography variant="md_title">Public Parties</WrapTypography>
        </HeaderBox>
        <ContentPaper>
          <Typography variant="md_content" marginBottom="12px">
            {data && data.name}
          </Typography>
          <Box display="flex" alignItems="center" paddingBottom="8px">
            <Typography variant="sm_title" marginRight="8px">
              Expected prize
            </Typography>
            <WrapInfoOutlinedIcon
              onClick={() => {
                setPrizeModalOpen(true);
              }}
            />
          </Box>
          <PartyInfo party={data} />
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            marginTop="27px"
            marginBottom="19px"
          >
            <Typography variant="sm_title">Participants counter</Typography>
            <Typography variant="sm_title">
              {data && data.participants}
            </Typography>
          </Box>
          <Stack direction="row" spacing={-2}>
            {participants.map((item, index) => (
              <Box key={`participant-${index}`}>
                <PartyAvatar alt="A" src={item.avatar} />
              </Box>
            ))}
          </Stack>
          {/* <StatusButton status={data ? data.state : 'open'} handleClick={() => handleClickPartyStatus(data)}/> */}
          <StatusButton
            status={joinedParam ? joinedParam.state : "open"}
            handleClick={() => handleClickPartyStatus(joinedParam)}
          />
          <PrimaryButton
            variant="contained"
            style={{ justifyContent: "space-between", marginTop: "23px" }}
            endIcon={<AddIcon />}
            onClick={() => handleOpenShareModal()}
            text="Share"
          />
        </ContentPaper>
        {/* {data && data.state == 'joined' && (<TextButton variant="text" onClick={() => handleOpenLeaveModal()}>Leave Party</TextButton>)} */}
        {joinedParam && joinedParam.state == "joined" && (
          <TextButton variant="text" onClick={() => handleOpenLeaveModal()}>
            Leave Party
          </TextButton>
        )}
      </WrapContainer>
      <PrizeModal
        open={prizeModalOpen}
        handleClose={() => setPrizeModalOpen(false)}
        list={prizeDistribution}
      />
      <DepositModal
        open={joinModalOpen}
        balance={balance}
        handleClose={() => setJoinModalOpen(false)}
        handleSuccess={(amount) => handleJoinParty(amount)}
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
};

export default PublicParty;