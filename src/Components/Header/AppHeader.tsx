import React, {useRef, useEffect, useContext, useState} from "react"
import { CardsContract } from "../../Services/cards.contract.service"
import MetaMaskContext from "../../MetaMaskContext/MetaMaskContext"
import AppHeaderProperties from "./AppHeaderProperties"
import './AppHeader.scss'
import { BigNumber } from "ethers"
import { Link, NavLink, useLocation } from "react-router-dom"
import { Offer } from "../../Services/offer.contract.service"

function AppHeader(
    { 
        latestCard
    }: AppHeaderProperties) {
    const headerRef = useRef<HTMLDivElement>(null)
    const {currentAccount, connectMetaMask } = useContext(MetaMaskContext)
    const [NFTAmount, setNFTAmount] = useState<BigNumber>()
    const location = useLocation();
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
    const MainFunction = () => {
        if(location.pathname === "/marketplace") {
            return !!(currentAccount)?<button className='App-header-addOffer accent' onClick={() => latestCard?Offer.createOffer(
                latestCard, "test", 1000, true, 9999999
            ):null}>Add Offer</button>:null
        }else {
            return !!(currentAccount)?<button className='App-header-addCard accent' onClick={() => CardsContract.generateCard()}>Add Card</button>:null
        }
    }
    return (
        <header className="App-header" ref={headerRef}>
                <div className="MainFunctions">
                    {!!(NFTAmount)?<span>NFTs: {NFTAmount._hex}</span>:null}
                    <MainFunction />
                    {!currentAccount?<button onClick={() => connectMetaMask()}>Connect with MetaMask</button>:null}
                </div>
                <nav>
                    <NavLink to={""} style={({isActive}) => ({textDecoration: isActive?"underline":"none"})}>
                        Your Cards
                    </NavLink>
                    <NavLink to={"marketplace"} style={({isActive}) => ({textDecoration: isActive?"underline":"none"})}>
                        Marketplace
                    </NavLink>
                </nav>
        </header>
    )
}

export default AppHeader;