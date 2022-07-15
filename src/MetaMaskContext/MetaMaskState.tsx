import { useEffect, useState } from "react"
import { connectMetaMask } from "../metamask.service"
import MetaMaskContext from "./MetaMaskContext"

function MetaMaskSate({children}: {children: React.ReactNode}) {
  const [accounts, setAccounts] = useState<string[]>([] as string[])
  const [currentAccount, setCurrentAccount] = useState<string>("")
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [isListeningToAccountsChanged, setIsListeningToAccountsChanged] = useState<boolean>(false)
  const _listenToAccountsChanged = (accounts: any) => {
    setAccounts(accounts)
    setCurrentAccount(accounts[0])
  }
  const _connectMetaMask = () => {
    connectMetaMask(setAccounts, setCurrentAccount).then(connected => {
      if(connected && window.ethereum) {
        setIsConnected(true)
      }else {
        setIsConnected(false)
      }
    })
  }
  useEffect(() => {
    if(!isListeningToAccountsChanged && isConnected && window.ethereum) {
      window.ethereum.on('accountsChanged', _listenToAccountsChanged)
      setIsListeningToAccountsChanged(true)
    }else if(isListeningToAccountsChanged && !isConnected && window.ethereum) {
      window.ethereum.off('accountsChanged', _listenToAccountsChanged)
      setIsListeningToAccountsChanged(false)
    }
  }, [isConnected])

  
  return <MetaMaskContext.Provider value={{
    currentAccount: currentAccount,
    accounts: accounts,
    isConnected: isConnected,
    connectMetaMask: () => _connectMetaMask(),
    reconnectMetaMask: () => currentAccount ?? _connectMetaMask(),
  }}>
  {children}
  </MetaMaskContext.Provider>
}

export default MetaMaskSate