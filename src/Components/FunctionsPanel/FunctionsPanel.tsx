import { BigNumber, ethers } from 'ethers'
import { useContext, useEffect, useState } from 'react'
import { CardsContract } from '../../Services/cards.contract.service'
import { getBalance } from '../../Services/metamask.service'
import MetaMaskContext from '../../MetaMaskContext/MetaMaskContext'
import './FunctionsPanel.scss'
import { CardsTransactionManager } from '../../Services/transaction.contract.service'

export default function FunctionsPanel({addCard, getSelectedCard}: {addCard: Function, getSelectedCard: Function}) {
    const [show, setShow] = useState<boolean>(false)

    const switchShowPanel = () => {
        setShow(prevState => {
            let newState = !prevState
            return newState
        })
    }

    return <section className='FunctionsPanel'>
        <div className="show-toggel" onClick={switchShowPanel}>{show?"hide":"show"} panel</div>
        <Panel show={show} addCard={(card: BigNumber, cardAddress: string) => addCard(card, cardAddress)} getSelectedCard={() => getSelectedCard()}/>
    </section>
}

function Panel ({show, addCard, getSelectedCard}:{show:boolean, addCard:Function, getSelectedCard: Function}) {
    const { currentAccount } = useContext(MetaMaskContext)
    const [sender, setSender] = useState<string>()
    const [receiver, setReceiver] = useState<string>()
    const [neededWei, setNeededWei] = useState<string>("")
    const [message, setMessage] = useState<string>("")

    const [isHidden, setIsHidden] = useState<boolean>(false)

    const createTransaction = async () => {
        if(sender && receiver && neededWei) {
            console.log("sender", sender)
            console.log("receiver", receiver)
            console.log("neededWei", neededWei)
            console.log("message", message)
            const transaction = await CardsTransactionManager.createNewTransaction(
                sender, receiver, neededWei, message
            )
            console.log(transaction)
        }
    }

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
        }>Load All Cards</button>
        <input type={"text" } placeholder="message" value={message} onChange={(e)=>setMessage(e.target.value)} />
        <input type={"number" } placeholder="neededWei" value={neededWei} onChange={(e)=>setNeededWei(e.target.value)} />
        <button onClick={() => {
            setSender(getSelectedCard().cardAddress)
        }}>Set Sender</button>
        <button onClick={() => {
            setReceiver(getSelectedCard().cardAddress)
        }}
        >Set Receiver</button>
        <button onClick={createTransaction}>transaction</button>
    </div>):null
}