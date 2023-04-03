import { CHARTOPTIONS } from '../consts'
export function ConfigTable ({ config, setConfig }) {
  const handleTableSelects = (event) => {
    const { id, value } = event.target
    const newConfig = [...config]
    newConfig[id] = [...newConfig[id]]
    newConfig[id][2] = value
    setConfig(newConfig)
  }
  return (
    <table onChange={(event) => handleTableSelects(event)}>
      <thead className='thead-config'>
        <tr>
          <th>Campo 1</th>
          <th>Campo 2</th>
          <th>Grafica Recomendada</th>
        </tr>
      </thead>
      <tbody>
        {config?.map(([field1, field2, chart], i) => {
          return (
            <tr className='tr-config' key={i}>
              <th>{field1}</th>
              <th>{field2}</th>
              <th className='th-select'>
                <select id={i} defaultValue={chart} className='chart-selector'>
                  {CHARTOPTIONS.map(Chartoption => <option key={Chartoption}>{Chartoption}</option>)}
                </select>
              </th>
            </tr>
          )
        })}
      </tbody>

    </table>
  )
}
