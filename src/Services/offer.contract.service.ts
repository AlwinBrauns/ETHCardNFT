import { BigNumber } from 'ethers'
import address from '../address.json'
import OfferFactory from "../artifacts/contracts/OfferFactory.sol/OfferFactory.json"
import OfferContract from "../artifacts/contracts/Offer.sol/Offer.json"
import Contract from './modules/contract'
import { OfferType, OfferData } from '../Reducer/OffersReducer'
import { CardsContract } from './cards.contract.service'

class _Offer extends Contract {
    //OfferFactory
    async createOffer(
        offerCard: string, 
        description: string, 
        neededWei: number, 
        online: boolean, 
        stock: number
        ) {
        if(this.updateState(OfferFactory.abi).success && this.contract) {
            const offer = await this.contract.createOffer(
                offerCard, description, neededWei, online, stock
            )
            await offer.wait()
            console.log(offer)
            return offer
        }
    }
    async subscribeToNewOfferListener(listener: (offerAddress: string)=>void) {
        if(this.updateState(OfferFactory.abi).success && this.contract) {
            this.contract.on("NewOffer", listener)
        }
    }
    async unsubscribeFromNewOfferListener(listener: (offerAddress: string)=>void) {
        if(this.updateState(OfferFactory.abi).success && this.contract) {
            this.contract.off("NewOffer", listener)
        }
    }

    //Offer
    async buy(
        offerAddress: string, 
        cardTransactionManager: string, 
        sender: string, 
        expectedWei: string, 
        message: string
        ) {
        if(this.updateState(OfferContract.abi, offerAddress).success && this.contract) {
            const transaction = await this.contract.buy(
                cardTransactionManager,
                sender,
                expectedWei,
                message
            )
            await transaction.wait()
            return transaction
        }
    }
    async getDescription(
        offerAddress: string
    ) {
        if(this.updateState(OfferContract.abi, offerAddress).success && this.contract) {
            const description = await this.contract.getDescription()
            return description
        }
    }
    async getNeededWei(
        offerAddress: string
    ) {
        if(this.updateState(OfferContract.abi, offerAddress).success && this.contract) {
            const neededWei = await this.contract.getNeededWei()
            return neededWei
        }
    }
    async getOfferCard(
        offerAddress: string
    ) {
        if(this.updateState(OfferContract.abi, offerAddress).success && this.contract) {
            const offerCard = await this.contract.getOfferCard()
            return offerCard
        }
    }
    async isOnline(
        offerAddress: string
    ) {
        if(this.updateState(OfferContract.abi, offerAddress).success && this.contract) {
            const isOnline = await this.contract.isOnline()
            return isOnline
        }
    }
}

const OfferContractService: _Offer = new _Offer(address.offerFactory)

export { 
    OfferContractService
}