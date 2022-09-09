import { BigNumber } from 'ethers'
import address from '../address.json'
import OfferFactory from "../artifacts/contracts/OfferFactory.sol/OfferFactory.json"
import OfferContract from "../artifacts/contracts/Offer.sol/Offer.json"
import Contract from './modules/contract'

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
    async subscribeToNewOfferListener(listener: (sender: any, receiver: any, transaction: any)=>void) {
        if(this.updateState(OfferFactory.abi).success && this.contract) {
            this.contract.on("NewOffer", listener)
        }
    }
    async unsubscribeFromNewOfferListener(listener: (sender: any, receiver: any, transaction: any)=>void) {
        if(this.updateState(OfferFactory.abi).success && this.contract) {
            this.contract.off("NewOffer", listener)
        }
    }

    //Offer
    async buy(offerAddress: string, cardTransactionManager: string, sender: string, expectedWei: string, message: string) {
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
}

const Offer: _Offer = new _Offer(address.offerFactory)

export { 
    Offer
}