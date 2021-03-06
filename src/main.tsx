import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.scss'
import { MetaMaskInpageProvider } from "@metamask/providers";
import MetaMaskSate from './MetaMaskContext/MetaMaskState';

declare global {
  interface Window{
    ethereum?:MetaMaskInpageProvider
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <MetaMaskSate>
        <App />
      </MetaMaskSate>
  </React.StrictMode>
)
