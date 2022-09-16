import React, {useRef, useEffect, useContext, useState} from "react"
import { CardsContract } from "../../Services/cards.contract.service"
import MetaMaskContext from "../../Contexts/MetaMaskContext/MetaMaskContext"
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
    
    const scrollEffect = () => {
        if(headerRef.current) {  
          if(window.scrollY > headerRef.current.offsetTop - 100) {
            headerRef.current.style.setProperty("--y", "-" + (70 + (headerRef.current.clientHeight - 130 ) )+ "px") 
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
            {!currentAccount?<button className="connect-metamask" onClick={() => connectMetaMask()}>Connect with MetaMask</button>:null}
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