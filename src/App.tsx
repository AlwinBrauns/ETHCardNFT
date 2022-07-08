import { useEffect } from 'react';
import './App.scss'
import { useState, useRef } from 'react';
import Card from './Card/Card';
import CardProperties from './Card/CardProperties';
import {v5 as uuidv5} from 'uuid';
import { ethers } from 'ethers';
import {fetchGreeting, generateCard, getCards, listenToNewCard, listenToNewGreeting, setGreeting, unsubscribeFromNewCard, unsubscribeFromNewGreeting } from './contract.service';
import { connectMetaMask, getBalance } from './metamask.service';


function App() {
  const ref = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  
  const [selectedCard, setSelectedCard] = useState(0)

  const [cards, setCards] = useState([] as CardProperties[])

  const [accounts, setAccounts] = useState([] as string[])

  const [currentAccount, setCurrentAccount] = useState("")


  const [textInput, setTextInput] = useState("")

  const [currentGreet, setCurrentGreet] = useState("")
  const [latestCard, setLatestCard] = useState(null)
  const [latestCardOwner, setLatestCardOwner] = useState(null)

  const scrollEffect = () =>{
    if(headerRef.current) {  
      if(window.scrollY > headerRef.current.offsetTop - 100) {
        headerRef.current.style.setProperty("--y", "-" + 100 + "px") 
      }
    }
  }

  const onNewGreet = (greeting: string) => {
    setCurrentGreet(greeting)
  }

  const onNewCard = (card: any, owner: any) => {  
    setLatestCard(card)
    setLatestCardOwner(owner)
    if(owner.toString().toUpperCase() == currentAccount.toString().toUpperCase()) {
      console.log("add card")
      addCard(card._hex.toString())
    }
  }

  useEffect(() => {
    if(!currentAccount && window.ethereum?.isConnected()){
      console.log("connect...")
      connectMetaMask(setAccounts, setCurrentAccount)
    } else if (window.ethereum && currentAccount){
      listenToNewGreeting(onNewGreet)
      listenToNewCard(onNewCard)
    }
    return () => {
      unsubscribeFromNewGreeting(onNewGreet)
      unsubscribeFromNewCard(onNewCard)
    }
  }, [currentAccount])

  useEffect(() => {
    if(headerRef.current) {
      window.addEventListener("scroll", scrollEffect)
    }
    return () => {
      window.removeEventListener("scroll", scrollEffect)
    }
  }, [headerRef])
  
  useEffect(() => {
    if(cards.length <= selectedCard) {
      setSelectedCard(cards.length-1)
    }
  }, [cards])

  const selectACard = (uid: string) => {
    const index = cards.findIndex((elem)=>{
      console.log(uid)
      return elem.id === uid
    })
    setSelectedCard(index)
  }

  const addCard = async (card: string) => {
    const uniqueID: string = card
    const newCard = {
      id: uniqueID,
      text: `Card`,
      onClick: () => selectACard(uniqueID)
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
      <header className="App-header" ref={headerRef}>
          <span className='App-header-title'>You have selected Card Nr. <br/><small>{cards[selectedCard]?.id ?? "-"}</small></span>
          <button className='App-header-addCard accent' onClick={() => generateCard()}>Add Card</button>
          <span>Current Greet: {currentGreet}</span>
          <span>Latest Card: {latestCard?._hex} by {latestCardOwner}</span>
      </header>
      <section className='contract'>
          <button onClick={() => connectMetaMask(setAccounts, setCurrentAccount)}>METAMASK</button>
          <button onClick={async () => alert(ethers.utils.formatEther(await getBalance(currentAccount)) + " ETH")}>Your Balance</button>
          <button onClick={() => fetchGreeting()}>Fetch Greeting</button>
          <button onClick={() => setGreeting(textInput, setTextInput)}>Set Greeting</button>
          <button onClick={() => getCards()}>Cards</button>
          <input onChange={(e) => setTextInput(e.target.value)} type={"text"}/>
      </section>
      <main className="App-main">
        
        {
          cards.map((card, index) => {
            return (
                <Card
                  key={card.id}
                  text={card.text}
                  onClick={card.onClick}
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
