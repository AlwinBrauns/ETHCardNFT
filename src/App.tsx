import './App.scss'
import { useRef } from 'react';
import AppHeader from './Components/Header/AppHeader';
import FunctionsPanel from './Components/FunctionsPanel/FunctionsPanel';
import CardsScreen from './Screens/CardsScreen/CardsScreen';
import { Route, Routes } from 'react-router-dom';
import MarketplaceScreen from './Screens/MarketplaceScreen/MarketplaceScreen';

function App() {
  const ref = useRef<HTMLDivElement>(null)
  
  return (
    <div className="App" ref={ref}>
      <AppHeader />
      <FunctionsPanel />
      <main className="App-main">
        <Routes>
          <Route path='/' element=
            {
            <CardsScreen />
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