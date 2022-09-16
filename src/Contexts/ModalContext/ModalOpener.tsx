import ModalContext from "./ModalContext";

export default function ModalOpener({children}: {children: React.ReactNode}) {
    
    const openOfferModal = () => {

    }

    return <ModalContext.Provider value={
        {
            openOfferModal: openOfferModal
        }
    }>
        {children}
    </ModalContext.Provider>
}