import React, {useRef, useEffect, useContext, useState} from "react"
import { CardsContract } from "../../Services/contract.service"
import MetaMaskContext from "../../MetaMaskContext/MetaMaskContext"
import AppHeaderProperties from "./AppHeaderProperties"
import './AppHeader.scss'
import { BigNumber } from "ethers"

function AppHeader(
    { 
        cards, 
        latestCard, 
        latestCardOwner, 
        selectedCard 
    }: AppHeaderProperties) {
    const headerRef = useRef<HTMLDivElement>(null)
    const [showCardId, setShowCardId] = useState(false)
    const [latestCardCard, setLatestCardCard] = useState<string>()
    const {currentAccount, connectMetaMask } = useContext(MetaMaskContext)
    const scrollEffect = () => {
        if(headerRef.current) {  
          if(window.scrollY > headerRef.current.offsetTop - 100) {
            headerRef.current.style.setProperty("--y", "-" + (100 + (headerRef.current.clientHeight - 130 ) )+ "px") 
          }
        }
    }
    useEffect(() => {
        if(!latestCard) return
        CardsContract.getCard(latestCard).then((card: BigNumber) => {
            setLatestCardCard(card._hex)
        })
    }, [latestCard])
    useEffect(() => { 
        if(headerRef.current) {
        window.addEventListener("scroll", scrollEffect)
        }
        return () => {
        window.removeEventListener("scroll", scrollEffect)
        }
    }, [headerRef])
    return (
        <header className="App-header" ref={headerRef}>
            {!showCardId?<span className='App-header-title'>You have selected Card Nr. <br/>
            <div style={{display: "flex", flexDirection: "column"}}>
                <small>{
                    typeof selectedCard === "number" ? 
                    cards[selectedCard]?.id.slice(0,  10) 
                    ?? "-" : "-"}{
                        typeof selectedCard === "number" ? 
                        cards[selectedCard] ? "..." : "" : ""
                    }
                </small>
                {
                    typeof selectedCard === "number" ? 
                    cards[selectedCard] ? <button>Details</button>: "" : ""
                }
            </div>
            </span>:""}
            {!showCardId&&!!(currentAccount)?<button className='App-header-addCard accent' onClick={() => CardsContract.generateCard()}>Add Card</button>:null}
            {!showCardId&&!currentAccount?<button onClick={() => connectMetaMask()}>Connect with MetaMask</button>:null}
            <span style={{cursor: "pointer", wordBreak: (showCardId?"break-all":undefined)}} onClick={() => setShowCardId(prevState => {let newState = !prevState; return newState})}>{!showCardId?"Show":"Hide"} Latest Card {showCardId?(latestCardCard?latestCardCard:"" + "by" + latestCardOwner):""}</span>
      </header>
    )
}

export default AppHeader;