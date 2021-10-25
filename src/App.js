import React from 'react';
import Web3ReactProvider from 'web3-react';
import { ThemeProvider } from '@mui/material/styles';
import RenderRoutes from './routes';
import theme from './theme';
import {useSelector} from 'react-redux'
import getLibrary from "utils/getLibrary";

const App = () => {
  const isBlack = useSelector(state => state.app.isBlack)

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ThemeProvider theme={theme(isBlack)}>
        <RenderRoutes />
      </ThemeProvider>
    </Web3ReactProvider>
  );
};

export default App;
