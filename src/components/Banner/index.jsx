import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { styled } from '@mui/system';

const ContentPaper = styled(Paper)(({ theme }) => ({
  boxShadow: '0px 20px 46px rgba(0, 0, 0, 0.1)',
  borderRadius: '16px',
  padding: theme.spacing(3),
  backgroundColor: theme.palette.badge.background
}));


const Banner = (props) => {

return(
    <Box>
      <ContentPaper>
          <Typography variant="subtitle3">
            WIN WEEKLY PRIZE!
          </Typography>
      </ContentPaper>
    </Box>
  );
}
 
export default Banner;