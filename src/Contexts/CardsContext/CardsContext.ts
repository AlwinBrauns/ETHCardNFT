import {createContext} from "react";
import { CardsReducerState } from "../../Reducer/CardsReducer";

type CardsContextType = {
    cardsState: CardsReducerState,
    selectACard: Function,
    setNewSelectedCard: Function,
    removeCard: Function,
    addCard: Function,
    reloadCards: Function
}

const CardsContext = createContext({} as CardsContextType);

export default CardsContext
