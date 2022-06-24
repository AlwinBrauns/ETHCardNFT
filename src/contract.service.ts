import Greeters from "./artifacts/contracts/Greeter.sol/Greeter.json"
import { ethers } from "ethers"

const greetersAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

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

export {fetchGreeting, setGreeting}