import { BigNumber } from "ethers";
import { formatEther, parseEther } from "ethers/lib/utils";
import { useContext, useEffect, useState } from "react";
import ModalContext from "../../Contexts/ModalContext/ModalContext";
import { OfferType } from "../../Reducer/OffersReducer";
import { CardsContract } from "../../Services/cards.contract.service"
import { OfferContractService } from "../../Services/offer.contract.service";
import { CardsTransactionManager } from "../../Services/transaction.contract.service";
import "./Offer.scss"
type OfferProperties = {
    offer: OfferType
}
export default function Offer({offer}: OfferProperties) {

    const [sellerCard, setSellerCard] = useState("")
    const {openBuyOfferModal} = useContext(ModalContext)

    const priceInEth = () => {
        return formatEther(offer.neededWei)
    }

    const getSellerCard = async () => {
        const card: BigNumber = await CardsContract.getCard(offer.offerCard.toString())
        return card._hex
    }

    useEffect(() => {
        getSellerCard().then(card => {
            setSellerCard(card)
        })
    }, [])

    return <div className="Offer">
            <div className="offer-id">{offer.id}</div>
            <div className="offer-seller">Seller: {
                sellerCard
            }</div>
            <div className="offer-description">{offer.description} </div>
            <div className="offer-price">{priceInEth()} ETH</div>
            <button onClick={() => openBuyOfferModal(offer)}>Buy</button>
        </div>
}