import { useState } from "react"
import { connectMetaMask } from "../metamask.service"
import MetaMaskContext from "./MetaMaskContext"

function MetaMaskSate({children}: {children: React.ReactNode}) {
  const [accounts, setAccounts] = useState<string[]>([] as string[])
  const [currentAccount, setCurrentAccount] = useState<string>("")
  const _connectMetaMask = () => {
    if(!currentAccount && window.ethereum?.isConnected()){
      return connectMetaMask(setAccounts, setCurrentAccount)
    }
    return Promise.resolve(false)
  }
  return <MetaMaskContext.Provider value={{
    currentAccount: currentAccount,
    accounts: accounts,
    connectMetaMask: () => _connectMetaMask(),
    reconnectMetaMask: () => currentAccount ? connectMetaMask(setAccounts, setCurrentAccount) : Promise.resolve(false),
  }}>
  {children}
  </MetaMaskContext.Provider>
}

export default MetaMaskSate