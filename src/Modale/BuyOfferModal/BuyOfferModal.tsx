import { useState } from "react"
import ChooseCardForm from "../../Components/ChooseCardForm/ChooseCardForm"
import { OfferType } from "../../Reducer/OffersReducer"
import { OfferContractService } from "../../Services/offer.contract.service"
import { CardsTransactionManager } from "../../Services/transaction.contract.service"
import "./BuyOfferModal.scss"
type BuyOfferModalProperties = {
    closeModal: () => void,
    offer: OfferType
}
export default function BuyOfferModal({closeModal, offer}:BuyOfferModalProperties) {
    const [formIndex, setFormIndex] = useState(0)
    const [message, setMessage] = useState("")

    const buyOffer = async (sender: string, message: string) => {
        OfferContractService.buy(
            offer.id,
            CardsTransactionManager.address,
            sender,
            offer.neededWei.toString(),
            message
        )
    }

    const finishBuyingOffer = (senderCard: string) => {
        buyOffer(senderCard, message)
        closeModal()
    }

    const BuyOfferForm = () => {
        return <>
            <h5>{offer.id}</h5>
            <input 
                type="text" 
                name="message" 
                id="buy-offer-message" 
                placeholder="information for seller"
                onChange={(e) => setMessage(e.target.value)}
                value={message}
            />
            <button onClick={() => {
                setFormIndex(prevState => prevState + 1)
            }}>Choose Card</button>
        </>
    }

    const forms = [
        <BuyOfferForm />,
        <ChooseCardForm onFinish={finishBuyingOffer} />
    ]

    return (
        <div className="modal-content offer-buy">
            <h4>
                Buy Offer {formIndex + 1}/{forms.length}
            </h4>
            {formIndex > 0 ? (
            <div className="back" onClick={() => setFormIndex((prevIndex) => --prevIndex)}>
                <div></div>
                <div></div>
            </div>
            ) : null}
            {forms[formIndex]}
        </div>
    )
}