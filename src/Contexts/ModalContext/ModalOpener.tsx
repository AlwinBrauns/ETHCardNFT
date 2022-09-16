import { ChangeEvent, ChangeEventHandler, useEffect, useMemo, useRef, useState } from "react";
import ModalContext from "./ModalContext";

import "./Modal.scss"

export default function ModalOpener({children}: {children: React.ReactNode}) {
    const [show, setShow] = useState(false)
    const [modalClassAddition, setModalClassAddition] = useState("")
    const [Content, setContent] = useState(() => <></>)
    const [resultPromise, setResultPromise] = useState({resolve: (data: any) => {}, reject: (data: any) => {}})
    const getModalClass = () => (("Modal" + (show?" show ":" hide ")) + modalClassAddition)
    const [modalClass, setModalClass] = useState(getModalClass())

    useEffect(() => {
        console.log(getModalClass())
        setModalClass(getModalClass())
    }, [show, modalClassAddition])

    enum CloseModalE {
        DO_REJECT,
        DONT_REJECT
    }
    const closeModal = (doReject: CloseModalE) => {
        if(doReject === CloseModalE.DO_REJECT) resultPromise.reject({message: "Modal got closed before resolve!"})
        setShow(false)
        setContent(() => <></>)
        setModalClassAddition("")
    }

    type OfferModal = {
        resolve: Function,
        reject: Function
    }
    const OfferModal = ({resolve, reject}: OfferModal) => {
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
                    resolve({
                        description: description,
                        neededWei: neededWei,
                        online: online,
                        stock: stock
                    })
                    closeModal(CloseModalE.DONT_REJECT);
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
                    closeModal(CloseModalE.DONT_REJECT)
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
        const promise = new Promise((resolve, reject) => {
            setContent(<OfferModal reject={reject} resolve={resolve}></OfferModal>)
            setResultPromise({
                resolve: (data) => resolve(data),
                reject: (data) => reject(data)
            })
        })
        return promise
    }

    const openSuccessModal = (message: string) => {
        setModalClassAddition("success")
        setShow(true)
        setContent(<SuccessModal message={message}></SuccessModal>)
    }

    const Modal = () => (
        <div className={modalClass}>
            <div className="close" onClick={() => closeModal(CloseModalE.DO_REJECT)}>Close</div>
            {Content}
        </div>
    )

    return <ModalContext.Provider value={
        {
            openOfferModal: openOfferModal,
            openSuccessModal: openSuccessModal
        }
    }>
        <Modal></Modal>
        {children}
    </ModalContext.Provider>
}