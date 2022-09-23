import './App.scss'
import { useRef } from 'react';
import { BigNumber } from 'ethers';
import AppHeader from './Components/Header/AppHeader';
import FunctionsPanel from './Components/FunctionsPanel/FunctionsPanel';
import CardsScreen from './Screens/CardsScreen/CardsScreen';
import { Route, Routes } from 'react-router-dom';
import MarketplaceScreen from './Screens/MarketplaceScreen/MarketplaceScreen';
import { useCards } from './States/CardsState';

function App() {
  const ref = useRef<HTMLDivElement>(null)
  const {cardsState, selectACard, setNewSelectedCard, removeCard, addCard} = useCards()
  
  return (
    <div className="App" ref={ref}>
      <AppHeader 
        latestCard={cardsState.latestCard}
      />
      <FunctionsPanel getSelectedCard={() => cardsState.cards[cardsState.selectedCard]} addCard={(card: BigNumber, cardAddress: string) => addCard(card, cardAddress)} />
      <main className="App-main">
        <Routes>
          <Route path='/' element=
            {
            <CardsScreen 
              cards={cardsState.cards}
              selectedCard={cardsState.selectedCard}
              newSelectedCard={cardsState.newSelectedCard}
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