import { useEffect, useRef, useState } from "react"
import ModalContext from "./ModalContext"

import "./Modal.scss"
import OfferModal from "../../Modale/OfferModal/OfferModal"

export default function ModalOpener({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(false)
  const [modalClassAddition, setModalClassAddition] = useState("")
  const [Content, setContent] = useState(() => <></>)
  const getModalClass = () => "Modal" + (show ? " show " : " hide ") + modalClassAddition
  const [modalClass, setModalClass] = useState(getModalClass())
  const [result, setResult] = useState<Object>({})

  useEffect(() => {
    setModalClass(getModalClass())
  }, [show, modalClassAddition])

  const closeModal = () => {
    setShow(false)
    setContent(() => <></>)
    setModalClassAddition("")
  }

  type SuccesModalProperties = {
    message: string
    closeTime?: number
  }
  const SuccessModal = ({ message, closeTime = 4000 }: SuccesModalProperties) => {
    const content = useRef(null)
    let _startetOnce = false
    useEffect(() => {
      //@ts-ignore
      if (content?.current?.style?.setProperty) content.current.style.setProperty("--t", `${closeTime / 1000}s`)
      if (!_startetOnce) {
        _startetOnce = true
        new Promise((resolve) => {
          setTimeout(() => {
            resolve(null)
          }, closeTime)
        }).then(() => {
          closeModal()
        })
      }
    }, [])
    return (
      <div className="modal-content" ref={content}>
        <span className="closetime-indicator"></span>
        <span>{message}</span>
      </div>
    )
  }

  const openOfferModal = () => {
    setShow(true)
    setContent(
    <OfferModal 
      setResult={setResult}
      closeModal={closeModal}
    />)
  }

  const openSuccessModal = (message: string) => {
    setModalClassAddition("success")
    setShow(true)
    setContent(<SuccessModal message={message}></SuccessModal>)
  }

  const Modal = () => (
    <div className={modalClass}>
      <div className="close" onClick={() => closeModal()}>
        Close
      </div>
      {Content}
    </div>
  )

  return (
    <ModalContext.Provider
      value={{
        result: result,
        openOfferModal: openOfferModal,
        openSuccessModal: openSuccessModal,
      }}
    >
      <Modal></Modal>
      {children}
    </ModalContext.Provider>
  )
}
