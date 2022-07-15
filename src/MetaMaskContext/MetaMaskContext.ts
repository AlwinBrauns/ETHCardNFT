import {createContext} from "react";

type MetaMaskContextType = {
    currentAccount: string,
    accounts: string[],
    connectMetaMask: () => Promise<boolean>,
    reconnectMetaMask: () => Promise<boolean>,
}

const MetaMaskContext = createContext({} as MetaMaskContextType);

export default MetaMaskContext
