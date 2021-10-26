import MetaMaskLogo from 'assets/logo/metamask.png'
import WalletConnectLogo from 'assets/logo/walletconnect.png'
import { injected, walletconnect } from "./connectors";
export const WALLETS = [
  {
    title: "MetaMask",
    logo: MetaMaskLogo,
    connector: injected,
    type: "metamask",
    url: "https://metamask.io/"
  },
  {
    title: "WalletConnect",
    logo: WalletConnectLogo,
    connector: walletconnect,
    type: "walletconnect",
    url: "https://walletconnect.com/"
  },
];