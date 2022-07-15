import React, {useRef, useEffect} from "react"
import { CardsContract } from "../contract.service"
import AppHeaderProperties from "./AppHeaderProperties"

function AppHeader(
    { 
        cards, 
        latestCard, 
        latestCardOwner, 
        selectedCard 
    }: AppHeaderProperties) {
    const headerRef = useRef<HTMLDivElement>(null)
    const scrollEffect = () =>{
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
          <button className='App-header-addCard accent' onClick={() => CardsContract.generateCard()}>Add Card</button>
          <span>Latest Card: {latestCard?._hex} by {latestCardOwner}</span>
      </header>
    )
}

export default AppHeader;