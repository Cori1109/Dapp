import React from "react";
import { JoinPartyButton } from 'components'
import useStyles from './style';
import { Typography, Box } from "@mui/material";

const mockup_profile = {
  name: 'James Lee',
  balance: '2,736.15',
  avatar: 'https://a.com',
}
const Dashboard = () => {
  
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        <Box className={classes.name}>
          <Typography variant='subtitle2'>
            Good morning,
          </Typography>
          <Typography variant='subtitle1'>
            {mockup_profile.name}
          </Typography>
        </Box>
        <Box className={classes.avatarArea}>
          <Box className={classes.badge}>
            Gold
          </Box>
          <Box className={classes.avatar}>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Dashboard;