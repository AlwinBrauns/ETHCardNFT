import { ChangeEvent, ChangeEventHandler, useEffect, useMemo, useRef, useState } from "react";
import ModalContext from "./ModalContext";

import "./Modal.scss"

export default function ModalOpener({children}: {children: React.ReactNode}) {
    const [show, setShow] = useState(false)
    const [modalClassAddition, setModalClassAddition] = useState("")
    const [Content, setContent] = useState(() => <></>)
    const getModalClass = () => (("Modal" + (show?" show ":" hide ")) + modalClassAddition)
    const [modalClass, setModalClass] = useState(getModalClass())
    const [result, setResult] = useState<any>(null)

    useEffect(() => {
        setModalClass(getModalClass())
    }, [show, modalClassAddition])

    const closeModal = () => {
        setShow(false)
        setContent(() => <></>)
        setModalClassAddition("")
    }

    const OfferModal = () => {
        const [description, setDescription] = useState("")
        const [neededWei, setNeededWei] = useState(0)
        const [online, setOnline] = useState(true)
        const [stock, setStock] = useState(99999)

        return (
            <div className="content">
                <h4>Create Offer</h4>
                <input placeholder="description" value={description} onChange={(e) => setDescription(e.currentTarget.value)} type={"text"}></input>
                <label>
                    <span>price (wei)</span>
                    <input placeholder="neededWei" value={neededWei} onChange={(e) => setNeededWei(parseInt(e.currentTarget.value))} type={"number"} min="0"></input>
                </label>
                <label>
                    <input type={"checkbox"} 
                    checked={online}
                    onChange={() => setOnline(prevState => !prevState)}
                    />
                    <span>Set Public</span>
                </label>
                <button onClick={() => {
                    const result = {
                        description: description,
                        neededWei: neededWei,
                        online: online,
                        stock: stock
                    }
                    setResult(result);
                    closeModal();
                }}>Create</button>
            </div>
        )
    }
    type SuccesModalProperties = {
        message: string,
        closeTime?: number
    }
    const SuccessModal = ({message, closeTime=4000}:SuccesModalProperties) => {
        const content = useRef(null)
        let _startetOnce = false
        useEffect(() => {
            //@ts-ignore
            if(content?.current?.style?.setProperty) content.current.style.setProperty("--t", `${closeTime/1000}s`)
            if(!(_startetOnce)){
                _startetOnce = true
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve(null)
                    }, closeTime)
                }).then(() => {
                    closeModal()
                })
            }
        }, [])
        return <div className="content" ref={content}>
            <span className="closetime-indicator"></span>
            <span>{message}</span>
        </div>
    }

    const openOfferModal = () => {
        setShow(true)
        setContent(<OfferModal></OfferModal>)
    }

    const openSuccessModal = (message: string) => {
        setModalClassAddition("success")
        setShow(true)
        setContent(<SuccessModal message={message}></SuccessModal>)
    }

    const Modal = () => (
        <div className={modalClass}>
            <div className="close" onClick={() => closeModal()}>Close</div>
            {Content}
        </div>
    )

    return <ModalContext.Provider value={
        {
            result: result,
            openOfferModal: openOfferModal,
            openSuccessModal: openSuccessModal
        }
    }>
        <Modal></Modal>
        {children}
    </ModalContext.Provider>
}