import './App.scss'
import { useRef } from 'react';
import AppHeader from './Components/Header/AppHeader';
import FunctionsPanel from './Components/FunctionsPanel/FunctionsPanel';
import CardsScreen from './Screens/CardsScreen/CardsScreen';
import { Route, Routes } from 'react-router-dom';
import MarketplaceScreen from './Screens/MarketplaceScreen/MarketplaceScreen';
import TransactionsScreen from './Screens/TransactionsScreen/TransactionsScreen';

function App() {
  const ref = useRef<HTMLDivElement>(null)
  
  return (
    <main className="App" ref={ref}>
      <AppHeader />
      <section className="App-content">
        <Routes>
          <Route path='/' element=
            {
            <CardsScreen />
            }
          />
          <Route path='/marketplace' element={
            <MarketplaceScreen />
          }/>
          <Route path='/transactions' element={
            <TransactionsScreen />
          }/>
          </Routes>
      </section>
    </main>
  )
}

export default App