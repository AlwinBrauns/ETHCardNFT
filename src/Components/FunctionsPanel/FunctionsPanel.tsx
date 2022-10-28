import { BigNumber, ethers } from "ethers"
import { ReactNode, useContext, useEffect, useState } from "react"
import { CardsContract } from "../../Services/cards.contract.service"
import { getBalance } from "../../Services/metamask.service"
import MetaMaskContext from "../../Contexts/MetaMaskContext/MetaMaskContext"
import "./FunctionsPanel.scss"
import { useLocation } from "react-router-dom"
import { OfferContractService } from "../../Services/offer.contract.service"
import ModalContext from "../../Contexts/ModalContext/ModalContext"
import CardsContext from "../../Contexts/CardsContext/CardsContext"

type FunctionsPanelProperties = {
    children: ReactNode
}
export default function FunctionsPanel({children}: FunctionsPanelProperties) {
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
      <Panel show={show}>
        {children}
      </Panel>
    </section>
  )
}

function Panel({ show, children}: { show: boolean, children: ReactNode}) {
  const { currentAccount } = useContext(MetaMaskContext)
  const [isHidden, setIsHidden] = useState<boolean>(false)
  const {openSuccessModal} = useContext(ModalContext)

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
      <button onClick={async () => openSuccessModal(ethers.utils.formatEther(await getBalance(currentAccount)) + " ETH")}>
        Your Balance
      </button>
      {children}
    </div>
  ) : null
}
