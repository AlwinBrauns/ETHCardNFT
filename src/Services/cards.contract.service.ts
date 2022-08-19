import Card from "../artifacts/contracts/Card.sol/Card.json";
import Cards from "../artifacts/contracts/CardsFactory.sol/CardsFactory.json";
import CardsOwnership from "../artifacts/contracts/CardsOwnership.sol/CardsOwnership.json"
import { ethers } from "ethers"
import address from '../address.json'
import Contract from './modules/contract'

class _CardsContract extends Contract {
    //--- CardsOwnership.sol
    async balanceOfNFT(address: string) {
        if(this.updateState(CardsOwnership.abi).success && this.contract) {
            const balance = await this.contract.balanceOf(address)
            return balance
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

const CardsContract: _CardsContract = new _CardsContract(address.cards, Card.abi)
export {
    CardsContract
}