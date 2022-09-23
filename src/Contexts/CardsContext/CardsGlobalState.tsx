import { BigNumber } from "ethers";
import { CardsContract } from "../../Services/cards.contract.service";
import { useCards } from "../../States/CardsState";
import CardsContext from "./CardsContext";

export default function CardsGlobalState({children}: {children: React.ReactNode}) {
    const {cardsState, selectACard, setNewSelectedCard, removeCard, addCard} = useCards()

    const reloadCards = () => {
        CardsContract.getCards().then(
            result => {
              result.forEach(
                (cardAddress: string) => {
                  CardsContract.getCard(cardAddress).then(
                    (card: BigNumber) => {
                      addCard(card, cardAddress)
                    }
                  )
                }
              )
            }
          )
    }
    return <CardsContext.Provider value={
        {
            cardsState,
            selectACard,
            setNewSelectedCard,
            removeCard,
            addCard,
            reloadCards
        }
    }>
        {children}
    </CardsContext.Provider>
}