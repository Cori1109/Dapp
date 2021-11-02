import MetaMaskLogo from 'assets/logo/metamask.png'
import WalletConnectLogo from 'assets/logo/walletconnect.png'
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
    address: '0xad6d458402f60fd3bd25163575031acdce07538d'
  }, {
    title: 'USDC',
    logo: UsdcLogo,
    address: '0x85f1dAd6f812F2D7757eD54d749dc0c1C5De3B59'
  }
]