import React from "react";
import { Box, Typography } from "@mui/material";
import Party from "../Party";
import PrimaryButton from "components/Button/PrimaryButton";
import { useHistory } from "react-router";
import _ from 'lodash';

const PartiesList = ({ list, isPrivate }) => {
  const history = useHistory();

  return (
    <Box>
      {list && !_.isEmpty(list) ? (
        list.map((item, index) => (
          <Party data={item} index={index} key={`party-${index}`} />
        ))
      ) : (
        <>
          <Box
            marginTop="23px"
            marginBottom="42px"
            textAlign="center"
            fontSize="16px"
          >
            {isPrivate ? (
              <Typography variant="sm_content_gray">
                You don’t currently <br />
                have any private parties.
              </Typography>
            ) : (
              <Typography variant="sm_content_gray">
                You don’t currently <br />
                have any parties.
              </Typography>
            )}
          </Box>
          <Box paddingBottom="16px">
            {!isPrivate && (
              <PrimaryButton
                variant="contained"
                text="View Public Parties"
                onClick={() => {
                  history.push("/public-party");
                }}
              />
            )}
          </Box>
          <PrimaryButton
            variant="text"
            text="Create a new Private Party"
            onClick={() => {
              history.push("/private-party/create");
            }}
          />
        </>
      )}
    </Box>
  );
};

export default PartiesList;
