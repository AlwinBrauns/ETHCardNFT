import { BigNumber, ethers } from 'ethers'
import { Children, ReactComponentElement, useContext, useEffect, useState } from 'react'
import { CardsContract } from '../contract.service'
import { getBalance } from '../metamask.service'
import MetaMaskContext from '../MetaMaskContext/MetaMaskContext'
import './FunctionsPanel.scss'

export default function FunctionsPanel({addCard}: {addCard: Function}) {

    const [show, setShow] = useState<boolean>(true)
    const { currentAccount } = useContext(MetaMaskContext)


    const switchShowPanel = () => {
        setShow(prevState => {
            let newState = !prevState
            return newState
        })
    }

    const Panel = () => {
        const [render, setRender] = useState<boolean>(true)
        useEffect(() => {
            if(show){
                setRender(true)
            }
        }, [show])
        return !!(currentAccount)&&render?(<div className={'panel ' + (show?'show':'hide')} 
        onAnimationEnd={(event)=>{
                if(event.animationName === 'hide') {
                    setRender(false)
                }
            }
        }>
            <button onClick={async () => console.log(ethers.utils.formatEther(await getBalance(currentAccount)) + " ETH")}>Your Balance</button>
            <button onClick={async () => {
                (await CardsContract.getCards()).forEach((_card: BigNumber) => {addCard(_card._hex)})}
            }>Show All Cards</button>
            <button onClick={async () => console.log(await CardsContract.balanceOfNFT(currentAccount))}>NFT Balance</button>
        </div>):null
    }

    return <section className='FunctionsPanel'>
    <div className={show?"show-toggel":"show-toggel"} onClick={switchShowPanel}>{show?"hide":"show"} panel</div>
    <Panel />
  </section>
}