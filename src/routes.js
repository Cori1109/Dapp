/* eslint-disable react/display-name */
import React, { useEffect } from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import DetailLayout from "./layouts/DetailLayout";
import DefaultLayout from "./layouts/DefaultLayout";
import Dashboard from "./pages/Dashboard";
import PrivatePartyList from "./pages/PrivateParty/List";
import PrivatePartyDetail from "./pages/PrivateParty/Details";
import PrivatePartyCreator from "./pages/PrivateParty/Creator";
import PublicParty from "./pages/PublicParty";
import JoinedSuccess from "./pages/JoinedSuccess";
import TransferSuccess from "./pages/TransferSuccess";
import AddFunds from "./pages/AddFunds";
import Login from "./pages/Auth/Login";
import { AnimatePresence } from "framer-motion";
import Welcome from "pages/Welcome";
import Profile from "pages/Profile";
import ProfileLayout from "layouts/ProfileLayout";
import SignUp from "pages/Auth/SignUp";
import Splash from "pages/Splash";
import { useWeb3React } from "@web3-react/core";
import { getPublicParty, getUserDetails } from "utils/api";
import { setPartyList } from "store/actions/App";
import { setBalance } from "store/actions/App";
import { setLockBalance } from "store/actions/App";
import { useDispatch, useSelector } from "react-redux";
import SimpleBackdrop from "components/Backdrop";
import { setLoading } from "store/actions/App";

import { UnsupportedChainIdError } from "@web3-react/core";
import { setNotificationData } from "store/actions/App";
import { switchNetwork } from "utils/web3utils";
import { WALLETS } from 'utils/constants';
import { setPublicParty } from "store/actions/App";

const RenderRoutes = (props) => {
  const loading = useSelector((state) => state.app.loading);
  const publicPartyInfo = useSelector((state) => state.app.publicParty);
  const dispatch = useDispatch()

  const { activate, deactivate, account, library, chainId } = useWeb3React();

  useEffect(() => {
    if (account) {
      dispatch(setLoading(true));
      getUserDetailsInfo();
    }
    const interval = setInterval(() => {
      setLoading(true);
      account && getUserDetailsInfo();
      getPublicPartyInfo();
    }, 60000);
    return () => clearInterval(interval);
  }, [account]);
  
  useEffect(() => {
    !publicPartyInfo && getPublicPartyInfo();
    handleConnectWallet(WALLETS[0])    
  }, [])
  
  const handleConnectWallet = (walletInfo) => {
    const { connector, type } = walletInfo;
    if (connector) {
      activate(connector, undefined, true)
        .then(async res => {
          await switchNetwork('0x4')
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
              // setNoMetamask(true);
            }
            console.info("Connection Error - ", error);
          }
        })
        .finally(() => {
        });
    }
  }  

  // const wallet = "0x9FB3ffD52d85656d33CF765Ce4CEEfde25b9B78B"
  const wallet = account;
  
  const getUserDetailsInfo = async () => {
    getUserDetails(wallet)
    .then((res) => {
      // setParties(res.privateParties)
      dispatch(setPartyList(res.privateParties))
      dispatch(setBalance(res.userDetails.balance))
      dispatch(setLockBalance(res.userDetails.staked))
      dispatch(setLoading(false))
    })
    .catch((error) => {
      console.log(error);
      dispatch(setPartyList(null))
      dispatch(setBalance(0))
      dispatch(setLockBalance(0))
      dispatch(setLoading(false))
    });
  }

  const getPublicPartyInfo = async () => {
    getPublicParty()
      .then((res) => {
        dispatch(setLoading(false));
        dispatch(setPublicParty(res));
      })
      .catch((error) => {
        dispatch(setLoading(false));
        console.log(error);
      });
  };

  return (
    <AnimatePresence>
      <Switch>
        <Route exact path="/private-party">
          <MainLayout>
            <PrivatePartyList />
          </MainLayout>
        </Route>
        <Route path="/private-party/create">
          <DetailLayout>
            <PrivatePartyCreator />
          </DetailLayout>
        </Route>
        <Route path="/private-party/:partyId">
          <DetailLayout>
            <PrivatePartyDetail />
          </DetailLayout>
        </Route>
        <Route exact path="/public-party">
          <MainLayout>
            <PublicParty />
          </MainLayout>
        </Route>
        <Route exact path="/joined-success">
          <DefaultLayout>
            <JoinedSuccess />
          </DefaultLayout>
        </Route>
        <Route exact path="/transfer-success">
          <DefaultLayout>
            <TransferSuccess />
          </DefaultLayout>
        </Route>
        <Route path="/add-funds">
          <DetailLayout>
            <AddFunds />
          </DetailLayout>
        </Route>
        <Route exact path="/dashboard">
          <MainLayout>
            <Dashboard />
          </MainLayout>
        </Route>
        <Route exact path="/login">
          <DefaultLayout>
            <Login />
          </DefaultLayout>
        </Route>
        <Route exact path="/signup">
          <DefaultLayout>
            <SignUp />
          </DefaultLayout>
        </Route>
        <Route exact path="/welcome">
          <DefaultLayout>
            <Welcome />
          </DefaultLayout>
        </Route>
        <Route path="/profile">
          <ProfileLayout>
            <Profile />
          </ProfileLayout>
        </Route>
        <Route path="/">
          <Splash />
        </Route>
        {/* <Redirect from="/" to="/welcome"/> */}
      </Switch>
      <SimpleBackdrop open={loading}></SimpleBackdrop>
    </AnimatePresence>
  );
};

export default RenderRoutes;
