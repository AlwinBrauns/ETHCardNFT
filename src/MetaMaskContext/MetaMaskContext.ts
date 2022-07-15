import {createContext} from "react";

type MetaMaskContextType = {
    currentAccount: string,
    accounts: string[],
    isConnected: boolean,
    connectMetaMask: () => void
    reconnectMetaMask: () => void,
}

const MetaMaskContext = createContext({} as MetaMaskContextType);

export default MetaMaskContext
