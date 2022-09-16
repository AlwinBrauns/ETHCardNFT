import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.scss'
import { MetaMaskInpageProvider } from "@metamask/providers";
import MetaMaskSate from './Contexts/MetaMaskContext/MetaMaskState';
import { BrowserRouter } from 'react-router-dom';
import ModalOpener from './Contexts/ModalContext/ModalOpener';

declare global {
  interface Window{
    ethereum?:MetaMaskInpageProvider
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <MetaMaskSate>
        <ModalOpener>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ModalOpener>
      </MetaMaskSate>
  </React.StrictMode>
)
