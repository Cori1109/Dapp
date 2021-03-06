import React, { useEffect, useState } from "react";
import { Box, Container, Typography, Button, Divider } from "@mui/material";
import { styled } from "@mui/system";
import { motion } from "framer-motion";
import { pageVariants, pageTransition } from "../../utils/pageTransitions";
import SuccessImage from "../../assets/logo/transfer_success.png";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { setTransferParam } from "store/actions/App";
import { ContentCopy as ContentCopyIcon } from "@mui/icons-material";
import { getAbbreviationAddress, shorttenString } from "utils/functions";
import { setNotificationData } from "store/actions/App";

const WrapContainer = styled(Container)(({ theme }) => ({
  backgroundColor: theme.palette.main.background,
  padding: "0px",
}));

const TopBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.sub.background,
  padding: "20px",
  borderRadius: "0 0 40px 40px",
}));

const ImageBox = styled("Box")(({ theme }) => ({
  paddingTop: theme.spacing(10),
  marginBottom: theme.spacing(0),
  display: "flex",
  justifyContent: "center",
  height: "104px",
  paddingTop: "20px",
}));

const SuccessLogo = styled("img")(({ theme }) => ({
  height: "104px",
  marginTop: "52px",
}));

const WalletImg = styled("img")(({ theme }) => ({
  width: "20px"
}));

const HeaderBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
}));

const ButtonBox = styled(Box)(({ theme }) => ({
  height: "120px",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
}));

const TransferDetailBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.box.background,
  paddingBottom: "200px",
  borderRadius: "0 0 40px 40px",
}));

const PriceBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  padding: "10px 40px 25px 40px",
  marginTop: theme.spacing(0),
}));

const TransactionIdBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  padding: "80px 40px 0px 40px",
  marginTop: theme.spacing(0),
}));

const AddButton = styled(Button)(({ theme }) => ({
  color: theme.palette.button.primary.foreground,
  backgroundColor: theme.palette.button.primary.background,
  fontWeight: 500,
  fontSize: "16px",
  fontFamily: "Overpass",
  width: "156px",
  textTransform: "none",
  boxShadow: "none",
  borderRadius: "12px",
  padding: "16px 24px",
  display: "flex",
  justifyContent: "center",
  "&:hover": {
    color: theme.palette.button.primary.foreground,
    backgroundColor: theme.palette.button.primary.background,
    boxShadow: "none"
  },
}));

const SaveButton = styled(Button)(({ theme }) => ({
  color: theme.palette.button.third.foreground,
  backgroundColor: theme.palette.button.third.background,
  fontWeight: 500,
  fontSize: "16px",
  fontFamily: "Overpass",
  width: "156px",
  textTransform: "none",
  boxShadow: "none",
  borderRadius: "12px",
  padding: "16px 24px",
  display: "flex",
  justifyContent: "center",
  "&:hover": {
    color: theme.palette.button.third.foreground,
    backgroundColor: theme.palette.button.third.background,
    boxShadow: "none",
  },
}));

const TransferSuccess = (props) => {
  const dispatch = useDispatch();
  const [transactionDate, setTransactionDate] = useState("");

  const transferParam = useSelector((state) => state.app.transferParam);

  const history = useHistory();

  useEffect(() => {
    console.log(transferParam);
    if (!transferParam) {
      history.push('/dashboard')
    }

    var today = new Date(Date.now());
    var todayString = today.toDateString();
    setTransactionDate(todayString.substring(4));
    console.log(transactionDate);
  }, [transferParam]);

  const handleClickCopy = (txnHash) => {
    if (txnHash) {
      navigator.clipboard.writeText(txnHash);
      dispatch(
        setNotificationData({
          message: `${txnHash} has been copied!`,
          variant: "success",
          open: true,
        })
      );
    }
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
        <TopBox>
          <HeaderBox>
            <Typography variant="sl_title" textAlign="center" marginTop="32px">
              Transfer Success
            </Typography>
          </HeaderBox>
          <ImageBox>
            <SuccessLogo src={SuccessImage} alt="Success Logo" />
          </ImageBox>
          <TransferDetailBox maxWidth="sm">
            <TransactionIdBox>
              <Typography
                variant="xs_content_gray"
                display="flex"
                alignItems="center"
              >
                <span>
                  {" "}
                  {shorttenString(transferParam?.txnHash) || "loading..."}{" "}
                </span>
                <ContentCopyIcon
                  style={{ paddingLeft: "8px", cursor: "pointer" }}
                  onClick={() => {
                    handleClickCopy(transferParam?.txnHash);
                  }}
                />
              </Typography>
            </TransactionIdBox>
            <PriceBox>
              <Typography variant="sl_title">
                {`${transferParam?.price} ${transferParam?.cryptoInfo?.title}`}
              </Typography>
            </PriceBox>
            <Divider variant="middle" />
            <Box
              display="flex"
              justifyContent="space-between"
              padding="16px 48px"
            >
              <Typography variant="sm_content_gray">Transfer from</Typography>
              <Box display="flex" alignItems="center">
                <WalletImg src={transferParam?.walletInfo.logo} />
                <Typography variant="xs_content_gray">
                  : {getAbbreviationAddress(transferParam?.from)}
                </Typography>
              </Box>
            </Box>
            <Divider variant="middle" />
            <Box
              display="flex"
              justifyContent="space-between"
              padding="16px 48px"
            >
              <Typography variant="sm_content_gray">Transaction Date</Typography>
              <Typography
                variant="xs_content_gray"
                display="flex"
                alignItems="center"
              >
                {transactionDate}
              </Typography>
            </Box>
          </TransferDetailBox>
        </TopBox>
        <ButtonBox>
          <SaveButton
            variant="contained"
            onClick={() => {
              history.push("/dashboard");
              dispatch(setTransferParam(null));
            }}
          >
            Save
          </SaveButton>
          <AddButton
            variant="contained"
            onClick={() => {
              history.push("/dashboard");
              dispatch(setTransferParam(null));
            }}
          >
            Done
          </AddButton>
        </ButtonBox>
      </WrapContainer>
    </motion.div>
  );
};

export default TransferSuccess;
