import {createContext} from "react";

type ModalContextType = {
    openOfferModal: Function,
    openSuccessModal: Function,
}

const ModalContext = createContext({} as ModalContextType);

export default ModalContext
