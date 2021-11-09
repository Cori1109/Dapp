import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Stack,
  Paper,
  Typography,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";
import BalanceCard from "../../components/BalanceCard";
import { motion } from "framer-motion";
import { pageVariants, pageTransition } from "../../utils/pageTransitions";
import HeaderBar from "../../components/HeaderBar";
import PartiesList from "../../components/PartiesList";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getUserDetails } from "utils/api";
import { useWeb3React } from "@web3-react/core";
import { setBalance } from "store/actions/App";
import { setLockBalance } from "store/actions/App";

const RootBox = styled(Box)`
  padding: "10px";
`;

const WrapBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary_blue,
  color: theme.palette.white,
  borderRadius: "12px",
  padding: "16px 24px",
  fontFamily: "Montserrat Alternative",
  fontWeight: "800",
  lineHeight: "40px",
  fontSize: "25px",
}));

const ContentPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.sub.background,
  boxShadow: "0px 20px 46px rgba(0, 0, 0, 0.1)",
  borderRadius: "16px",
  padding: "14px 17px",
}));

const WrapTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary_gray,
  fontWeight: 800,
  fontSize: "18px",
}));

const ContentHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  paddingBottom: "16px",
}));

const Dashboard = (props) => {
  const history = useHistory();
  // const partyList = useSelector((state) => state.app.partyList);
  // const [loading, setLoading] = useState(false);
  // const timer = React.useRef();
  const [parties, setParties] = useState(null);
  const { account } = useWeb3React();
  const dispatch = useDispatch()
  const havePrize = false;

  const wallet = "0x9FB3ffD52d85656d33CF765Ce4CEEfde25b9B78B"
  useEffect(() => {
    account && getUserDetailsInfo()
  }, [account])

  const getUserDetailsInfo = async () => {
    getUserDetails(wallet)
    .then((res) => {
      setParties(res.privateParties)
      dispatch(setBalance(res.userDetails.balance))
      dispatch(setLockBalance(res.userDetails.staked))
    })
    .catch((error) => {
      console.log(error);
    });
  }

  // useEffect(() => {
  //   if (!loading) {
  //     setLoading(true);
  //     timer.current = window.setTimeout(() => {
  //       setLoading(false);
  //       setParties(partyList);
  //     }, 3000);
  //   }
  // }, []);

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <RootBox>
        <Stack spacing={2}>
          <HeaderBar />
          <BalanceCard />
          <WrapBox>THIS WEEK WIN BIG</WrapBox>
          <ContentPaper>
            <ContentHeader>
              <WrapTypography variant="sm_title">Your parties</WrapTypography>
              <Typography
                variant="sm_content"
                style={{ cursor: "pointer" }}
                onClick={() => history.push("/private-party")}
              >
                See all
              </Typography>
            </ContentHeader>
            <PartiesList list={parties} />
          </ContentPaper>
          
          {havePrize && <ContentPaper>
            <ContentHeader>
              <WrapTypography variant="sm_title">Your prizes</WrapTypography>
            </ContentHeader>
              <Box
              marginTop="13px"
              marginBottom="22px"
              textAlign="center"
              fontSize="25px"
              >
                <Typography variant="sm_content_gray">
                  $0
                </Typography>
              </Box>
          </ContentPaper>
          }
        </Stack>
      </RootBox>
    </motion.div>
  );
};

export default Dashboard;
