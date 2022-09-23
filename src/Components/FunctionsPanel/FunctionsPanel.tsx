import { BigNumber, ethers } from 'ethers'
import { useContext, useEffect, useState } from 'react'
import { CardsContract } from '../../Services/cards.contract.service'
import { getBalance } from '../../Services/metamask.service'
import MetaMaskContext from '../../Contexts/MetaMaskContext/MetaMaskContext'
import './FunctionsPanel.scss'
import { useLocation } from 'react-router-dom'
import { Offer } from '../../Services/offer.contract.service'
import ModalContext from '../../Contexts/ModalContext/ModalContext'

export default function FunctionsPanel({addCard, getSelectedCard}: {addCard: Function, getSelectedCard: Function}) {
    const [show, setShow] = useState<boolean>(false)

    const switchShowPanel = () => {
        setShow(prevState => {
            let newState = !prevState
            return newState
        })
    }

    return <section className='FunctionsPanel'>
        <div className={"show-toggel " + (show?'show':'hide')} onClick={switchShowPanel}>{show?"hide":"show"} panel</div>
        <Panel show={show} addCard={(card: BigNumber, cardAddress: string) => addCard(card, cardAddress)}/>
    </section>
}

function Panel ({show, addCard}:{show:boolean, addCard:Function}) {
    const {currentAccount} = useContext(MetaMaskContext)
    const {result, openOfferModal} = useContext(ModalContext)
    const [isHidden, setIsHidden] = useState<boolean>(false)
    const location = useLocation();

    type OfferType = {
        offerCard: string,
        description: string,
        neededWei: number,
        online: boolean,
        stock: number
    }
    const handleOfferModalFormData = (offerData: OfferType) => {
        const isValid = () => !!(offerData.offerCard)
        if(isValid()){
            let offer = Offer.createOffer(
                offerData.offerCard,
                offerData.description,
                offerData.neededWei,
                offerData.online,
                offerData.stock
            )
        }else {
            console.log("wrong input: ", offerData)
        }
    }

    useEffect(() => {
        if(result?.offer) {
            handleOfferModalFormData(result.offer)
        }
    }, [result])

    const addOffer = () => {
        openOfferModal()
    }

    const MainFunction = () => {
        if(location.pathname === "/marketplace") {
            return !!(currentAccount)?<button className='App-header-addOffer accent' onClick={() => addOffer()}>Add Offer</button>:null
        }else {
            return !!(currentAccount)?<button className='App-header-addCard accent' onClick={() => CardsContract.generateCard()}>Add Card</button>:null
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
        <MainFunction />
        <button onClick={async () => {
            (await CardsContract.getCards())
            .forEach((cardAddress: string) => {
                CardsContract.getCard(cardAddress).then((card: BigNumber) => {
                    addCard(card, cardAddress)
                })
            })}
        }>Load All Cards</button>
    </div>):null
}