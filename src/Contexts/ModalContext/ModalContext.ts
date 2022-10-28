import {createContext} from "react";
import { CardType } from "../../Reducer/CardsReducer";

type ModalContextType = {
    result: any,
    openOfferModal: () => void,
    openBuyOfferModal: () => void,
    openSuccessModal: Function,
}

const ModalContext = createContext({} as ModalContextType);

export default ModalContext
