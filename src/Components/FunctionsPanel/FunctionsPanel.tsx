import { BigNumber, ethers } from "ethers"
import { useContext, useEffect, useState } from "react"
import { CardsContract } from "../../Services/cards.contract.service"
import { getBalance } from "../../Services/metamask.service"
import MetaMaskContext from "../../Contexts/MetaMaskContext/MetaMaskContext"
import "./FunctionsPanel.scss"
import { useLocation } from "react-router-dom"
import { OfferContractService } from "../../Services/offer.contract.service"
import ModalContext from "../../Contexts/ModalContext/ModalContext"
import { CardType } from "../../Reducer/CardsReducer"
import CardsContext from "../../Contexts/CardsContext/CardsContext"

export default function FunctionsPanel() {
  const [show, setShow] = useState<boolean>(true)

  const switchShowPanel = () => {
    setShow((prevState) => {
      let newState = !prevState
      return newState
    })
  }

  return (
    <section className="FunctionsPanel">
      <div className={"show-toggel " + (show ? "show" : "hide")} onClick={switchShowPanel}>
        {show ? "hide" : "show"} panel
      </div>
      <Panel show={show} />
    </section>
  )
}

function Panel({ show }: { show: boolean}) {
  const { currentAccount } = useContext(MetaMaskContext)
  const { result, openOfferModal } = useContext(ModalContext)
  const [isHidden, setIsHidden] = useState<boolean>(false)
  const location = useLocation()
  const {cardsState, reloadCards} = useContext(CardsContext)

  type OfferType = {
    offerCard: string
    description: string
    neededWei: number
    online: boolean
    stock: number
  }
  const handleOfferModalFormData = (offerData: OfferType) => {
    const isValid = () => !!offerData.offerCard
    if (isValid()) {
      console.log(offerData)
      let offer = OfferContractService.createOffer(
        offerData.offerCard,
        offerData.description,
        offerData.neededWei,
        offerData.online,
        offerData.stock
      )
    } else {
      console.log("wrong input: ", offerData)
    }
  }

  useEffect(() => {
    if (result?.offer) {
      handleOfferModalFormData(result.offer)
    }
  }, [result])

  const addOffer = () => {
    openOfferModal()
  }

  const MainFunction = () => {
    if (location.pathname === "/marketplace") {
      return !!currentAccount ? (
        <>
        <button className="App-header-addOffer accent" onClick={() => addOffer()}>
          Add Offer
        </button>
        <button
          onClick={() => {}}>
          Load All Offers
        </button>
        </>
      ) : null
    } else {
      return !!currentAccount ? (
        <>
        <button className="App-header-addCard accent" onClick={() => CardsContract.generateCard()}>
          Add Card
        </button>
        <button
          onClick={() => reloadCards()}>
          Load All Cards
        </button>
        </>
      ) : null
    }
  }

  useEffect(() => {
    if (show && isHidden) {
      setIsHidden(false)
    }
  }, [show])

  return !!currentAccount ? (
    <div
      className={"panel " + (show ? "show" : "hide") + (isHidden ? " hidden" : "")}
      onAnimationEnd={(event) => {
        if (event.animationName === "hide") {
          setIsHidden(true)
        }
      }}
    >
      <button onClick={async () => console.log(ethers.utils.formatEther(await getBalance(currentAccount)) + " ETH")}>
        Your Balance
      </button>
      <MainFunction />
    </div>
  ) : null
}
