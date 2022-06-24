import Greeters from "./artifacts/contracts/Greeter.sol/Greeter.json"
import { ethers } from "ethers"

const greetersAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

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
        success = false
        console.log('MetaMask is not installed!');
        return success
    }
  }

const setGreeting = async (textInput: string, setTextInput: Function) => {
    if(textInput) {
        if(typeof window.ethereum !== 'undefined') {
            //@ts-ignore 
            const provider = new ethers.providers.Web3Provider(window.ethereum) 
            const signer = provider.getSigner()
            const contract = new ethers.Contract(greetersAddress, Greeters.abi, signer)
            const transaction = await contract.setGreeting(textInput)
            await transaction.wait()
            console.log("transaction send")
        }
    }
    setTextInput("")
}

const fetchGreeting = async () => {
if (typeof window.ethereum !== 'undefined'){
    //@ts-ignore 
    const provider = new ethers.providers.Web3Provider(window.ethereum) 
    const contract = new ethers.Contract(greetersAddress, Greeters.abi, provider)
    try {
    const data = await contract.greetGreet()
    console.log(data)
    } catch (error) {
    console.log(error)
    }
}
}

export {fetchGreeting, setGreeting, connectMetaMask}