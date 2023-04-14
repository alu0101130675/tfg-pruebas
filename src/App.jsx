import { Routes, Route, Navigate } from 'react-router'
import './App.css'
import { Options } from './components/DataOptions'
import { Navbar } from './components/Navbar'
import { useEffect, useState, lazy, Suspense } from 'react'
import { getFileNameWithoutId } from './services/data'
const AdminFiles = lazy(() => import('./components/AdminFiles'))
const Login = lazy(() => import('./components/Login'))
const InitiativeMap = lazy(() => import('./components/InitiativeMap'))
function App () {
  const [defaultFiles, setDefaultFiles] = useState()
  useEffect(() => {
    getFileNameWithoutId()
      .then(data => data.length !== 0 && setDefaultFiles(data))
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
          <Route
            path='/InitiativeMap' element={
              <Suspense fallback={<div>Loading...</div>}>
                <InitiativeMap />
              </Suspense>
          }
          />
          <Route
            path='/' element={defaultFiles
              ? <Navigate to={defaultFiles[0].collectionName} replace />
              : <h1>Ahora mismo no hay datos</h1>}
          />
          <Route path='/postIniciative' element={<InitiativeMap />} />
          <Route
            path='/login' element={
              <Suspense fallback={<div>Loading...</div>}>
                <Login />
              </Suspense>
          }
          />
          <Route
            path='/administrador' element={
              <Suspense fallback={<div>Loading...</div>}>
                <AdminFiles />
              </Suspense>
              }
          />
        </Routes>
      </main>
    </>
  )
}

export default App
