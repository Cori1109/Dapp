import React from "react";
import { Box, Container, Stack, Paper } from "@mui/material";
import { styled } from '@mui/system';
import { motion } from "framer-motion";
import { pageVariants, pageTransition } from "../../utils/pageTransitions"
import WalletSelector from "components/WalletSelector";


const Item = styled(Paper)`
    textAlign: 'center',
`;

 

const AddFunds = (props) => {

return(
  <motion.div
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    transition={pageTransition}
  >
    <Box>
        <Container maxWidth="sm">
          <WalletSelector />
        </Container>
    </Box>
  </motion.div>
  );
}
 
export default AddFunds;