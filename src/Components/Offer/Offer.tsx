import { BigNumber } from "ethers";
import { formatEther, parseEther } from "ethers/lib/utils";
import { useEffect, useState } from "react";
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

    const priceInEth = () => {
        return formatEther(offer.neededWei)
    }

    const getSellerCard = async () => {
        const card: BigNumber = await CardsContract.getCard(offer.offerCard.toString())
        return card._hex
    }

    const buyOffer = async (sender: string, message: string) => {
        OfferContractService.buy(
            offer.id,
            CardsTransactionManager.address,
            sender,
            offer.neededWei.toString(),
            message
        )
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
            <div>{offer.offerCard.toString()}</div>
            <div className="offer-description">{offer.description} </div>
            <div className="offer-price">{priceInEth()} ETH</div>
            <button onClick={() => buyOffer(
                "0xB7A5bd0345EF1Cc5E66bf61BdeC17D2461fBd968", "_"
                )}>Buy</button>
        </div>
}