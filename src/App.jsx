import { Routes, Route } from 'react-router'
import './App.css'
import { Options } from './components/DataOptions'
import { InitiativeMap } from './components/InitiativeMap'
import { Navbar } from './components/Navbar'
import { useDataSet } from './hooks/getData'

function App () {
  const { data, options } = useDataSet()
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Routes>
          <Route
            path='/'
            element={
              <>
                {data && <Options data={data} options={options} />}
              </>
              }
          />
          <Route path='/InitiativeMap' element={<InitiativeMap />} />
          <Route path='/postIniciative' element={<InitiativeMap />} />
        </Routes>
      </main>
    </>
  )
}

export default App
