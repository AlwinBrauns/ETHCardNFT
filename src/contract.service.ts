import Cards from "./artifacts/contracts/Cards.sol/Cards.json"
import CardsOwnership from "./artifacts/contracts/CardsOwnership.sol/CardsOwnership.json"
import { ethers } from "ethers"
import address from './address.json'

class _CardsContract {
    static instance?: _CardsContract
    cardsAddress = address.address
    provider?: ethers.providers.Web3Provider
    signer?: ethers.providers.JsonRpcSigner
    contract?: ethers.Contract
    static getCardsContract() {
        if(_CardsContract.instance) {
            return _CardsContract.instance
        }
        _CardsContract.instance = new _CardsContract()
        return _CardsContract.instance
    }
    constructor() {
        this.updateState()
    }    
    updateState(NFT?:boolean) {
        if(window.ethereum) {
            // @ts-ignore
            this.provider = new ethers.providers.Web3Provider(window.ethereum)
            this.signer = this.provider.getSigner()
            this.contract = new ethers.Contract(this.cardsAddress, NFT?CardsOwnership.abi:Cards.abi, this.signer)
            return {
                success: !!(this.contract && this.signer && this.provider)
            }
        }else {
            return {
                success: false
            }
        }
    }
    async generateCard() {
        if(this.updateState().success && this.contract) {
            const transaction = await this.contract.generateCard()
            await transaction.wait()
            return transaction
        }
    }
    async balanceOfNFT(address: string) {
        if(this.updateState(true).success && this.contract) {
            const balance = await this.contract.balanceOf(address)
            return balance
        }
    }
    async getCards() {
        if(this.updateState().success && this.contract) {
            const cards = await this.contract.getOwnCards()
            return cards
        }
    }
    async subscribeToNewCardListener(listener: (card: any, owner: any)=>void) {
        if(this.updateState().success && this.contract) {
            this.contract.on("newCard", listener)
        }
    }
    async unsubscribeFromNewCardListener(listener: (card: any, owner: any)=>void) {
        if(this.updateState().success && this.contract) {
            this.contract.off("newCard", listener)
        }
    }
}
const CardsContract = _CardsContract.getCardsContract()
export {
    CardsContract
}