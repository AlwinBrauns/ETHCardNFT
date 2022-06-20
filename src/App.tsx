import { useEffect } from 'react';
import './App.scss'
import { useState, useRef } from 'react';
import Card from './Card/Card';
import CardProperties from './Card/CardProperties';
import {v5 as uuidv5} from 'uuid';
import { ethers } from 'ethers';
import Greeters from "./artifacts/contracts/Greeter.sol/Greeter.json"

const greetersAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"

function App() {
  const ref = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  
  const [selectedCard, setSelectedCard] = useState(0)

  const [cards, setCards] = useState([] as CardProperties[])

  const [accounts, setAccounts] = useState([] as string[])

  const [currentAccount, setCurrentAccount] = useState("")

  const [textInput, setTextInput] = useState("")

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

  const connectMetaMask = async (): Promise<boolean> => {
    let success: boolean = false
    if (typeof window.ethereum !== 'undefined') {
      await window.ethereum.request({ method: 'eth_requestAccounts' }).then((_accounts: any) => {
        setAccounts(_accounts)
        setCurrentAccount(_accounts[0])
        success = true
      })
      return success
    }else {
      success = false
      console.log('MetaMask is not installed!');
      return success
    }
  }

  const fetchGreeting = async () => {
    if (typeof window.ethereum !== 'undefined'){
      //@ts-ignore 
      const provider = new ethers.providers.Web3Provider(window.ethereum) 
      const contract = new ethers.Contract(greetersAddress, Greeters.abi, provider)
      try {
        const data = await contract.greetGreet()
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const setGreeting = async () => {
    if(textInput) {
      if(typeof window.ethereum !== 'undefined') {
         //@ts-ignore 
          const provider = new ethers.providers.Web3Provider(window.ethereum) 
          const signer = provider.getSigner()
          const contract = new ethers.Contract(greetersAddress, Greeters.abi, signer)
          const transaction = await contract.setGreeting(textInput)
          await transaction.wait()
          console.log("transaction send")
      }
    }
    setTextInput("")
  }
  
  useEffect(() => {
    if(cards.length <= selectedCard) {
      setSelectedCard(cards.length-1)
    }
  }, [cards])

  const addCard = () => {
    const uniqueID: string = uuidv5(Date.now().toString()+""/* TODO */, uuidv5.URL).toString()
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
      </header>
      <main className="App-main">
        <button onClick={() => connectMetaMask()}>METAMASK</button>
        <button onClick={() => fetchGreeting()}>Fetch Greeting</button>
        <button onClick={() => setGreeting()}>Set Greeting</button>
        <input onChange={(e) => setTextInput(e.target.value)} type={"text"}/>
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
