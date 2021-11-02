import React, { useEffect, useState } from "react";
import { Grid, Typography, Box } from "@mui/material";
import { styled } from '@mui/system';
import { useHistory } from "react-router";
import { getFormatDate } from "utils/functions";
const BalanceInfo = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center'
}))

const PartyInfo = ({ party }) => {
    const history = useHistory()
    const [closeTime, setCloseTime] = useState(party ? getFormatDate(party.endDate) : null)
    useEffect(() => {
        const interval = setInterval(() => {
            if (party)
                setCloseTime(getFormatDate(party.endDate))
        }, 1000);
        return () => clearInterval(interval);
    }, [party]);
    return (
        <>
            <BalanceInfo>
                <Typography variant="h1" paddingRight="8px">
                    ${party ? party.balance : 0}
                </Typography>
                <Typography variant="subtitle5">
                    +3.1% from last month
                </Typography>
            </BalanceInfo>
            <Box marginTop="32px" padding="24px" borderRadius="16px" backgroundColor="#F0EEFE">
                <Grid container spacing={2} >
                    <Grid item xs={8}>
                        <Typography variant="subtitle2">Party closes in</Typography>
                        <Typography variant="subtitle1">{party ? closeTime : ''}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default PartyInfo;