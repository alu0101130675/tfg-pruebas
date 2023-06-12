import { CHARTOPTIONS } from '../consts'
export function ConfigTable ({ config, setConfig }) {
  const handleTableSelects = (event) => {
    const { id, value, name } = event.target
    const newConfig = [...config]
    const index = name === 'selector' ? 2 : 3
    newConfig[id] = [...newConfig[id]]
    newConfig[id][index] = value
    console.log(newConfig)
    setConfig(newConfig)
  }
  return (
    <table onChange={(event) => handleTableSelects(event)}>
      <thead className='thead-config'>
        <tr>
          <th>Campo 1</th>
          <th>Campo 2</th>
          <th>Gráfica Recomendada</th>
          <th>Descripción</th>
        </tr>
      </thead>
      <tbody>
        {config.lenght !== 0 && config.map(([field1, field2, chart, description], i) => {
          return (
            <tr className='tr-config' key={i}>
              <th>{field1}</th>
              <th>{field2}</th>
              <th className='th-select'>
                <select id={i} defaultValue={chart} name='selector' className='chart-selector'>
                  {CHARTOPTIONS.map(Chartoption => <option key={Chartoption}>{Chartoption}</option>)}
                </select>
              </th>
              <th className='th-select'>
                <input name='input' id={i} defaultValue={description} className='input-table' type='text' placeholder='opcional' />
              </th>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
