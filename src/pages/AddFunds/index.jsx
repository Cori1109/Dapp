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
import { transferDaiToken, transferUsdcToken, VaultDeposit } from "services/API/contracts";
import Web3 from "web3";
import { setTransferParam, setBalance } from "store/actions/App";
import { balanceOfDai } from "services/API/contracts";
import { balanceOfUsdc } from "services/API/contracts";
import { setNotificationData } from "store/actions/App";
import { switchNetwork } from "utils/web3utils";

const HeaderBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  paddingBottom: theme.spacing(4)
}));

const AddFunds = (props) => {
  const dispatch = useDispatch()
  const { activate, deactivate, account, library, chainId } = useWeb3React();
  const [selectedAmount, setSelectedAmount] = useState('0');
  const [step, setStep] = useState(0);
  const [openWallet, setOpenWallet] = useState(false);
  const [openCrypto, setOpenCrypto] = useState(false);
  const [noMetamask, setNoMetamask] = useState(false);
  const [selectedWalletInfo, setSelectedWalletInfo] = useState(null);
  const [selectedCryptoInfo, setSelectedCryptoInfo] = useState(null);
  const [txnHash, setTxnHash] = useState('');
  const [txnLoading, setTxnLoading] = useState(false);
  const [swipeReset, setSwipeReset] = useState(0);
  const [maxBalance, setMaxBalance] = useState(0);
  const balance = useSelector(state => state.app.balance)
  const history = useHistory()

  useEffect(() => {
    dispatch(setHeaderTitle('Add funds'))
  }, [])

  useEffect(async () => {
    if (step == 1 && chainId != 4) {
      try {
        dispatch(setNotificationData({
          message: `You should switch Ethereum network to Rinkeby`,
          variant: 'error',
          open: true
        }))
        await switchNetwork('0x4')
      } catch (e) {
        if (e.code == 4001)
          dispatch(setNotificationData({
            message: `You should switch Ethereum network to Rinkeby`,
            variant: 'error',
            open: true
          }))
      }
    }
  }, [chainId])

  useEffect( async () => {
    if (selectedCryptoInfo && library) {
      const web3 = new Web3(library.provider);
      
      let result = null;

      /*if (account && web3) {
        if (selectedCryptoInfo.title === 'DAI') {
          result = await balanceOfDai(web3, selectedCryptoInfo.address, account)
        } else if (selectedCryptoInfo.title === 'USDC') {
          result = await balanceOfUsdc(web3, selectedCryptoInfo.address, account)
        }
        if (result && result.status)
          setMaxBalance(parseInt(result.balance))
        else {
        }
      }*/
      setMaxBalance(500)
    }
  }, [selectedCryptoInfo, account, chainId])

  const handleConnectWallet = (walletInfo) => {
    const { connector, type } = walletInfo;
    setSelectedWalletInfo(walletInfo)
    if (connector) {
      activate(connector, undefined, true)
        .then(async res => {
          await switchNetwork('0x4')
          setStep(1)
        })
        .catch(error => {
          if (error instanceof UnsupportedChainIdError) {
            activate(connector);
          } else {
            if (error.code == 4001) {
              dispatch(setNotificationData({
                message: `You should switch Ethereum network to Rinkeby`,
                variant: 'error',
                open: true
              }))
            } else if (type === 'metamask') {
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
          /*if (selectedCryptoInfo.title === 'DAI')
            result = await transferDaiToken(web3, selectedCryptoInfo.address, account, price, setTxnHash)
          else {
            result = await transferUsdcToken(web3, selectedCryptoInfo.address, account, price, setTxnHash)
          }*/
          result = await VaultDeposit(web3, selectedCryptoInfo.address, account, price, setTxnHash)
          if (result.status) {
            dispatch(setNotificationData({
              message: `Successfully funded $${price}!`,
              variant: 'success',
              open: true
            }))
            dispatch(setTransferParam({price: price, walletInfo: selectedWalletInfo, cryptoInfo: selectedCryptoInfo, from: account, txnHash: result.data.hash, back_url: '/add-funds'}))
            dispatch(setBalance(Number(balance) + Number(price)))
            history.push('/transfer-success')
          } else {
            if (result.error.code === 4001) {
              dispatch(setNotificationData({
                message: `Transaction rejected!`,
                variant: 'error',
                open: true
              }))
            } else {
              dispatch(setNotificationData({
                message: `Something went wrong. Please try again!`,
                variant: 'error',
                open: true
              }))
            }
          }
          setTxnHash('')
        }
      }
    } catch (e) {
      console.log("handleSubmit error", e);
      dispatch(setNotificationData({
        message: `Something went wrong. Please try again!`,
        variant: 'error',
        open: true
      }))
    } finally {
      setTxnLoading(false)
      setSwipeReset(swipeReset + 1)
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
          <Typography variant="sm_content_gray" textAlign="center" marginTop="32px">
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
        {
          step == 1 && selectedCryptoInfo &&
          <>
            <BalanceSelector
              max={maxBalance}
              balance={selectedAmount}
              setBalance={setSelectedAmount}
              overflowMessage={'Please input the available amount.'}
              currency={selectedCryptoInfo?.title}
            />
          </>
        }
        {
          selectedCryptoInfo && chainId == 4 && selectedAmount != 0 &&
            <Box marginTop="64px">
              <SwipeButton 
                mainText="Swipe to add funds" 
                overlayText="" 
                onSwipeDone={() => {
                  handleSuccess(selectedAmount)
                }} 
                reset={swipeReset}
              />
            </Box>
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
        handleClose={() => {setTxnLoading(false); setTxnHash(''); setSwipeReset(swipeReset + 1)}}
        txnHash={txnHash}
      /> 
    </motion.div>
  );
}
 
export default AddFunds;