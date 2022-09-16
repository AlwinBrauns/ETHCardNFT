import { ethers } from "ethers"
import { EventHandler, useContext, useState } from "react"
import ModalContext from "../../../Contexts/ModalContext/ModalContext"
import { CardsContract } from "../../../Services/cards.contract.service"
import CardProperties from "../../Card/CardProperties"
import CardsInteractionWrapper from "./CardsInteractionWrapper"
type CardsInteractionProperties = {
    selectedCard?: number,
    cards: CardProperties[]
}
export default function CardsInteraction({selectedCard, cards}: CardsInteractionProperties) {
    const [value, setValue] = useState(0)
    const {openSuccessModal} = useContext(ModalContext)
    const onValueChangeHandler = (e: any) => {
        if(value>=0) setValue(e.target.value);
    }
    return (
        <CardsInteractionWrapper selectedCard={selectedCard} cards={cards}>
            <div>            
                {
                    typeof selectedCard === "number" ? 
                    cards[selectedCard] ? <>
                        <button onClick={
                            async () => {
                                const wei = await CardsContract.getCardValue(cards[selectedCard].cardAddress)
                                console.log(ethers.utils.formatEther(wei))
                                openSuccessModal("The Card has " + ethers.utils.formatEther(wei) + " Ether!")
                            }
                        }>Get Value</button>
                        <br />
                        <input min={0} value={value} onChange={e => onValueChangeHandler(e)} type={"number"} />
                        <button onClick={
                            () => {
                                CardsContract.giveCardValue(cards[selectedCard].cardAddress, value)
                            }
                        }>Add Value</button>
                    </>: null : null
                }
            </div>
        </CardsInteractionWrapper>   
    )
}