import React, { useEffect, useState } from "react";
import { Box, Container, Stack, Typography, Button, Grid, Avatar, Badge } from "@mui/material";
import { styled } from '@mui/system';
import { motion } from "framer-motion";
import { pageVariants, pageTransition } from "../../utils/pageTransitions"
import { useParams, useHistory, useLocation } from "react-router";
import { useDispatch, useSelector } from 'react-redux';

import { 
  Add as AddIcon, 
  InfoOutlined as InfoOutlinedIcon,
} from '@mui/icons-material';
import EmptyAccountModal from "components/Modal/EmptyAccountModal";
import { setHeaderTitle, editParty, setBalance, setJoinedParam } from "store/actions/App";
import UserAvatarImage1 from "../../assets/avatar/me.png";
import IncomeIcon from "../../assets/logo/income.png";
import LockIcon from "../../assets/logo/lock.png";
import CameraIcon from "../../assets/logo/camera.png";
import { ArrowRightIcon, QuizIcon, RankingIcon } from "../../assets/logo/icon";

const Content = styled(Box)(({ theme }) => ({
  padding: `${theme.spacing(3)} ${theme.spacing(3)}`
}));

const QuizButton = styled(Button)(({ theme }) => ({
  color: theme.palette.button.primary.foreground,
  backgroundColor: '#15141F',
  fontWeight: 500,
  fontSize: '14px',
  fontFamily: 'Manrope',
  width: '100%',
  textTransform: 'none',
  borderRadius: '12px',
  boxShadow: "none",
  marginTop: '24px',
  padding: '16px 24px',
  display: 'flex',
  justifyContent: 'space-between',
  "&:hover": {
    backgroundColor: '#15141F',
  },
}))

const WithdrawButton = styled(Button)(({ theme }) => ({
  color: "#FB4E4E",
  border: "1px solid #E8E8E8",
  fontWeight: 500,
  fontSize: '16px',
  fontFamily: 'Manrope',
  width: '100%',
  textTransform: 'none',
  borderRadius: '12px',
  boxShadow: "none",
  marginTop: '24px',
  fontWeight: 'bold',
  "&:hover": {
    color: "#FB4E4E",
  },
}))


const GoldButton = styled(Button)(({ theme }) => ({
  backgroundColor: "rgba(255, 188, 31, 0.1)",
  color: "#FFBC1F",
  fontWeight: 300,
  fontSize: '12px',
  fontFamily: 'Manrope',
  width: '90%',
  textTransform: 'none',
  borderRadius: '8px',
  boxShadow: "none",
  fontWeight: 'bold',
  marginTop: '10px'
}))

const UserAvatar = styled(Avatar)(({ theme }) => ({
  width: '85px',
  height: '85px',
  border: "2px dashed #FFBC1F",
  marginBottom: "10px"
}))

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: 'lightgrey',
  width: '30px',
  height: '30px',
}))

const WrapImage = styled(`img`)(({ theme }) => ({
  borderRadius: "16px",
  paddingTop: "5px",
  paddingRight: "10px",
  width: "27px",
  height: "27px"
}));

const WrapBox = styled(Box)(({ theme }) => ({
  marginTop: "10px",
  padding: "20px",
  borderRadius: "16px",
  backgroundColor: "#F5F7FE"
}))

const Profile = (props) => {
  
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()

  const balance = useSelector(state => state.app.balance)

  const [user, setParty] = useState(null)
  const [emptyAccountModalOpen, setEmptyAccountModalOpen] = useState(false)
  

  useEffect(() => {
    if (user) {
      dispatch(setHeaderTitle(user.name))
    }
  }, [user])

  
  const handleAddMoney = () => {
    setEmptyAccountModalOpen(false)
    history.push('/add-funds')
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
          <Box display="flex" paddingBottom="30px" >
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={
                <SmallAvatar alt="camera" src={CameraIcon} />
              }
            >
              <UserAvatar src={UserAvatarImage1} alt="ME"/>
            </Badge>
            
            <Box display="" alignItems="center" padding="10px" marginLeft="20px">
              <Typography variant="subtitle1" >
                Daniel Travis
              </Typography>
              <GoldButton endIcon={<RankingIcon/>}> Member Gold </GoldButton>
            </Box>
          </Box>
          <Box >
            <Typography variant="">Overview</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <WrapBox>
                <Grid container spacing={2} >
                    <Grid item xs={12}>
                        <Typography variant="" >Total Balance</Typography>
                        <Box display='flex' marginTop="10px">
                          <WrapImage src={IncomeIcon} alt='' />
                          <Typography variant="subtitle1" >$4500</Typography>
                        </Box>
                        
                    </Grid>
                </Grid>
            </WrapBox>
            <WrapBox>
                <Grid container spacing={2} >
                    <Grid item xs={12}>
                        <Typography variant="">Lock in Parties</Typography>
                        <Box display='flex' marginTop="10px">
                          <WrapImage src={LockIcon} alt='' />
                          <Typography variant="subtitle1" >$4500</Typography>
                        </Box>
                    </Grid>                    
                </Grid>
            </WrapBox>
          </Box>
          <WithdrawButton> Withdraw money </WithdrawButton>
          <QuizButton variant="contained" startIcon={<QuizIcon />} endIcon={<ArrowRightIcon />}>Got any questions for Rand? <br/> Our CS are ready 24/7 to help!</QuizButton>
          <Box marginTop="24px" textAlign="center" fontSize="14px">
            <Typography variant="subtitle2" >You joined Finpay on September 2021. It’s been 1 month since then and our mission is still the same, help you better manage your finance.</Typography>
          </Box>
        </Content>
      </Container>
      
      <EmptyAccountModal
        open={emptyAccountModalOpen}
        handleClose={() => setEmptyAccountModalOpen(false)}
        handleSuccess={() => handleAddMoney()}
      />
      
    </motion.div>
  );
}
 
export default Profile;