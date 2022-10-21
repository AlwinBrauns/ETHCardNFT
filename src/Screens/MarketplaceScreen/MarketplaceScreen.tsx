import { BigNumber } from 'ethers'
import { useEffect } from 'react'
import { OfferData } from '../../Reducer/OffersReducer'
import { OfferContractService } from '../../Services/offer.contract.service'
import useOffers from '../../States/OffersState'
import './MarketplaceScreen.scss'
export default function MarketplaceScreen() {
    const {offersState, addOffer} = useOffers()
    const onNewOffer = (offerAddress: string) => {
        console.log(offerAddress)
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
                    return <div>{offer.id} {offer.description}</div>
                })
            }
        </div>
    )
}