import { useEffect } from 'react';
import './App.scss'
import { useState, useRef } from 'react';
import Card from './Card/Card';
import CardProperties from './Card/CardProperties';
import {v5 as uuidv5} from 'uuid';
import Web3 from 'web3';

function App() {
  const ref = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  
  const [selectedCard, setSelectedCard] = useState(0)

  const [cards, setCards] = useState([] as CardProperties[])

  const [accounts, setAccounts] = useState([] as string[])

  const [currentAccount, setCurrentAccount] = useState("")

  const scrollEffect = () =>{
    if(headerRef.current) {  
      console.log(window.scrollY)  
      if(window.scrollY > headerRef.current.offsetTop - 100) {
        headerRef.current.style.setProperty("--y", "-" + 100 + "px") 
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

  const connectMetaMask = () => {
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.request({ method: 'eth_requestAccounts' }).then((_accounts: any) => {
        setAccounts(_accounts)
        setCurrentAccount(_accounts[0])
        console.log(Web3.givenProvider)
      })
    }else {
      console.log('MetaMask is not installed!');
    }
  }
  
  useEffect(() => {
    if(cards.length <= selectedCard) {
      setSelectedCard(cards.length-1)
    }
  }, [cards])

  const addCard = () => {
    const uniqueID: string = uuidv5(Date.now().toString()+currentAccount, uuidv5.URL).toString()
    const newCard = {
      id: uniqueID,
      text: `Card`,
      onClick: () => {
        setSelectedCard(cards.length)
      }
    }
    if(cards.length === 0) {
      setCards([newCard])
    } else {
      setCards([...cards, newCard])
    }
  }

  const removeCard = (nunber: number) => {
    const newCards = cards.filter((card, index) => index !== nunber)
    newCards.forEach((card, index) => {
      card.onClick = () => {
        setSelectedCard(index)
      }
    })
    setCards(newCards)
  }

  return (
    <div className="App" ref={ref}>
      <header className="App-header" ref={headerRef}>
          <span className='App-header-title'>You have selected Card Nr. <br/><small>{cards[selectedCard]?.id ?? "-"}</small></span>
          <button className='App-header-addCard accent' onClick={addCard}>Add Card</button>
          <span>{currentAccount ? `ETH-Account: ${currentAccount}`:<button className='accent' onClick={connectMetaMask}>Connect with MetaMask</button>}</span>
      </header>
      <main className="App-main">
        {
          cards.map((card, index) => {
            return (
              <Card
                key={index}
                text={card.text}
                onClick={card.onClick}
                className='App-main-card'
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
