import Card from "../artifacts/contracts/Card.sol/Card.json";
import Cards from "../artifacts/contracts/CardsFactory.sol/CardsFactory.json";
import CardsOwnership from "../artifacts/contracts/CardsOwnership.sol/CardsOwnership.json"
import { BigNumber, ethers } from "ethers"
import address from '../address.json'

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
        this.updateState(Cards.abi)
    }    
    updateState(abi: any, address?: string) {
        if(window.ethereum) {
            // @ts-ignore
            this.provider = new ethers.providers.Web3Provider(window.ethereum)
            this.signer = this.provider.getSigner()
            this.contract = new ethers.Contract(address?address:this.cardsAddress, abi, this.signer)
            return {
                success: !!(this.contract && this.signer && this.provider)
            }
        }else {
            return {
                success: false
            }
        }
    }

    //--- CardsFactory.sol
    async generateCard() {
        if(this.updateState(Cards.abi).success && this.contract) {
            const transaction = await this.contract.generateCard()
            await transaction.wait()
            return transaction
        }
    }
    async getCards() {
        if(this.updateState(Cards.abi).success && this.contract) {
            const cards = await this.contract.getOwnCards()
            return cards
        }
    }
    async subscribeToNewCardListener(listener: (card: any, owner: string)=>void) {
        if(this.updateState(Cards.abi).success && this.contract) {
            this.contract.on("newCard", listener)
        }
    }
    async unsubscribeFromNewCardListener(listener: (card: any, owner: string)=>void) {
        if(this.updateState(Cards.abi).success && this.contract) {
            this.contract.off("newCard", listener)
        }
    }

    //--- Card.sol
    async getCard(cardAddress: string) {
        if(this.updateState(Card.abi, cardAddress).success && this.contract) {
            const card = await this.contract.getCard()
            return card
        }
    }
    async getFactory(cardAddress: string) {
        if(this.updateState(Card.abi, cardAddress).success && this.contract){
            const factory = await this.contract.getFactory()
            return factory
        }
    }
    async giveCardValue(cardAddress: string, ether: number) {
        if(this.updateState(Card.abi, cardAddress).success && this.contract) {
            const options = {
                value: ethers.utils.parseEther(ether.toString())
            }
            const transaction = await this.contract.giveCardValue(options)
            await transaction.wait()
            return transaction
        }
    }
    async getCardValue(cardAddress: string) {
        if(this.updateState(Card.abi, cardAddress).success && this.contract) {
            const value = await this.contract.getCardValue()
            return value
        }
    }
}

const CardsContract = _CardsContract.getCardsContract()
export {
    CardsContract
}