import { BigNumber } from "ethers"
import { useContext, useEffect, useReducer } from "react"
import MetaMaskContext from "../Contexts/MetaMaskContext/MetaMaskContext"
import { cardsReducer, CardsReducerActions, initialCardsState } from "../Reducer/CardsReducer"
import { CardsContract } from "../Services/cards.contract.service"

export function useCards() {
  const [cardsState, cardsDispatch] = useReducer(cardsReducer, initialCardsState)
  const { currentAccount } = useContext(MetaMaskContext)

  const selectACard = (uid: string) => {
    const index = cardsState.cards.findIndex((elem) => {
      return elem.id === uid
    })
    cardsDispatch({ type: CardsReducerActions.SET_SELECTED_CARD, selectedCard: index })
  }

  const addCard = async (card: BigNumber, cardAddress: string) => {
    cardsDispatch({ type: CardsReducerActions.ADD_CARD, card: card, cardAddress: cardAddress })
  }

  const removeCard = (number: number) => {
    cardsDispatch({ type: CardsReducerActions.REMOVE_CARD, removeCardNumber: number })
  }

  const setNewSelectedCard = (on: boolean) => {
    if (on) {
      cardsDispatch({ type: CardsReducerActions.SELECTED_NEW_CARD_ON })
    } else {
      cardsDispatch({ type: CardsReducerActions.SELECTED_NEW_CARD_OFF })
    }
  }
  
  useEffect(() => {
    if (!(typeof cardsState.selectedCard === "number")) {
      cardsDispatch({ type: CardsReducerActions.SELECTED_NEW_CARD_OFF })
      return
    }
    if (!(cardsState.selectedCard + 1 > 0)) {
      cardsDispatch({ type: CardsReducerActions.SELECTED_NEW_CARD_OFF })
      return
    }
    cardsDispatch({ type: CardsReducerActions.SELECTED_NEW_CARD_ON })
  }, [cardsState.selectedCard])

  const onNewCard = (cardAddress: string, owner: string) => {
    CardsContract.getCard(cardAddress).then((card) => {
      cardsDispatch({ type: CardsReducerActions.SET_LATEST_CARD, latestCard: cardAddress })
      cardsDispatch({ type: CardsReducerActions.SET_LATEST_CARDOWNER, latestCardOwner: owner })

      if (owner.toString().toUpperCase() === currentAccount.toString().toUpperCase()) {
        cardsDispatch({ type: CardsReducerActions.ADD_CARD, card: card, cardAddress: cardAddress })
      }
    })
  }

  useEffect(() => {
    if (window.ethereum && currentAccount) {
      setTimeout(() => {
        CardsContract.subscribeToNewCardListener(onNewCard)
      }, 100)
    }
    if (!currentAccount) {
      cardsDispatch({ type: CardsReducerActions.REMOVE_ALL_CARDS })
      CardsContract.unsubscribeFromNewCardListener(onNewCard)
    }
    return () => {
      CardsContract.unsubscribeFromNewCardListener(onNewCard)
    }
  }, [currentAccount])

  useEffect(() => {
    if (cardsState.cards.length <= cardsState.selectedCard) {
      cardsDispatch({ type: CardsReducerActions.SET_SELECTED_CARD, selectedCard: cardsState.cards.length - 1 })
    }
  }, [cardsState.cards])

  return {
    cardsState: cardsState,
    cardsDispatch: cardsDispatch,
    selectACard: selectACard,
    removeCard: removeCard,
    addCard: addCard,
    setNewSelectedCard: setNewSelectedCard,
  }
}
