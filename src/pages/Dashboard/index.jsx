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
import { setPartyList } from "store/actions/App";
import bannerImage from '../../assets/img/banner3.png'

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

const WrapBoxBanner = styled(Box)(({ theme }) => ({
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

const ContentImage = styled(`img`)(({ theme }) => ({
  borderRadius: '12px',
  width: '100%'
}))

const Dashboard = (props) => {
  const history = useHistory();
  const partyList = useSelector((state) => state.app.partyList);
  // const [loading, setLoading] = useState(false);
  // const [parties, setParties] = useState(null);
  const havePrize = false;

  const isDemo = useSelector((state) => state.app.isDemo);
  const partyListDemo = useSelector((state) => state.app.partyListDemo);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isDemo) {
      dispatch(setPartyList(partyListDemo));
      dispatch(setBalance(1000));
    }
  }, [])


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
          {/*<WrapBox>THIS WEEK WIN BIG</WrapBox>*/}
          <WrapBoxBanner>
            <ContentImage src={bannerImage} />
          </WrapBoxBanner>
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
            <PartiesList list={partyList} />
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
