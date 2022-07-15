import React, {useRef, useEffect, useContext} from "react"
import { CardsContract } from "../contract.service"
import MetaMaskContext from "../MetaMaskContext/MetaMaskContext"
import AppHeaderProperties from "./AppHeaderProperties"

function AppHeader(
    { 
        cards, 
        latestCard, 
        latestCardOwner, 
        selectedCard 
    }: AppHeaderProperties) {
    const headerRef = useRef<HTMLDivElement>(null)
    const {currentAccount, connectMetaMask } = useContext(MetaMaskContext)
    const scrollEffect = () => {
        if(headerRef.current) {  
          if(window.scrollY > headerRef.current.offsetTop - 100) {
            headerRef.current.style.setProperty("--y", "-" + 100 + "px") 
          }
        }
    }
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
            <span className='App-header-title'>You have selected Card Nr. <br/>
            <small>{
                typeof selectedCard === "number" ? 
                cards[selectedCard]?.id.slice(0,  10) 
                ?? "-" : "-"}
            </small>
            </span>
            {!!(currentAccount)??<button className='App-header-addCard accent' onClick={() => CardsContract.generateCard()}>Add Card</button>}
            {!currentAccount?<button onClick={() => connectMetaMask()}>Connect with MetaMask</button>:<span>MetaMask Connected</span>}
            <span>Latest Card: {latestCard?._hex} by {latestCardOwner}</span>
      </header>
    )
}

export default AppHeader;