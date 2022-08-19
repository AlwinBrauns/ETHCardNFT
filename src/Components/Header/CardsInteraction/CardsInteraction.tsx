import { ethers } from "ethers"
import { EventHandler, useState } from "react"
import { CardsContract } from "../../../Services/cards.contract.service"
import CardProperties from "../../Card/CardProperties"
type CardsInteractionProperties = {
    selectedCard?: number,
    cards: CardProperties[]
}
export default function CardsInteraction({selectedCard, cards}: CardsInteractionProperties) {
    const [value, setValue] = useState(0)
    const onValueChangeHandler = (e: any) => {
        if(value>=0) setValue(e.target.value);
    }
    return (<div>            
        {
            typeof selectedCard === "number" ? 
            cards[selectedCard] ? <>
                <button onClick={
                    async () => {
                        const wei = await CardsContract.getCardValue(cards[selectedCard].cardAddress)
                        console.log(ethers.utils.formatEther(wei))
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
    </div>)
}