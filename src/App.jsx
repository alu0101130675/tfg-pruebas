import { Routes, Route } from 'react-router'
import './App.css'
import { Options } from './components/DataOptions'
import { InitiativeMap } from './components/InitiativeMap'
import { Navbar } from './components/Navbar'
import { Login } from './components/Login'

function App () {
  return (
    <>
      <header className='header'>
        <Navbar />
      </header>
      <main>
        <Routes>
          <Route path='/*' element={<Options />} />
          <Route path='/InitiativeMap' element={<InitiativeMap />} />
          <Route path='/postIniciative' element={<InitiativeMap />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </main>
    </>
  )
}

export default App
