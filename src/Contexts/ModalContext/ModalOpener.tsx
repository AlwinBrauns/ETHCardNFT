import { ChangeEvent, ChangeEventHandler, useState } from "react";
import ModalContext from "./ModalContext";

import "./Modal.scss"

export default function ModalOpener({children}: {children: React.ReactNode}) {

    
    const [show, setShow] = useState(false)
    const [Content, setContent] = useState(() => <></>)
    const [resultPromise, setResultPromise] = useState({resolve: (data: any) => {}, reject: (data: any) => {}})
    const getModalClass = () => ("Modal" + (show?" show ":" hide "))

    const closeModal = () => {
        setShow(false)
        setContent(() => <></>)
        resultPromise.reject({message: "Modal got closed!"})
    }

    type OfferModal = {
        resolve: Function,
        reject: Function
    }
    const OfferModal = ({resolve, reject}: OfferModal) => {
        const [description, setDescription] = useState("")
        const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setDescription(e.currentTarget.value)
        }

        return (
            <div>
                <input value={description} onChange={handleDescriptionChange} type={"text"}></input>
                OFFER MODAL
                <button onClick={() => {
                    resolve({
                        description: description
                    })
                }}>Create</button>
            </div>
        )
    }

    const openOfferModal = () => {
        setShow(true)
        const promise = new Promise((resolve, reject) => {
            setContent(<OfferModal reject={reject} resolve={resolve}></OfferModal>)
            setResultPromise({
                resolve: (data) => resolve(data),
                reject: (data) => reject(data)
            })
        })
        return promise
    }

    const Modal = () => (
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