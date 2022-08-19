import React, {useRef, useEffect, useContext, useState} from "react"
import { CardsContract } from "../../Services/cards.contract.service"
import MetaMaskContext from "../../MetaMaskContext/MetaMaskContext"
import AppHeaderProperties from "./AppHeaderProperties"
import './AppHeader.scss'
import { BigNumber, ethers } from "ethers"
import CardsInteraction from "./CardsInteraction/CardsInteraction"

function AppHeader(
    { 
        cards, 
        latestCard, 
        selectedCard 
    }: AppHeaderProperties) {
    const headerRef = useRef<HTMLDivElement>(null)
    const {currentAccount, connectMetaMask } = useContext(MetaMaskContext)
    const [newSelectedCard, setNewSelectedCard] = useState<boolean>(false)
    const [NFTAmount, setNFTAmount] = useState<BigNumber>()
    const scrollEffect = () => {
        if(headerRef.current) {  
          if(window.scrollY > headerRef.current.offsetTop - 100) {
            headerRef.current.style.setProperty("--y", "-" + (70 + (headerRef.current.clientHeight - 130 ) )+ "px") 
          }
        }
    }
    useEffect(() => {
        if(latestCard===undefined) return
        CardsContract.balanceOfNFT(currentAccount).then((balance: BigNumber) => {
            setNFTAmount(balance)
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
            <div 
                className={"selected-card " + (newSelectedCard?"new":"")} 
                onTransitionEnd={(event: React.TransitionEvent) => {
                    if(event.elapsedTime > 0.2 && event.propertyName === "top") setNewSelectedCard(false)
                }}
            >
                {
                        <div className='selected-card-container'>
                            <h4>You have selected Card Nr. </h4>
                            <small>
                                {
                                    typeof selectedCard === "number" ? 
                                    cards[selectedCard]?.id.slice(0,  10) 
                                    ?? "-" : "-"
                                }
                                {
                                    typeof selectedCard === "number" ? 
                                    cards[selectedCard] ? "..." : "" : ""
                                }
                            </small>
                            <CardsInteraction selectedCard={selectedCard} cards={cards} />
                        </div>
                }
            </div>
            {!!(NFTAmount)?<span>NFTs: {NFTAmount._hex}</span>:null}
            {!!(currentAccount)?<button className='App-header-addCard accent' onClick={() => CardsContract.generateCard()}>Add Card</button>:null}
            {!currentAccount?<button onClick={() => connectMetaMask()}>Connect with MetaMask</button>:null}
      </header>
    )
}

export default AppHeader;