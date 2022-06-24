import Greeters from "./artifacts/contracts/Greeter.sol/Greeter.json"
import { ethers } from "ethers"

const greetersAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"

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

const listenToNewGreeting = async (listener: (greeting: string)=>void) => {
    if (typeof window.ethereum !== 'undefined'){
        //@ts-ignore 
        const provider = new ethers.providers.Web3Provider(window.ethereum) 
        const contract = new ethers.Contract(greetersAddress, Greeters.abi, provider)
        contract.on("newGreet", listener)
    }
}

const unsubscribeFromNewGreeting = async (listener: (greeting: string)=>void) => {
    if (typeof window.ethereum !== 'undefined'){
        //@ts-ignore 
        const provider = new ethers.providers.Web3Provider(window.ethereum) 
        const contract = new ethers.Contract(greetersAddress, Greeters.abi, provider)
        contract.off("newGreet", listener)
    } 
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

export {fetchGreeting, setGreeting, listenToNewGreeting, unsubscribeFromNewGreeting}