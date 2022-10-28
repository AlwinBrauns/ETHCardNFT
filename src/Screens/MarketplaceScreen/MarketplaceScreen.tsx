import { BigNumber } from 'ethers'
import { useContext, useEffect } from 'react'
import FunctionsPanel from '../../Components/FunctionsPanel/FunctionsPanel'
import Offer from '../../Components/Offer/Offer'
import ModalContext from '../../Contexts/ModalContext/ModalContext'
import { OfferData } from '../../Reducer/OffersReducer'
import { OfferContractService } from '../../Services/offer.contract.service'
import useOffers from '../../States/OffersState'
import './MarketplaceScreen.scss'
export default function MarketplaceScreen() {
    const {offersState, addOffer} = useOffers()
    const { result, openOfferModal } = useContext(ModalContext)

    const onNewOffer = async (offerAddress: string) => {
        const offerData: OfferData = {
            offerCard: await OfferContractService.getOfferCard(offerAddress),
            description: await OfferContractService.getDescription(offerAddress),
            neededWei: await OfferContractService.getNeededWei(offerAddress),
            online: await OfferContractService.isOnline(offerAddress),
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

    const handleOfferModalFormData = (offerData: OfferData) => {
        const isValid = () => !!offerData.offerCard
        if (isValid()) {
        let offer = OfferContractService.createOffer(
            offerData.offerCard.toString(),
            offerData.description,
            offerData.neededWei,
            offerData.online,
            offerData.stock
        )
        } else {
            console.log("wrong input: ", offerData)
        }
    }

    useEffect(() => {
        if (result?.offer) {
            handleOfferModalFormData(result.offer)
        }
    }, [result])

    return (
        <>
            <FunctionsPanel>
            <button className="App-header-addOffer accent" onClick={() => openOfferModal()}>
                Add Offer
            </button>
            <button onClick={() => {}}>
                Load All Offers
            </button>
            </FunctionsPanel>
            <section className='MarketplaceScreen'>
                {
                    offersState.offers.map(offer => {
                        return <Offer key={offer.id} offer={offer}></Offer>
                    })
                }
            </section>
        </>
    )
}