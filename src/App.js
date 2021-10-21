import React, { useState } from 'react';
import { Web3Provider } from '@ethersproject/providers';
import Web3ReactProvider from 'web3-react';
import { ThemeProvider } from '@mui/material/styles';
import RenderRoutes from './routes';
import theme from './theme';

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 15000;
  return library;
}

const App = () => {
  
  const [isBlack, setIsBlack] = useState(false)

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
        <ThemeProvider theme={theme(isBlack)}>
          <RenderRoutes />
        </ThemeProvider>
    </Web3ReactProvider>
  );
};

export default App;
