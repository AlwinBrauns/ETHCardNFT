import { ReactNode } from "react"
import CardProperties from "../../Card/CardProperties"

import "./CardsInteraction.scss"

type CardsInteractionWrapperProps = {
    children: ReactNode,
    selectedCard?: Number,
    cards: CardProperties[]
}
export default function CardsInteractionWrapper({children, selectedCard, cards}: CardsInteractionWrapperProps) {
    return (
        <div className='selected-card-container'>
            <h4>You have selected Card Nr. </h4>
            <small>
                {
                    typeof selectedCard === "number" ? 
                    cards[selectedCard]?.id.slice(0,  10) 
                    ?? "-" : "-"
                }
                {
                    typeof selectedCard === "number" ? 
                    cards[selectedCard] ? "..." : "" : ""
                }
            </small>
            {
                children
            }
        </div>
    )
}