import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  Divider,
  Button,
} from "@mui/material";
import { Close as CloseIcon, Telegram } from "@mui/icons-material";
import { styled } from "@mui/system";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import LinkImage from "../../../assets/logo/link.png";
import WhatsappImage from "../../../assets/logo/whatsapp.png";
import TelegramImage from "../../../assets/logo/telegram_30.png";
import { ContentCopy as ContentCopyIcon } from "@mui/icons-material";
import { setNotificationData } from "store/actions/App";

const ShareFriendsDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    width: "600px",
    borderRadius: theme.spacing(4),
  },
}));

const ShareImage = styled("img")(({ theme }) => ({}));

const ShareList = styled("ul")(({ theme }) => ({
  marginTop: "20px",
  padding: "0px",
}));

const DialogHeader = styled(DialogTitle)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(4),
}));

const ShareListBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0px 10px",
  height: "70px",
}));

const ShareContainer = styled("li")(({ theme }) => ({
  cursor: "pointer",
  listStyleType: "none",
  padding: "0px",
}));

const CloseButton = styled(Button)(({ theme }) => ({
  color: theme.palette.button.primary.foreground,
  backgroundColor: theme.palette.button.primary.background,
  fontWeight: 500,
  fontSize: "16px",
  fontFamily: "Overpass",
  width: "100%",
  textTransform: "none",
  boxShadow: "none",
  borderRadius: "12px",
  padding: "16px",
  "&:hover": {
    color: theme.palette.button.primary.foreground,
    backgroundColor: theme.palette.button.primary.background,
    boxShadow: "none"
  },
}));

const ShareFriendsModal = ({ open, handleClose }) => {
  const dispatch = useDispatch();

  const handleGotoWebsite = (link) => {
    window.open(link, "_blank");
  };

  const handleClickCopy = (link) => {
    if (link) {
      navigator.clipboard.writeText(link);
      dispatch(
        setNotificationData({
          message: `${link} has been copied!`,
          variant: "success",
          open: true,
        })
      );
    }
  };

  return (
    <ShareFriendsDialog open={open}>
      <DialogHeader>
        <CloseIcon onClick={handleClose} />
        <Typography variant="sl_title">Share with Friends</Typography>
        <Box></Box>
      </DialogHeader>
      <DialogContent>
        <ShareList marginTop="20px">
          <ShareContainer
            onClick={() => {
              handleClickCopy(window.location);
            }}
          >
            <ShareListBox>
              <Box width="50px" display="flex" justifyContent="center">
                <ShareImage src={LinkImage} />
              </Box>
              <Typography
                variant="xs_content_gray"
                display="flex"
                alignItems="center"
              >
                <span>{"Link"}</span>
                {/* <ContentCopyIcon
                  style={{ paddingLeft: "8px", cursor: "pointer" }}
                /> */}
              </Typography>
            </ShareListBox>
            <Divider variant="middle" />
          </ShareContainer>
          <ShareContainer
            onClick={() =>
              handleGotoWebsite("whatsapp://send?text=" + window.location)
            }
          >
            <ShareListBox>
              <Box width="50px" display="flex" justifyContent="center">
                <ShareImage src={WhatsappImage} />
              </Box>
              <Typography variant="xs_content_gray">Whatsapp</Typography>
            </ShareListBox>
            <Divider variant="middle" />
          </ShareContainer>
          <ShareContainer
            onClick={() =>
              handleGotoWebsite("tg://msg?text=" + window.location)
            }
          >
            <ShareListBox>
              <Box width="50px" display="flex" justifyContent="center">
                <ShareImage src={TelegramImage} />
              </Box>
              <Typography variant="xs_content_gray">Telegram</Typography>
            </ShareListBox>
            <Divider variant="middle" />
          </ShareContainer>
        </ShareList>
        <CloseButton onClick={handleClose}> Close </CloseButton>
      </DialogContent>
    </ShareFriendsDialog>
  );
};

export default ShareFriendsModal;
