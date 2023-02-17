import './App.css'
import { Options } from './components/dataOptions'
import { useDataSet } from './hooks/getData'

function App () {
  const { data, options } = useDataSet()

  return (
    <main>
      <div>
        {data && <Options data={data} options={options} />}
      </div>
    </main>
  )
}

export default App
