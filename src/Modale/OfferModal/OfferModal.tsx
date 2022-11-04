import { useState } from "react"
import ChooseCardForm from "../../Components/ChooseCardForm/ChooseCardForm"
import { ModalResult, ModalResultTyp } from "../../Contexts/ModalContext/ModalContext"
import "./OfferModal.scss"
type OfferModalProperties = {
    setResult: React.Dispatch<React.SetStateAction<ModalResult>>,
    closeModal: () => void
}
export default function OfferModal({setResult, closeModal}: OfferModalProperties) {
  const [offerResult, setOfferResult] = useState<any>({
    description: "",
    neededWei: 0,
    online: true,
    stock: 99999,
  })
  const [formIndex, setFormIndex] = useState(0)

  const OfferForm = ({
    initialValues = {
      description: "",
      neededWei: 0,
      online: true,
      stock: 99999,
    },
  }) => {
    const [description, setDescription] = useState(initialValues.description)
    const [neededWei, setNeededWei] = useState(initialValues.neededWei)
    const [online, setOnline] = useState(initialValues.online)
    const [stock, setStock] = useState(initialValues.stock)

    return (
      <>
        <input
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.currentTarget.value)}
          type={"text"}
        ></input>
        <label>
          <span>price (wei)</span>
          <input
            placeholder="neededWei"
            value={neededWei}
            onChange={(e) => setNeededWei(parseInt(e.currentTarget.value))}
            type={"number"}
            min="0"
          ></input>
        </label>
        <label>
          <input type={"checkbox"} checked={online} onChange={() => setOnline((prevState) => !prevState)} />
          <span>Set Public</span>
        </label>
        <button
          onClick={() => {
            const result = {
              description: description,
              neededWei: neededWei,
              online: online,
              stock: stock,
            }
            setOfferResult((prevState: any) => ({
              ...prevState,
              ...result,
            }))
            setFormIndex((prevState) => {
              const newState = prevState + 1
              return newState
            })
          }}
        >
          Choose Card to create Offer
        </button>
      </>
    )
  }

  const finishOffer = (offerCard: string) => {
    setResult((prevState) => {
      let newState = {...prevState}
      newState[ModalResultTyp.OFFER] = {
        ...offerResult,
        offerCard: offerCard
      }
      return newState
    })
    closeModal()
  }

  const forms = [
    <OfferForm
      initialValues={{
        description: offerResult.description,
        neededWei: offerResult.neededWei,
        online: offerResult.online,
        stock: offerResult.stock,
      }}
    ></OfferForm>,
    <ChooseCardForm onFinish={finishOffer}></ChooseCardForm>,
  ]

  return (
    <div className="modal-content offer">
      <h4>
        Create Offer {formIndex + 1}/{forms.length}
      </h4>
      {formIndex > 0 ? (
        <div className="back" onClick={() => setFormIndex((prevIndex) => --prevIndex)}>
          <div></div>
          <div></div>
        </div>
      ) : null}
      {forms[formIndex]}
    </div>
  )
}
