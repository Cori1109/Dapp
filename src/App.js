import React from 'react';
import { Web3Provider } from '@ethersproject/providers';
import Web3ReactProvider from 'web3-react';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import RenderRoutes from './routes';

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 15000;
  return library;
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#c90076',
    }
  },
});

const App = () => {
    return (
      <Web3ReactProvider getLibrary={getLibrary}>
          <ThemeProvider theme={theme}>
            <RenderRoutes />
          </ThemeProvider>
      </Web3ReactProvider>
    );
};

export default App;
