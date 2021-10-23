import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'

const RPC_URLS = {
  1: process.env.REACT_APP_RPC_URL_1,
  4: process.env.REACT_APP_RPC_URL_4
}

export const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42] })

export const walletconnect = new WalletConnectConnector({
  rpc: { 1: RPC_URLS[1] },
  qrcode: true
})