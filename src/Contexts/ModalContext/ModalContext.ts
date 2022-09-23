import {createContext} from "react";

type ModalContextType = {
    result: any,
    openOfferModal: Function,
    openSuccessModal: Function,
}

const ModalContext = createContext({} as ModalContextType);

export default ModalContext
