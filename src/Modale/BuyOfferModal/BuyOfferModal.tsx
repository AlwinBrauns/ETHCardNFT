import { useState } from "react"
import ChooseCardForm from "../../Components/ChooseCardForm/ChooseCardForm"

type BuyOfferModalProperties = {
    closeModal: () => void
}
export default function BuyOfferModal({closeModal}:BuyOfferModalProperties) {
    const [formIndex, setFormIndex] = useState(0)

    
    const finishBuyingOffer = (senderCard: string) => {
        closeModal()
    }

    const BuyOfferForm = () => {
        return <div></div>
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