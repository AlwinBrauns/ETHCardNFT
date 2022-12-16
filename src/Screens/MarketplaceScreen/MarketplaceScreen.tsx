import { useContext, useEffect } from 'react'
import FunctionsPanel from '../../Components/FunctionsPanel/FunctionsPanel'
import Offer from '../../Components/Offer/Offer'
import OfferList from '../../Components/OfferList/OfferList'
import ModalContext, { ModalResultTyp } from '../../Contexts/ModalContext/ModalContext'
import { OfferData } from '../../Reducer/OffersReducer'
import { OfferContractService } from '../../Services/offer.contract.service'
import useOffers from '../../States/OffersState'
import './MarketplaceScreen.scss'
export default function MarketplaceScreen() {
    const { result, reset, openOfferModal } = useContext(ModalContext)

    const handleOfferModalFormData = (offerData: OfferData) => {
        const isValid = () => !!offerData.offerCard
        if (isValid()) {
            OfferContractService.createOffer(
                offerData.offerCard.toString(),
                offerData.description,
                offerData.neededWei,
                offerData.online,
                offerData.stock
            )
        } else {
            console.log("wrong input: ", offerData)
        }
        reset(ModalResultTyp.OFFER)
    }

    useEffect(() => {
        if (result[ModalResultTyp.OFFER]) {
            handleOfferModalFormData(result[ModalResultTyp.OFFER])
        }
    }, [result])

    return (
        <>
            <FunctionsPanel>
                <button className="App-header-addOffer accent" onClick={() => openOfferModal()}>
                    Add Offer
                </button>
                {/** TODO Load All Offers */}
                <button onClick={() => {}}>
                    Load All Offers
                </button>
            </FunctionsPanel>
            <section className='MarketplaceScreen'>
                <OfferList></OfferList>
            </section>
        </>
    )
}