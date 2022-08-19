import { useContext, useEffect } from 'react';
import './App.scss'
import { useState, useRef, useReducer } from 'react';
import Card from './Components/Card/Card';
import CardProperties from './Components/Card/CardProperties';
import { BigNumber, ethers } from 'ethers';
import { CardsContract } from './Services/cards.contract.service';
import AppHeader from './Components/Header/AppHeader';
import MetaMaskContext from './MetaMaskContext/MetaMaskContext';
import FunctionsPanel from './Components/FunctionsPanel/FunctionsPanel';
import Interaction from './Components/Interaction/Interaction';
import CardsInteraction from './Components/Interaction/CardsInteraction/CardsInteraction';


function App() {
  const ref = useRef<HTMLDivElement>(null)
  
  const [selectedCard, setSelectedCard] = useState(0)
  const [cards, setCards] = useState<CardProperties[]>([] as CardProperties[])
  
  const [latestCard, setLatestCard] = useState<string>()
  const [latestCardOwner, setLatestCardOwner] = useState("")
  
  const { currentAccount } = useContext(MetaMaskContext)

  const onNewCard = (cardAddress: string, owner: string) => {
    CardsContract.getCard(cardAddress).then(card => {
      setLatestCard(cardAddress)
      setLatestCardOwner(owner)
      if(owner.toString().toUpperCase() === currentAccount.toString().toUpperCase()) {
        addCard(card, cardAddress)
      }
    })
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
      setTimeout(() => {
        CardsContract.subscribeToNewCardListener(onNewCard)
      }, 100)
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

  const addCard = async (card: BigNumber, cardAddress: string) => {
    const uniqueID: string = card._hex
    const newCard = {
      id: uniqueID,
      text: `Card`,
      cardAddress: cardAddress
    }
    if(!(cards.map((elem)=>elem.id).includes(uniqueID))) {
      setCards(prevState => {
          return [...prevState, newCard]
      })
    }
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

  const [newSelectedCard, setNewSelectedCard] = useState<boolean>(false)
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
    <div className="App" ref={ref}>
      <AppHeader 
        cards={cards} 
        latestCard={latestCard}
        latestCardOwner={latestCardOwner}
        selectedCard={selectedCard}
      />
      <FunctionsPanel getSelectedCard={() => cards[selectedCard]} addCard={(card: BigNumber, cardAddress: string) => addCard(card, cardAddress)} />
      <main className="App-main">
        <Interaction changed={newSelectedCard} setChanged={setNewSelectedCard}>
                <CardsInteraction cards={cards} selectedCard={selectedCard}/>
        </Interaction>
        {
          cards.map((card, index) => {
            return (
              card.id?
                <Card
                  key={card.id}
                  text={card.text}
                  cardAddress={card.cardAddress}
                  onClick={() => selectACard(card.id)}
                  onDelete={() => {removeCard(index)}}
                  id={card.id}
                />:null
            )
          })
        }
      </main>
    </div>
  )
}

export default App
