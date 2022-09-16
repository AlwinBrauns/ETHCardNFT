import {createContext} from "react";

type ModalContextType = {
    openOfferModal: Function
}

const ModalContext = createContext({} as ModalContextType);

export default ModalContext
