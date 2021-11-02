import React from "react";
import { Box } from "@mui/material";
import Party from "../Party";

const PartiesList = ({list}) => {

  return(
    <Box>
      {
        list.map((item, index) => (
          <Party data={item} index={index} key={`party-${index}`}/>
          ))
      }
    </Box>
  );
}
 
export default PartiesList;