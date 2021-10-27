import React from "react";
import { CircularProgress, Box } from "@mui/material";
import { styled } from '@mui/system';

const LoaderBox = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: '20px',
  paddingBottom: '20px'
}));

const LoadingWrapper = ({
  children,
  loading,
  width = "40px",
  height = "40px",
}) => {
  return loading ? (
    <LoaderBox>
      <CircularProgress style={{width:width, height: height}}/>
    </LoaderBox>
  ) : (
    <>{children}</>
  );
};

export default LoadingWrapper;

const LoaderDiv = styled("div")`
  
`;
