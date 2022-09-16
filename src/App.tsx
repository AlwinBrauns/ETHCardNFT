import { useContext, useEffect } from 'react';
import './App.scss'
import { useState, useRef } from 'react';
import CardProperties from './Components/Card/CardProperties';
import { BigNumber, ethers } from 'ethers';
import { CardsContract } from './Services/cards.contract.service';
import AppHeader from './Components/Header/AppHeader';
import MetaMaskContext from './Contexts/MetaMaskContext/MetaMaskContext';
import FunctionsPanel from './Components/FunctionsPanel/FunctionsPanel';
import CardsScreen from './Screens/CardsScreen/CardsScreen';
import { Route, Routes } from 'react-router-dom';
import MarketplaceScreen from './Screens/MarketplaceScreen/MarketplaceScreen';


function App() {
  const ref = useRef<HTMLDivElement>(null)
  
  const [selectedCard, setSelectedCard] = useState(0)
  const [cards, setCards] = useState<CardProperties[]>([] as CardProperties[])
  
  const [latestCard, setLatestCard] = useState<string>()
  const [latestCardOwner, setLatestCardOwner] = useState("")
  
  const { currentAccount } = useContext(MetaMaskContext)

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

  return (
    <div className="App" ref={ref}>
      <AppHeader 
        latestCard={latestCard}
      />
      <FunctionsPanel getSelectedCard={() => cards[selectedCard]} addCard={(card: BigNumber, cardAddress: string) => addCard(card, cardAddress)} />
      <main className="App-main">
        <Routes>
          <Route path='/' element=
            {
            <CardsScreen 
              cards={cards}
              selectedCard={selectedCard}
              newSelectedCard={newSelectedCard}
              setNewSelectedCard={setNewSelectedCard}
              selectACard={selectACard}
              removeCard={removeCard}
              />
            }
          />
          <Route path='/marketplace' element={
            <MarketplaceScreen />
          }/>
          </Routes>
      </main>
    </div>
  )
}

export default App
