import address from '../address.json'
import OfferFactory from "../artifacts/contracts/OfferFactory.sol/OfferFactory.json"
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
}

const Offer: _Offer = new _Offer(address.offerFactory)

export { 
    Offer
}