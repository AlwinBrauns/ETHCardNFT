import './CardsScreen.scss'
import Card from "../../Components/Card/Card"
import CardProperties from "../../Components/Card/CardProperties"
import CardsInteraction from "../../Components/Interaction/CardsInteraction/CardsInteraction"
import Interaction from "../../Components/Interaction/Interaction"

type CardsScreenProps = {
    cards: CardProperties[],
    selectedCard?: number,
    newSelectedCard: boolean,
    setNewSelectedCard: Function,
    selectACard: Function,
    removeCard: Function
}

export default function CardsScreen(
    {
        cards,
        selectedCard,
        newSelectedCard,
        setNewSelectedCard,
        selectACard,
        removeCard
    }: CardsScreenProps
) {
    return (
        <section className="CardsScreen">
            <Interaction changed={newSelectedCard} setChanged={setNewSelectedCard}>
                    <CardsInteraction cards={cards} selectedCard={selectedCard}/>
            </Interaction>
            {
            cards.map((card, index) => {
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