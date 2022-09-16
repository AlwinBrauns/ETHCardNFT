import { useState } from "react";
import ModalContext from "./ModalContext";

import "./Modal.scss"

export default function ModalOpener({children}: {children: React.ReactNode}) {

    const [show, setShow] = useState(false)
    const [Content, setContent] = useState(() => <></>)
    const [resultPromise, setResultPromise] = useState({resolve: () => {}, reject: () => {}})

    const getModalClass = () => ("Modal" + (show?" show ":" hide "))

    const closeModal = () => {
        setShow(false)
        setContent(() => <></>)
        resultPromise.resolve()
    }

    const OfferModal = () => {
        return (
            <div>
                OFFER MODAL
            </div>
        )
    }

    const openOfferModal = () => {
        setShow(true)
        setContent(<OfferModal></OfferModal>)
        const promise = new Promise((resolve, reject) => {
            setResultPromise({
                resolve: () => resolve({data: "abc"}),
                reject: () => reject({error: "abc"})
            })
        })
        return promise
    }

    const Modal = ({children}: {children?: React.ReactNode}) => (
        <div className={getModalClass()}>
            <div className="close" onClick={closeModal}>Close</div>
            {Content}
        </div>
    )

    return <ModalContext.Provider value={
        {
            openOfferModal: openOfferModal
        }
    }>
        <Modal></Modal>
        {children}
    </ModalContext.Provider>
}