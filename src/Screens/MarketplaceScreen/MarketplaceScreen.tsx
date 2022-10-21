import { BigNumber } from 'ethers'
import { useEffect } from 'react'
import { OfferData } from '../../Reducer/OffersReducer'
import { OfferContractService } from '../../Services/offer.contract.service'
import useOffers from '../../States/OffersState'
import './MarketplaceScreen.scss'
export default function MarketplaceScreen() {
    const {offersState, addOffer} = useOffers()
    const onNewOffer = async (offerAddress: string) => {
        const offerData: OfferData = {
            offerCard: BigNumber.from("0x0"),
            description: await OfferContractService.getDescription(offerAddress),
            neededWei: 0,
            online: true,
            stock: 0,
            rating: 0,
            ratingCounter: 0
        }
        addOffer(offerAddress, offerData)
    }
    useEffect(() => {
        OfferContractService.subscribeToNewOfferListener(onNewOffer)
        return () => {
            OfferContractService.unsubscribeFromNewOfferListener(onNewOffer)
        }
    },[])
    return (
        <div className='MarketplaceScreen'>
            {
                offersState.offers.map(offer => {
                    return <div key={offer.id}>{offer.id} {offer.description}</div>
                })
            }
        </div>
    )
}