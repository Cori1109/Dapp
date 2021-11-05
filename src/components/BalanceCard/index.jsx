import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { styled } from "@mui/system";
import FundsButton from "../Button/FundsButton";
import { useSelector } from "react-redux";
import { getFormatNumber } from "utils/functions";
import { useHistory } from "react-router";

const CardBox = styled(Box)(({ theme }) => ({
  background: theme.palette.secondary_blue,
  marginTop: "19px",
  borderRadius: "16px",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  minWidth: 0,
  wordWrap: "break-word",
  backgroundClip: "border-box",
  border: "1px solid rgba(0,0,0,.125)",
}));

const WrapBox = styled(Box)(({ theme }) => ({
    background: "rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(30px)",
    borderRadius: "16px",
    padding: "15px 22px",
}));

const Title = styled(Typography)(({ theme }) => ({
  color: "white",
  background: "#586599",
  borderRadius: "10px",
  padding: ".75rem 1.25rem",
  marginBottom: 0,
  fontWeight: "bold",
}));

const BalanceNumber = styled(Typography)(({ theme }) => ({
  color: "white",
  fontWeight: "bold",
}));

const BalanceCard = (props) => {
  const history = useHistory();
  const balance = useSelector((state) => state.app.balance);

  return (
    <CardBox>
      <WrapBox>
        <Typography variant="xs_content">Your Balance</Typography>
      </WrapBox>
      <Box display="flex" justifyContent="space-between" padding="15px 22px" alignItems="center">
        <Typography variant="md_title" color="white">
          ${getFormatNumber(balance)}
        </Typography>
        <FundsButton text="Add Money" onClick={() => history.push('/add-funds')}/>
      </Box>
    </CardBox>
  );
};

export default BalanceCard;
