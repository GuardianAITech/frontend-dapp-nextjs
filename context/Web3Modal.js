"use client";

import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'


const projectId = 'd3bb3c494bb32f237e0af7df0632bdf5'

const mainnet = {
  chainId: 1,
  name: 'Ethereum',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: 'https://cloudflare-eth.com'
}

const metadata = {
  name: 'GuardianAI',
  description: 'GuardianAI',
  url: 'https://guardianai.tech',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [mainnet],
  projectId
})

export function Web3ModalProvider({ children }) {
  return children;
}