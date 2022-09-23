import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.scss"
import { MetaMaskInpageProvider } from "@metamask/providers"
import MetaMaskSate from "./Contexts/MetaMaskContext/MetaMaskState"
import { BrowserRouter } from "react-router-dom"
import ModalOpener from "./Contexts/ModalContext/ModalOpener"
import CardsGlobalState from "./Contexts/CardsContext/CardsGlobalState"

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MetaMaskSate>
      <CardsGlobalState>
        <BrowserRouter>
          <ModalOpener>
            <App />
          </ModalOpener>
        </BrowserRouter>
      </CardsGlobalState>
    </MetaMaskSate>
  </React.StrictMode>
)
