import {useRef, useEffect, useContext} from "react"
import MetaMaskContext from "../../Contexts/MetaMaskContext/MetaMaskContext"
import './AppHeader.scss'
import { NavLink } from "react-router-dom"

function AppHeader() {
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
                    <NavLink to={"transactions"} style={({isActive}) => ({textDecoration: isActive?"underline":"none"})}>
                        Transactions
                    </NavLink>
                </nav>
        </header>
    )
}

export default AppHeader;