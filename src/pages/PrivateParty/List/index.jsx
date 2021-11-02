import React from "react";
import { Box, Container, Stack, Paper, Typography, Button } from "@mui/material";
import { styled } from '@mui/system';
import { motion } from "framer-motion";
import { pageVariants, pageTransition } from "../../../utils/pageTransitions"
import parivatePartyImage from '../../../assets/landing/private-party.png'
import PartiesList from '../../../components/PartiesList'
import { useSelector} from 'react-redux'
import { useHistory } from "react-router";

const HeaderBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  padding: theme.spacing(5)
}));

const ContentPaper = styled(Paper)(({ theme }) => ({
  boxShadow: '0px 20px 46px rgba(0, 0, 0, 0.1)',
  borderRadius: '16px',
  padding: theme.spacing(3)
}));

const ContentHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const PrimaryButton = styled(Button)(({ theme }) => ({
  color: theme.palette.button.text.foreground,
  fontWeight: 500,
  boxShadow: "none",
  fontSize: '16px',
}))

const ContentImage = styled(`img`)(({ theme }) => ({
  borderRadius: '16px',
  width: 'calc(100% - 16px)',
  padding: `${theme.spacing(2)} ${theme.spacing(1)}`
}))

const PrivatePartyList = (props) => {

  const history = useHistory();
  const partyList = useSelector(state => state.app.partyList)

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
      <Container maxWidth="sm">
        <HeaderBox>
          <Typography variant="subtitle1">
            Private Parites
          </Typography>
        </HeaderBox>
        <ContentPaper>
          <ContentHeader>
            <Typography variant="subtitle3">
              Your private parites
            </Typography>
            <PrimaryButton variant="text" onClick={handleCreate}>Create</PrimaryButton>
          </ContentHeader>
          <ContentImage src={parivatePartyImage} />
          <PartiesList list={partyList.filter((item) => {return !item.isPublic})}/>
        </ContentPaper>
      </Container>
    </motion.div>
  );
}
 
export default PrivatePartyList;