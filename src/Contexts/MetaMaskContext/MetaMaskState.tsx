import { useEffect, useState } from "react"
import { connectMetaMask } from "../../Services/metamask.service"
import MetaMaskContext from "./MetaMaskContext"

function MetaMaskSate({children}: {children: React.ReactNode}) {
  const [accounts, setAccounts] = useState<string[]>([] as string[])
  const [currentAccount, setCurrentAccount] = useState<string>("")
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [isListeningToAccountsChanged, setIsListeningToAccountsChanged] = useState<boolean>(false)
  const _listenToAccountsChanged = (_accounts: any) => {
    setAccounts(_accounts)
    if(_accounts[0] !== currentAccount) {
      setCurrentAccount(_accounts[0])
    }
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
  useEffect(() => {
    if(isConnected){
      localStorage.setItem("wasConnected", isConnected.toString())
    }
  }, [isConnected])
  useEffect(() => {
    if(localStorage.getItem("wasConnected") === "true") {
      setIsConnected(true)
      _connectMetaMask()
    }
  }, [])
  
  return <MetaMaskContext.Provider value={{
    currentAccount: currentAccount,
    accounts: accounts,
    isConnected: isConnected,
    connectMetaMask: () => _connectMetaMask(),
    reconnectMetaMask: () => currentAccount ? _connectMetaMask() : undefined,
  }}>
  {children}
  </MetaMaskContext.Provider>
}

export default MetaMaskSate