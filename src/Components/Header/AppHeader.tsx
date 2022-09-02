import React, {useRef, useEffect, useContext, useState} from "react"
import { CardsContract } from "../../Services/cards.contract.service"
import MetaMaskContext from "../../MetaMaskContext/MetaMaskContext"
import AppHeaderProperties from "./AppHeaderProperties"
import './AppHeader.scss'
import { BigNumber } from "ethers"
import { Link } from "react-router-dom"

function AppHeader(
    { 
        latestCard
    }: AppHeaderProperties) {
    const headerRef = useRef<HTMLDivElement>(null)
    const {currentAccount, connectMetaMask } = useContext(MetaMaskContext)
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
    return (
        <header className="App-header" ref={headerRef}>
                <div className="MainFunctions">
                    {!!(NFTAmount)?<span>NFTs: {NFTAmount._hex}</span>:null}
                    {!!(currentAccount)?<button className='App-header-addCard accent' onClick={() => CardsContract.generateCard()}>Add Card</button>:null}
                    {!currentAccount?<button onClick={() => connectMetaMask()}>Connect with MetaMask</button>:null}
                </div>
                <nav>
                    <Link to={""}>
                        Your Cards
                    </Link>
                    <Link to={"marketplace"}>
                        Marketplace
                    </Link>
                </nav>
        </header>
    )
}

export default AppHeader;