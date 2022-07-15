import Cards from "./artifacts/contracts/Cards.sol/Cards.json"
import { ethers } from "ethers"

class _CardsContract {
    static instance?: _CardsContract
    cardsAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
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
    updateState() {
        if(window.ethereum) {
            // @ts-ignore
            this.provider = new ethers.providers.Web3Provider(window.ethereum)
            this.signer = this.provider.getSigner()
            this.contract = new ethers.Contract(this.cardsAddress, Cards.abi, this.signer)
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