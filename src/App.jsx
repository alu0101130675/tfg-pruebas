import { Routes, Route, Navigate } from 'react-router'
import './App.css'
import { Options } from './components/DataOptions'
import { InitiativeMap } from './components/InitiativeMap'
import { Navbar } from './components/Navbar'
import { Login } from './components/Login'
import { AdminFiles } from './components/AdminFiles'
import { useEffect, useState } from 'react'
import { getFileNameWithoutId } from './services/data'

function App () {
  const [defaultFiles, setDefaultFiles] = useState()
  useEffect(() => {
    getFileNameWithoutId()
      .then((data) => {
        data.lenght !== 0 && setDefaultFiles(data)
      })
  }, [])
  return (
    <>
      <header className='header'>
        <Navbar defaultFiles={defaultFiles} />
      </header>
      <main>
        <Routes>
          {defaultFiles &&
          defaultFiles.map(({ collectionName }) =>
            <Route key={collectionName} path={`/${collectionName}`} element={<Options />} />
          )}
          <Route path='/InitiativeMap' element={<InitiativeMap />} />
          <Route path='/' element={defaultFiles && <Navigate to={defaultFiles[0].collectionName} replace />} />
          <Route path='/postIniciative' element={<InitiativeMap />} />
          <Route path='/login' element={<Login />} />
          <Route path='/administrador' element={<AdminFiles />} />
        </Routes>
      </main>
    </>
  )
}

export default App
