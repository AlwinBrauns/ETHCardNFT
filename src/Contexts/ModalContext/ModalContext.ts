import {createContext} from "react";
import { OfferType } from "../../Reducer/OffersReducer";

export enum ModalResultTyp{
    OFFER = "offer",
}
  
export type ModalResult = {
[ModalResultTyp.OFFER]?: OfferType
}

type ModalContextType = {
    result: any,
    reset: (resultTyp: ModalResultTyp) => void,
    openOfferModal: () => void,
    openBuyOfferModal: (offer: OfferType) => void,
    openSuccessModal: Function,
}

const ModalContext = createContext({} as ModalContextType);

export default ModalContext
