import React from "react";
import { Avatar, Grid, Typography, Stack, Box } from "@mui/material";
import { styled } from '@mui/system';
import { useHistory } from "react-router";

const PartyContainer = styled(Grid)(({ theme }) => ({
    width: '100%',
    padding: theme.spacing(2),
    cursor: 'pointer'
}));

const PartyAvatar = styled(Avatar)(({ theme }) => ({
    backgroundColor: theme.palette.button.primary.background
}))

const Party = ({ data, index }) => {
    const history = useHistory()
    return (
        <PartyContainer container spacing={2} onClick={() => history.push(`/private-party/${data.partyId}`)}>
            <Grid item xs={6}>
                <Stack direction="row" spacing={2}>
                    <PartyAvatar src={data.avatar} alt="A" />
                    <Box>
                        <Box>
                            <Typography variant="subtitle4">
                                {data.name}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="subtitle5">
                                {data.isPublic ? 'Public' : 'Private'}
                            </Typography>
                        </Box>
                    </Box>
                </Stack>
            </Grid>
            <Grid item xs={6} textAlign="right">
                <Box>
                    <Typography variant="subtitle4">
                        ${data.balance}
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="subtitle5">
                        {data.leftHours} Left
                    </Typography>
                </Box>
            </Grid>
        </PartyContainer>
    );
}

export default Party;