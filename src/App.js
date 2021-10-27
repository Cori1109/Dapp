import React from 'react';
import { Web3ReactProvider } from "@web3-react/core";
import { ThemeProvider } from '@mui/material/styles';
import RenderRoutes from './routes';
import theme from './theme';
import {useDispatch, useSelector} from 'react-redux'
import getLibrary from "utils/getLibrary";
import AlertMessage from 'components/AlertMessage';
import { setNotificationData } from 'store/actions/App';

const App = () => {
  const isBlack = useSelector(state => state.app.isBlack)
  const notificationData = useSelector(state => state.app.notificationData)
  const dispatch = useDispatch()

  const setAlertOff = () => {
    dispatch(setNotificationData(null))
  }
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ThemeProvider theme={theme(isBlack)}>
        <RenderRoutes />
      </ThemeProvider>
      {notificationData && <AlertMessage message={notificationData.message} variant={notificationData.variant} open={notificationData.open} onClose={() => setAlertOff()}/> }
    </Web3ReactProvider>
  );
};

export default App;
