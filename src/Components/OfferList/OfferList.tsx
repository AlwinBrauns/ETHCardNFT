import { useContext, useEffect } from "react"
import ModalContext from "../../Contexts/ModalContext/ModalContext"
import { OfferData } from "../../Reducer/OffersReducer"
import { OfferContractService } from "../../Services/offer.contract.service"
import { CardsTransactionManager } from "../../Services/transaction.contract.service"
import useOffers from "../../States/OffersState"
import Offer from "../Offer/Offer"

export default function OfferList() {
    const {offersState, addOffer} = useOffers()

    const onNewOffer = async (offerAddress: string) => {
        const offerData: OfferData = {
            offerCard: await OfferContractService.getOfferCard(offerAddress),
            description: await OfferContractService.getDescription(offerAddress),
            neededWei: await OfferContractService.getNeededWei(offerAddress),
            online: await OfferContractService.isOnline(offerAddress),
            stock: await OfferContractService.getStock(offerAddress),
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
        <>
            {
                offersState.offers.map(offer => {
                    return <Offer key={offer.id} offer={offer}></Offer>
                })
            }
        </>
    )
}