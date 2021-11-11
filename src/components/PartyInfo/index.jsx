import React, { useEffect, useState } from "react";
import { Grid, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";
import { useHistory } from "react-router";
import { getFormatDate, getFormatNumber } from "utils/functions";
import { editParty } from "store/actions/App";
import { useDispatch } from "react-redux";
import { setJoinedParam } from "store/actions/App";

const BalanceInfo = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
}));

const WrapBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.box.background,
}));

const WrapTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary_gray,
  marginBottom: "8px",
}));

const PartyInfo = ({ party }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [closeTime, setCloseTime] = useState(
    party ? getFormatDate(party.endDate) : null
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (party) {
        let formatDate = getFormatDate(party.endDate);
        setCloseTime(formatDate);
        if (formatDate == 0) {
          //   let _party = JSON.parse(JSON.stringify(party))
          //   _party.status = 'finished'
          //   dispatch(editParty(_party));
          dispatch(
            setJoinedParam({
              price: party.amount,
              party_name: party.name,
              state: "finished",
            })
          );
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [party]);

  return (
    <>
      <BalanceInfo>
        <Typography variant="lg_title" paddingRight="8px">
          ${party ? getFormatNumber(party.expectedPrize) : 0}
        </Typography>
        <Typography variant="ss_content">+3.1% from last month</Typography>
      </BalanceInfo>
      <WrapBox marginTop="28px" padding="24px 16px" borderRadius="16px">
        {party && (
          <Grid container spacing={2}>
            {!party.isPublic &&
            party.currentParticipants == party.participants ? (
              <Grid item xs={12}>
                <WrapTypography variant="sm_content">
                  {getFormatDate(party.endDate) != 0
                    ? "Party closes in"
                    : "Winner"}
                </WrapTypography>
                <Typography variant="md_title">
                  {getFormatDate(party.endDate) != 0 ? closeTime : "Distributed with all participants"}
                </Typography>
              </Grid>
            ) : (
              <Grid item xs={12}>
                <WrapTypography variant="sm_content">
                  {getFormatDate(party.endDate) != 0
                    ? party.isPublic
                      ? "Next prize distribution in"
                      : "Party starts when"
                    : "Winner"}
                </WrapTypography>
                <Typography variant="md_title">
                  {!party.isPublic
                    ? `${party.currentParticipants}/${party.participants} participants joined`
                    : getFormatDate(party.endDate) != 0 ? closeTime : "Distributed with all participants"}
                </Typography>
              </Grid>
            )}
          </Grid>
        )}
      </WrapBox>
    </>
  );
};

export default PartyInfo;
