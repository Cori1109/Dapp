import React, { useEffect, useState } from "react";
import { Box, Container, Typography, Button } from "@mui/material"
import { styled } from '@mui/system';
import { motion } from "framer-motion";
import { pageVariants, pageTransition } from "../../utils/pageTransitions"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router"
import BalanceSelector from "components/BalanceSelector";
import PaymentMethodSelector from "components/PaymentMethodSelector";
import CryptoSelector from "components/CryptoSelector";
import { setHeaderTitle } from "store/actions/App";
import ConnectWalletModal from "components/Modal/ConnectWalletModal";
import ChooseCryptoModal from "components/Modal/ChooseCryptoModal"
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import NoMetamaskModal from "components/Modal/NoMetamaskModal";
import { getAbbreviationAddress } from "utils/functions";
import SwipeButton from "components/Button/SwipeButton";
import TxnLoadingModal from "components/Modal/TxnLoadingModal";
import { transferDaiToken, transferUsdcToken } from "services/API/contracts";
import Web3 from "web3";
import { setTransferParam, setBalance } from "store/actions/App";
import AlertMessage from "components/AlertMessage";

const HeaderBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  paddingBottom: theme.spacing(4)
}));

const AddFunds = (props) => {
  const dispatch = useDispatch()
  const { activate, deactivate, account, library, chainId } = useWeb3React();
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [step, setStep] = useState(0);
  const [openWallet, setOpenWallet] = useState(false);
  const [openCrypto, setOpenCrypto] = useState(false);
  const [noMetamask, setNoMetamask] = useState(false);
  const [selectedWalletInfo, setSelectedWalletInfo] = useState(null);
  const [selectedCryptoInfo, setSelectedCryptoInfo] = useState(null);
  const [txnHash, setTxnHash] = useState('');
  const [txnLoading, setTxnLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertInfo, setAlertInfo] = useState(null);
  const balance = useSelector(state => state.app.balance)
  const history = useHistory()

  useEffect(() => {
    dispatch(setHeaderTitle('Add funds'))
  }, [])

  const handleConnectWallet = (walletInfo) => {
    const { connector, type } = walletInfo;
    setSelectedWalletInfo(walletInfo)
    if (connector) {
      activate(connector, undefined, true)
        .then(res => {
          setStep(1)
        })
        .catch(error => {
          if (error instanceof UnsupportedChainIdError) {
            activate(connector);
          } else {
            if (type === 'metamask') {
              setNoMetamask(true);
            }
            console.info("Connection Error - ", error);
          }
        })
        .finally(() => {
          setOpenWallet(false);
        });
    }
  }

  const handleSelectCrypto = (crypto) => {
    setSelectedCryptoInfo(crypto)
    setOpenCrypto(false)
  }

  const handleSuccess = async (price) => {
    await handleTransfer(price)
  }

  const handleTransfer = async (price) => {
    setTxnLoading(true)
    try {
      if (library) {
        const web3 = new Web3(library.provider);
        if (account && web3) {
          let result = null;
          if (selectedCryptoInfo.title === 'DAI')
            result = await transferDaiToken(web3, selectedCryptoInfo.address, account, price, setTxnHash)
          else {
            result = await transferUsdcToken(web3, selectedCryptoInfo.address, account, price, setTxnHash)
          }
          if (result.status) {
            setAlertInfo({
              message: `Successfully funded $${price}!`,
              variant: 'success'
            })
            setOpenAlert(true)
            dispatch(setTransferParam({price: price, walletInfo: selectedWalletInfo, from: account, txnHash: txnHash, back_url: '/add-funds'}))
            dispatch(setBalance(Number(balance) + Number(price)))
            history.push('/transfer-success')
          } else {
            setAlertInfo({
              message: `Something went wrong. Please try again!`,
              variant: 'error'
            })
            setOpenAlert(true)            
          }
        }
      }
    } catch (e) {
      console.log("handleSubmit error", e);
      setAlertInfo({
        message: `Something went wrong. Please try again!`,
        variant: 'error'
      })
      setOpenAlert(true)
    } finally {
      setTxnLoading(false)
    }
  }

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <Container maxWidth="sm">
        <HeaderBox>
          <Typography variant="subtitle3" textAlign="center" marginTop="32px">
            How do you want to add funds?
          </Typography>
        </HeaderBox>
        <Box marginBottom="56px">
        {
            step == 0
          ?
            <PaymentMethodSelector setOpenWallet={setOpenWallet}/>
          :
            step == 1
          ?
            <CryptoSelector 
              setOpenCrypto={setOpenCrypto} 
              walletInfo={selectedWalletInfo} 
              account={getAbbreviationAddress(account)} 
              cryptoInfo={selectedCryptoInfo}/>
          :
            <></>
        }
        </Box>
        <BalanceSelector
          max={-1}
          balance={selectedAmount}
          setBalance={setSelectedAmount}
        />
        {
          selectedCryptoInfo ?
            <Box marginTop="64px">
              <SwipeButton 
                mainText="Swipe to add funds" 
                overlayText="" 
                onSwipeDone={() => {
                  handleSuccess(selectedAmount)
                  setSelectedAmount(0)
                }} 
                reset={0}
              />
            </Box>
          :
            <></>
        }
      </Container>
      <ConnectWalletModal 
        open={openWallet}
        onClose={() => setOpenWallet(false)}
        onSuccess={(selectedWallet) => handleConnectWallet(selectedWallet)}
      />
      <NoMetamaskModal open={noMetamask} onClose={() => setNoMetamask(false)} walletInfo={selectedWalletInfo}/>
      <ChooseCryptoModal
        open={openCrypto}
        onClose={() => setOpenCrypto(false)}
        onSuccess={(selectedCrypto) => handleSelectCrypto(selectedCrypto)}
      />
      <TxnLoadingModal
        loading={txnLoading}
        title={`TRANSACTION IN \nPROGRESS`}
        handleClose={() => setTxnLoading(false)}
        txnHash={txnHash}
      /> 
      {
          alertInfo && <AlertMessage message={alertInfo.message} variant={alertInfo.severity} open={openAlert} onClose={() => setOpenAlert(false)}/>
      }

    </motion.div>
  );
}
 
export default AddFunds;