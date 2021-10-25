import React, { useEffect, useState } from "react";
import { Box, Container, Typography, Button } from "@mui/material"
import { styled } from '@mui/system';
import { motion } from "framer-motion";
import { pageVariants, pageTransition } from "../../utils/pageTransitions"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router"
import BalanceSelector from "components/BalanceSelector";
import PaymentMethodSelector from "components/PaymentMethodSelector";
import { setHeaderTitle } from "store/actions/App";

const HeaderBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  paddingBottom: theme.spacing(4)
}));

const AddButton = styled(Button)(({ theme }) => ({
  color: theme.palette.button.primary.foreground,
  backgroundColor: theme.palette.button.primary.background,
  fontWeight: 500,
  fontSize: '16px',
  fontFamily: 'Manrope',
  width: '100%',
  textTransform: 'none',
  borderRadius: '12px',
  marginTop: '100px',
  padding: '16px 24px',
  display: 'flex',
  justifyContent: 'center',
}))

const AddFunds = (props) => {
  const dispatch = useDispatch()
  
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [step, setStep] = useState(0);

  useEffect(() => {
    dispatch(setHeaderTitle('Add funds'))
  }, [])

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
          <Typography variant="subtitle3" textAlign="center" marginTop="32px">
            How do you want to add funds?
          </Typography>
        </HeaderBox>
        <Box marginBottom="56px">
        {
          step == 0 ?
            <PaymentMethodSelector />
          :
            <></>
        }
        </Box>
        <BalanceSelector
          max={-1}
          balance={selectedAmount}
          setBalance={setSelectedAmount}
        />
        {/* <AddButton variant="contained" onClick={() => {}}>Continue</AddButton> */}
      </Container>
    </motion.div>
  );
}
 
export default AddFunds;