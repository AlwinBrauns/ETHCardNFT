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
    const [newSelectedCard, setNewSelectedCard] = useState<boolean>(false)
    const scrollEffect = () => {
        if(headerRef.current) {  
          if(window.scrollY > headerRef.current.offsetTop - 100) {
            headerRef.current.style.setProperty("--y", "-" + (70 + (headerRef.current.clientHeight - 130 ) )+ "px") 
          }
        }
    }
    useEffect(() => {
        if(latestCard===undefined) return
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
    useEffect(() => {
        if(!(typeof selectedCard === "number")) {
            setNewSelectedCard(false)
            return
        }
        if(!(selectedCard+1 > 0)) {
            setNewSelectedCard(false)
            return
        }
        setNewSelectedCard(true)

    }, [selectedCard])
    return (
        <header className="App-header" ref={headerRef}>
            <div className={"selected-card " + (newSelectedCard?"new":"")} onTransitionEnd={(event: React.TransitionEvent) => {
                    if(event.elapsedTime > 0.2 && event.propertyName === "top") setNewSelectedCard(false)
                }}>
                {!showCardId?<div className='selected-card-container'>
                    <h4>You have selected Card Nr. </h4>
                    <small>
                        {
                            typeof selectedCard === "number" ? 
                            cards[selectedCard]?.id.slice(0,  10) 
                            ?? "-" : "-"}{
                                typeof selectedCard === "number" ? 
                                cards[selectedCard] ? "..." : "" : ""
                        }
                    </small>
                    <div>
                        
                        {
                            typeof selectedCard === "number" ? 
                            cards[selectedCard] ? [
                                <button key={0}>Details</button>,
                                <button key={1}>Get Value</button>,
                                <button key={2}>Add Value</button>,
                        ]: "" : ""
                        }
                    </div>
                </div>:""}
            </div>
            {!showCardId&&!!(currentAccount)?<button className='App-header-addCard accent' onClick={() => CardsContract.generateCard()}>Add Card</button>:null}
            {!showCardId&&!currentAccount?<button onClick={() => connectMetaMask()}>Connect with MetaMask</button>:null}
            <span style={{cursor: "pointer", wordBreak: (showCardId?"break-all":undefined)}} onClick={() => setShowCardId(prevState => {let newState = !prevState; return newState})}>{!showCardId?"Show":"Hide"} Latest Card {showCardId?(latestCardCard?latestCardCard:"" + "by" + latestCardOwner):""}</span>
      </header>
    )
}

export default AppHeader;