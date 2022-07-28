import { BigNumber, ethers } from 'ethers'
import { useContext, useEffect, useState } from 'react'
import { CardsContract } from '../../Services/contract.service'
import { getBalance } from '../../Services/metamask.service'
import MetaMaskContext from '../../MetaMaskContext/MetaMaskContext'
import './FunctionsPanel.scss'

export default function FunctionsPanel({addCard}: {addCard: Function}) {
    const [show, setShow] = useState<boolean>(true)

    const switchShowPanel = () => {
        setShow(prevState => {
            let newState = !prevState
            return newState
        })
    }

    return <section className='FunctionsPanel'>
        <div className="show-toggel" onClick={switchShowPanel}>{show?"hide":"show"} panel</div>
        <Panel show={show} addCard={(card: BigNumber, cardAddress: string) => addCard(card, cardAddress)}/>
    </section>
}

function Panel ({show, addCard}:{show:boolean, addCard:Function}) {
    const { currentAccount } = useContext(MetaMaskContext)

    const [isHidden, setIsHidden] = useState<boolean>(false)
    useEffect(() => {
        if(show && isHidden){
            setIsHidden(false)
        }
    }, [show])
    return !!(currentAccount)?(<div className={'panel ' + (show?'show':'hide') + (isHidden?' hidden':'')} 
    onAnimationEnd={(event)=>{
            if(event.animationName === 'hide') {
                setIsHidden(true)
            }
        }
    }>
        <button onClick={async () => console.log(ethers.utils.formatEther(await getBalance(currentAccount)) + " ETH")}>Your Balance</button>
        <button onClick={async () => {
            (await CardsContract.getCards())
            .forEach((cardAddress: string) => {
                CardsContract.getCard(cardAddress).then((card: BigNumber) => {
                    addCard(card, cardAddress)
                })
            })}
        }>Show All Cards</button>
    </div>):null
}