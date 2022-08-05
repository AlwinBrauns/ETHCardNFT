import { ethers } from "ethers"
import { CardsContract } from "../../../Services/contract.service"
import CardProperties from "../../Card/CardProperties"
type CardsInteractionProperties = {
    selectedCard?: number,
    cards: CardProperties[]
}
export default function CardsInteraction({selectedCard, cards}: CardsInteractionProperties) {
    return (<div>
                        
        {
            typeof selectedCard === "number" ? 
            cards[selectedCard] ? [
                <button onClick={
                    async () => {
                        const wei = await CardsContract.getCardValue(cards[selectedCard].cardAddress)
                        console.log(ethers.utils.formatEther(wei))
                    }
                } key={1}>Get Value</button>,
                <button onClick={
                    () => {
                        CardsContract.giveCardValue(cards[selectedCard].cardAddress, 1)
                    }
                } key={2}>Add Value</button>,
        ]: "" : ""
        }
    </div>)
}