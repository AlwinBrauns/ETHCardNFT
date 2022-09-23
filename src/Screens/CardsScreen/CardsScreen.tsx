import './CardsScreen.scss'
import Card from "../../Components/Card/Card"
import CardProperties from "../../Components/Card/CardProperties"
import CardsInteraction from "../../Components/Interaction/CardsInteraction/CardsInteraction"
import Interaction from "../../Components/Interaction/Interaction"
import { CardType } from '../../Reducer/CardsReducer'
import { useContext } from 'react'
import CardsContext from '../../Contexts/CardsContext/CardsContext'

export default function CardsScreen() {
    const {cardsState, selectACard, setNewSelectedCard, removeCard, addCard} = useContext(CardsContext)

    return (
        <section className="CardsScreen">
            <Interaction changed={cardsState.newSelectedCard} setChanged={setNewSelectedCard}>
                    <CardsInteraction cards={cardsState.cards} selectedCard={cardsState.selectedCard}/>
            </Interaction>
            {
                cardsState.cards.map((card, index) => {
                    return (
                    card.id?
                        <Card
                        key={card.id}
                        text={card.text}
                        cardAddress={card.cardAddress}
                        onClick={() => selectACard(card.id)}
                        onDelete={() => {removeCard(index)}}
                        id={card.id}
                        />:null
                    )
                })
            }
        </section>
    )
}