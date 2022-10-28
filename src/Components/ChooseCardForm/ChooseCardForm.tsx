import { useContext, useEffect, useState } from "react"
import CardsContext from "../../Contexts/CardsContext/CardsContext"
import Card from "../Card/Card"
type ChooseCardFormProperties = {
    onFinish: (selectedCard: string) => void
}
export default function ChooseCardForm({onFinish}: ChooseCardFormProperties) {
    const [selectedCard, setSelectedCard] = useState("")
    const { cardsState, reloadCards } = useContext(CardsContext)
    useEffect(() => {
      reloadCards()
    }, [])
    return (
      <>
        <h5>choose your card</h5>
        <div className="card-choice">
          {cardsState.cards.map((card) => (
            <Card
                key={card.id}
              id={card.id}
              text={card.text}
              cardAddress={card.cardAddress}
              onClick={() => {
                setSelectedCard(card.cardAddress)
              }}
              classAddition={selectedCard === card.cardAddress ? "selected" : ""}
            ></Card>
          ))}
        </div>
        <button
          onClick={() => { 
            onFinish(selectedCard)
          }}
        >
          Create Offer
        </button>
      </>
    )
  }