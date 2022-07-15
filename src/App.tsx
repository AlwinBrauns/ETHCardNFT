import { useContext, useEffect } from 'react';
import './App.scss'
import { useState, useRef, useReducer } from 'react';
import Card from './Card/Card';
import CardProperties from './Card/CardProperties';
import {v5 as uuidv5} from 'uuid';
import { BigNumber, ethers } from 'ethers';
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

  let cleaning = false

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
    }else {
      CardsContract.getCards().then(cards => {
        cards.forEach((card: BigNumber) => {
          addCard(card._hex)
        })
      })
    }
  }, [currentAccount])

  const cleanUpDuplicates = () => {
    if(cards.length > 0 && !cleaning) {
      cleaning = true
      let newCards = []
      for(let i = 0; i < cards.length; i++) {
        if(i>0) {
          newCards.push(cards[i-1])
          if(newCards.map(c => c.id).includes(cards[i].id)) {
            newCards.pop()
          }
        }
        if(i===cards.length-1) {
          newCards.push(cards[i])
        }
      }
      if(newCards.length !== cards.length) {
        setCards([...newCards])
        setTimeout(() => {
          cleaning = false
        }, 1000)
        return true
      }
    }
  }

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
        cards={cards} 
        latestCard={latestCard}
        latestCardOwner={latestCardOwner}
        selectedCard={selectedCard}
      />
      <section className='contract'>
        {!!(currentAccount)?<button onClick={async () => alert(ethers.utils.formatEther(await getBalance(currentAccount)) + " ETH")}>Your Balance</button>:null}
        {!!(currentAccount)?<button onClick={async () => console.log(await CardsContract.getCards())}>Cards</button>:null}
      </section>
      <main className="App-main">
        {
          cards.map((card, index) => {
            if(cleanUpDuplicates()) {
              return null
            }
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
