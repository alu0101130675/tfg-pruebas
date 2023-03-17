import './App.css'
import { Options } from './components/DataOptions'
import { Navbar } from './components/Navbar'
import { useDataSet } from './hooks/getData'

function App () {
  const { data, options } = useDataSet()

  return (
    <>
      <Navbar />
      <header>
        <h1 className='page-title'>Visualizador de datos</h1>
      </header>
      <main>
        <div>
          {data && <Options data={data} options={options} />}
        </div>
      </main>
    </>

  )
}

export default App
