import { BigNumber } from "ethers"

export enum CardsReducerActions {
  ADD_CARD = "ADD_CARD",
  REMOVE_CARD = "REMOVE_CARD",
  REMOVE_ALL_CARDS = "REMOVE_ALL_CARDS",
  SELECTED_NEW_CARD_ON = "SELECTED_NEW_CARD_ON",
  SELECTED_NEW_CARD_OFF = "SELECTED_NEW_CARD_OFF",
  SET_LATEST_CARD = "SET_LATEST_CARD",
  SET_LATEST_CARDOWNER = "SET_LATEST_CARDOWNER",
  SET_SELECTED_CARD = "SET_SELECTED_CARD",
}
export type CardType = {
  id: string
  text: string
  cardAddress: string
  onClick: Function
}
export type CardsReducerAction = {
  type: string
  card?: BigNumber
  cardAddress?: string
  latestCard?: string
  latestCardOwner?: string
  selectedCard?: number
  removeCardNumber?: number
}
export type CardsReducerState = {
  cards: CardType[]
  latestCard: string
  latestCardOwner: string
  selectedCard: number
  newSelectedCard: boolean
}
export const initialCardsState: CardsReducerState = {
  cards: [],
  latestCard: "",
  latestCardOwner: "",
  selectedCard: 0,
  newSelectedCard: false,
}
export function cardsReducer(state: CardsReducerState, action: CardsReducerAction): CardsReducerState {
  switch (action.type) {
    case CardsReducerActions.ADD_CARD:
      if (!action.card || !action.cardAddress) throw new Error("missing action arguments")
      let newCardsWithAdded = state.cards
      const uniqueID: string = action.card._hex
      const newCard: CardType = {
        id: uniqueID,
        text: `Card`,
        cardAddress: action.cardAddress,
        onClick: () => {},
      }
      if (!state.cards.map((elem) => elem.id).includes(uniqueID)) {
        newCardsWithAdded = [...newCardsWithAdded, newCard]
      }
      return { ...state, cards: newCardsWithAdded }
    case CardsReducerActions.REMOVE_CARD:
      if (action.removeCardNumber === undefined) throw new Error("missing action arguments")
      const newCardsWithRemoved = state.cards.filter((card, index) => index !== action.removeCardNumber)
      newCardsWithRemoved.forEach((card, index) => {
        card.onClick = () => {
          state.selectedCard = index
        }
      })
      return { ...state, cards: newCardsWithRemoved }
    case CardsReducerActions.SELECTED_NEW_CARD_ON:
      return { ...state, newSelectedCard: true }
    case CardsReducerActions.SELECTED_NEW_CARD_OFF:
      return { ...state, newSelectedCard: false }
    case CardsReducerActions.SET_LATEST_CARD:
      if (action.latestCard === undefined) throw new Error("missing action arguments")
      return { ...state, latestCard: action.latestCard }
    case CardsReducerActions.SET_LATEST_CARDOWNER:
      if (action.latestCardOwner === undefined) throw new Error("missing action arguments")
      return { ...state, latestCardOwner: action.latestCardOwner }
    case CardsReducerActions.SET_SELECTED_CARD:
      if (action.selectedCard === undefined) throw new Error("missing action arguments")
      return { ...state, selectedCard: action.selectedCard }
    case CardsReducerActions.REMOVE_ALL_CARDS:
      return { ...state, cards: [], latestCard: "", latestCardOwner: "" }
    default:
      throw new Error()
  }
}
