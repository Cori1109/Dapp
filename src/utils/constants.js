import MetaMaskLogo from 'assets/logo/metamask_logo.png'
import WalletConnectLogo from 'assets/logo/walletconnect_logo.png'
import DaiLogo from 'assets/logo/dai.png'
import UsdcLogo from 'assets/logo/usdc.png'
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

export const CRYPTOS = [
  {
    title: 'DAI',
    logo: DaiLogo,
    address: '0x501dAE52A71A75e640a487FcFC718A8aC6E433e1'
  }, {
    title: 'USDC',
    logo: UsdcLogo,
    address: '0x501dAE52A71A75e640a487FcFC718A8aC6E433e1'
  }
]