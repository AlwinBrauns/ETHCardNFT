import Greeters from "./artifacts/contracts/Greeter.sol/Greeter.json"
import Cards from "./artifacts/contracts/Cards.sol/Cards.json"
import { ethers } from "ethers"

const greetersAddress = "0x9A676e781A523b5d0C0e43731313A708CB607508"
const cardsAddress = "0x0B306BF915C4d645ff596e518fAf3F9669b97016"

const generateCard = async () => {
    if (typeof window.ethereum !== 'undefined'){
        //@ts-ignore 
        const provider = new ethers.providers.Web3Provider(window.ethereum) 
        const signer = provider.getSigner()
        const contract = new ethers.Contract(cardsAddress, Cards.abi, signer)
        try {
            const transaction = await contract.generateCard()
            await transaction.wait()
            console.log(transaction)
        } catch (error) {
            console.log(error)
        }
    }
}

const getCards = async () => {
    if (typeof window.ethereum !== 'undefined'){
        //@ts-ignore 
        const provider = new ethers.providers.Web3Provider(window.ethereum) 
        const signer = provider.getSigner()
        const contract = new ethers.Contract(cardsAddress, Cards.abi, provider)
        try {
            const data = await contract.getCardsByOwner(signer.getAddress())
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }
}

const listenToNewCard = async (listener: (card: any, owner: any)=>void) => {
    if (typeof window.ethereum !== 'undefined'){
        //@ts-ignore 
        const provider = new ethers.providers.Web3Provider(window.ethereum) 
        const contract = new ethers.Contract(cardsAddress, Cards.abi, provider)
        contract.on("newCard", listener)
    }
}

const unsubscribeFromNewCard = async (listener: (card: any, owner: any)=>void) => {
    if (typeof window.ethereum !== 'undefined'){
        //@ts-ignore 
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const contract = new ethers.Contract(cardsAddress, Cards.abi, provider)
        contract.off("newCard", listener)
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

export {
    fetchGreeting, 
    setGreeting, 
    listenToNewGreeting, 
    listenToNewCard, 
    unsubscribeFromNewCard, 
    unsubscribeFromNewGreeting, 
    generateCard, 
    getCards
}