import React, { useEffect, useState } from "react";
import { Box, Container, Stack, Paper, Typography, Button } from "@mui/material";
import { styled } from '@mui/system';
import { motion } from "framer-motion";
import { pageVariants, pageTransition } from "../../../utils/pageTransitions"
import parivatePartyImage from '../../../assets/landing/private-party.png'
import PartiesList from '../../../components/PartiesList'
import { useSelector} from 'react-redux'
import { useHistory } from "react-router";
import { useWeb3React } from "@web3-react/core";
import { getUserDetails } from "utils/api";

const WrapContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(0),
}));

const HeaderBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  padding: theme.spacing(5)
}));

const ContentPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.sub.background,
  boxShadow: '0px 20px 46px rgba(0, 0, 0, 0.1)',
  borderRadius: '16px',
  padding: theme.spacing(3)
}));

const ContentHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const WrapTypography = styled(Typography)(({ theme }) => ({
  fontSize: "18px"
}));

const ContentImage = styled(`img`)(({ theme }) => ({
  borderRadius: '16px',
  width: 'calc(100% - 16px)',
  padding: `${theme.spacing(2)} ${theme.spacing(1)}`
}))

const PrivatePartyList = (props) => {

  const history = useHistory();
  // const partyList = useSelector(state => state.app.partyList)
  // const [loading, setLoading] = useState(false);
  // const timer = React.useRef();
  
  const [parties, setParties] = useState(null);
  const { account } = useWeb3React();

  const wallet = "0x9FB3ffD52d85656d33CF765Ce4CEEfde25b9B78B"
  useEffect(() => {
    account && getUserDetailsInfo()
  }, [account])

  const getUserDetailsInfo = async () => {
    getUserDetails(wallet)
    .then((res) => {
      setParties(res.privateParties)
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

  const handleCreate = () => {
    history.push('/private-party/create')
  }

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
          <Typography variant="md_title">
            Private Parites
          </Typography>
        </HeaderBox>
        <ContentPaper>
          <ContentHeader>
            <WrapTypography variant="md_content">
              Your private parites
            </WrapTypography>
            {parties? <Typography variant="sm_content" style={{cursor:"pointer"}} onClick={handleCreate}>Create</Typography> : null}
          </ContentHeader>
          <ContentImage src={parties? parivatePartyImage : null} />
          <PartiesList list={parties? parties.filter((item) => {return !item.isPublic}) : null} isPrivate={true}/>
        </ContentPaper>
      </WrapContainer>
    </motion.div>
  );
}
 
export default PrivatePartyList;