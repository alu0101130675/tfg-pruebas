import './App.css'
import { Options } from './components/DataOptions'
import { useDataSet } from './hooks/getData'

function App () {
  const { data, options } = useDataSet()

  return (
    <>
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
