import React, { useEffect, useState } from "react";
import { Box, Container, Button, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useHistory } from "react-router";

import EllipseIcon from "assets/logo/ellipse.png";
import PolygonIcon from "assets/logo/polygon.png";

const Content = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  padding: 0,
  backgroundColor: theme.palette.primary_blue,
  width: "100%",
  
}));

const WrapBox = styled(Box)(({ theme }) => ({
  position: "fixed",
  bottom: "60px",
  margin: "auto",
  width: "100%",
  color: theme.palette.secondary_gray
}));

const WrapTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.light_gray
}));

const BrandTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.white,
  fontSize: "40px",
  marginLeft: "17px"
}));

const WrapContainer = styled(Container)(({ theme }) => ({
  height: "100vh",
  padding: 0,
  backgroundColor: theme.palette.primary_blue,
}));

const ShapeImage = styled(`img`)(({ theme }) => ({
  width: "19px",
  height: "19px",
  marginRight: "5px",
}));

const Splash = (props) => {
  const history = useHistory();

  const timer = React.useRef();

  useEffect(() => {
    timer.current = window.setTimeout(() => {
      history.push("/welcome");
    }, 5000);
  }, []);

  const handleClick = () => {
    history.push("/welcome");
  }

  return (
    <WrapContainer onClick={handleClick}>
      <Content>
        <Box alignItems="center">
          <Box display="flex" alignItems="center" marginBottom="2px">
            <ShapeImage src={EllipseIcon} alt="" />
            <ShapeImage src={PolygonIcon} alt="" />
          </Box>
          <Box display="flex" alignItems="center">
            <ShapeImage src={EllipseIcon} alt="" />
            <ShapeImage src={EllipseIcon} alt="" />
          </Box>
        </Box>
        <BrandTypography variant="lg_title">
          RAND
        </BrandTypography>
      </Content>
      <WrapBox marginTop="24px" textAlign="center" fontSize="12px" >
        <WrapTypography variant="xs_content">
          Rand is a prize investment mobile app, <br/>Rand up your money
        </WrapTypography>
      </WrapBox>
    </WrapContainer>
  );
};

export default Splash;
