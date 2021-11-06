import React from "react";
import { 

  CheckCircleOutline as CheckCircleOutlineIcon 
} from '@mui/icons-material';
import PrimaryButton from "../PrimaryButton";


const StatusButton = ({status, handleClick}) => {

  return (
    status == "joined" ?
      <PrimaryButton variant="contained" endIcon={<CheckCircleOutlineIcon />} style={{justifyContent: "space-between", marginTop: "36px"}} text="Joined" />
    : status == "finished" ?
      <PrimaryButton variant="contained" endIcon={<CheckCircleOutlineIcon />} style={{justifyContent: "space-between", marginTop: "36px"}} text="Finished" />
    : 
      <PrimaryButton variant="contained" onClick={handleClick} endIcon={<CheckCircleOutlineIcon />} style={{justifyContent: "space-between", marginTop: "36px"}} text="Join" />
  );
}
 
export default StatusButton;