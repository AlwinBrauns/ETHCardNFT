import { useContext, useEffect } from 'react';
import './App.scss'
import { useState, useRef, useReducer } from 'react';
import Card from './Card/Card';
import CardProperties from './Card/CardProperties';
import {v5 as uuidv5} from 'uuid';
import { ethers } from 'ethers';
import { connectMetaMask, getBalance } from './metamask.service';
import { CardsContract } from './contract.service';
import AppHeader from './Header/AppHeader';
import MetaMaskContext from './MetaMaskContext/MetaMaskContext';


function App() {
  const ref = useRef<HTMLDivElement>(null)
  
  const [selectedCard, setSelectedCard] = useState(0)
  const [cards, setCards] = useState([] as CardProperties[])
  
  const [latestCard, setLatestCard] = useState<ethers.BigNumber>()
  const [latestCardOwner, setLatestCardOwner] = useState("")
  
  const { currentAccount } = useContext(MetaMaskContext)

  const onNewCard = (card: any, owner: any) => {  
    setLatestCard(card)
    setLatestCardOwner(owner)
    if(owner.toString().toUpperCase() == currentAccount.toString().toUpperCase()) {
      console.log("add card")
      addCard(card._hex.toString())
    }
  }

  useEffect(() => {
    if(!currentAccount) {
      setCards([])
      setLatestCard(undefined)
      setLatestCardOwner("")
      CardsContract.unsubscribeFromNewCardListener(onNewCard)
    }
  }, [currentAccount])

  useEffect(() => {
    if (window.ethereum && currentAccount){
      CardsContract.subscribeToNewCardListener(onNewCard)
    }
    return () => {
      CardsContract.unsubscribeFromNewCardListener(onNewCard)
    }
  }, [currentAccount])

  useEffect(() => {
    if(cards.length <= selectedCard) {
      setSelectedCard(cards.length-1)
    }
  }, [cards])

  const selectACard = (uid: string) => {
    const index = cards.findIndex((elem)=>{
      return elem.id === uid
    })
    setSelectedCard(index)
  }

  const addCard = async (card: string) => {
    const uniqueID: string = card
    const newCard = {
      id: uniqueID,
      text: `Card`
    }
    setCards(prevState => [...prevState, newCard])
  }

  const removeCard = (number: number) => {
    const newCards = cards.filter((card, index) => index !== number)
    newCards.forEach((card, index) => {
      card.onClick = () => {
        setSelectedCard(index)
      }
    })
    setCards(newCards)
  }

  return (
    <div className="App" ref={ref}>
      <AppHeader 
        cards={cards} 
        latestCard={latestCard}
        latestCardOwner={latestCardOwner}
        selectedCard={selectedCard}
      />
      <section className='contract'>
        <button onClick={async () => alert(ethers.utils.formatEther(await getBalance(currentAccount)) + " ETH")}>Your Balance</button>
        <button onClick={async () => console.log(await CardsContract.getCards())}>Cards</button>
      </section>
      <main className="App-main">
        {
          cards.map((card, index) => {
            return (
                <Card
                  key={card.id}
                  text={card.text}
                  onClick={() => selectACard(card.id)}
                  onDelete={() => {removeCard(index)}}
                  id={card.id}
                />
            )
          })
        }
      </main>
    </div>
  )
}

export default App
