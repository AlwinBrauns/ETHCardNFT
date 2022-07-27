import { ethers } from "ethers"

const connectMetaMask = async (setAccounts: Function, setCurrentAccount: Function): Promise<boolean> => {
    let success: boolean = false
    if (typeof window.ethereum !== 'undefined') {
        await window.ethereum.request({ method: 'eth_requestAccounts' }).then((_accounts: any) => {
        setAccounts(_accounts)
        setCurrentAccount(_accounts[0])
        success = true
        })
        return success
    }else {
        setAccounts([] as string[])
        setCurrentAccount('')
        success = false
        console.log('MetaMask is not installed!');
        return success
    }
}

const getBalance = async (address: string) => {
    if (typeof window.ethereum !== 'undefined'){
        //@ts-ignore
        const provider = new ethers.providers.Web3Provider(window.ethereum) 
        return provider.getBalance(address)
    }
    return -1
}

export { connectMetaMask, getBalance }