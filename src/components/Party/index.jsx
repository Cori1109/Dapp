import React, {useEffect, useState} from "react";
import { Avatar, Grid, Typography, Stack, Box } from "@mui/material";
import { styled } from '@mui/system';
import { useHistory } from "react-router";
import { getFormatDate, getFormatNumber } from "utils/functions";
import { useDispatch } from "react-redux";
import { editParty } from "store/actions/App";
const PartyContainer = styled(Grid)(({ theme }) => ({
    width: '100%',
    padding: '16px 0',
    cursor: 'pointer'
}));

const PartyAvatar = styled(Avatar)(({ theme }) => ({
    backgroundColor: theme.palette.button.primary.background,
    width: '40px',
    height: '40px'
}))

const TitleTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary_gray,
    fontWeight: 700,
    letterSpacing: '-0.3px'
}))

const WrapTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.secondary_gray,
    fontWeight: 400,
    letterSpacing: '-0.3px',
    wordSpacing: '-5px'
}))

const Party = ({ data, index }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [closeTime, setCloseTime] = useState(data ? getFormatDate(data.endDate) : null)
    
    useEffect(() => {
        const interval = setInterval(() => {
            if (data) {
                let formatDate = getFormatDate(data.endDate)
                setCloseTime(formatDate)
                if (formatDate == 0) {
                    let _party = JSON.parse(JSON.stringify(data))
                    _party.status = 'finished'
                    dispatch(editParty(_party))
                }
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [data]);

    const handleGotoParty = () => {
        if (data.isPublic)
            history.push('/public-party')
        else
            history.push(`/private-party/${data._id}`)
    }

    return (
        <PartyContainer container spacing={1} onClick={() => handleGotoParty()}>
            <Grid item xs={7}>
                <Stack direction="row" spacing={2}>
                    <PartyAvatar src={data.avatar} alt="A" />
                    <Box>
                        <Box>
                            <TitleTypography variant="xs_content">
                                {data.name}
                            </TitleTypography>
                        </Box>
                        <Box>
                            <WrapTypography variant="xs_content">
                                {data.isPublic ? 'Public' : 'Private'}
                            </WrapTypography>
                        </Box>
                    </Box>
                </Stack>
            </Grid>
            <Grid item xs={5} textAlign="right">
                <Box>
                    <TitleTypography variant="xs_content">
                        ${getFormatNumber(data.amount)}
                    </TitleTypography>
                </Box>
                <Box>
                    <WrapTypography variant="xs_content">
                        {getFormatDate(data.state) != "open" ?  "Waiting participants" : data.endDate ? `${getFormatDate(data.endDate)} left` : 'Party finished'}
                    </WrapTypography>
                </Box>
            </Grid>
        </PartyContainer>
    );
}

export default Party;