import './css/AdminWeighing.css'
const ETAPAS = ['etapa A', 'etapa B', 'etapa C', 'etapa D']
export function AdminWeighing () {
  return (
    <>
      <h1 className='page-title'>Ponderacion de datos</h1>
      <form
        className='weighing-form' onSubmit={event => {
          event.preventDefault()
          const target = event.currentTarget
          const data = new FormData(target)
          const aux = [...data].map(([key, value]) => {
            const [fatherKey, childkey] = key.split('-', 2)
            const aux = Object.fromEntries([[childkey, value]])
            return [fatherKey, aux]
          })
          const weighing = {}
          ETAPAS.forEach(etapa => {
            const [[, z], [, y]] = aux.filter(([element]) => element === etapa)
            console.log('jejeje', z, 'la y:', y)
            weighing[etapa] = { ...z, ...y }
          })
        }}
      >
        <table className='weighing-table'>
          <thead className='weighing-table-head'>
            <th>Etapa</th>
            <th>Hombre</th>
            <th>Mujer</th>
          </thead>
          <tbody>
            {ETAPAS.map(etapa => (
              <tr key={etapa}>
                <td>
                  {etapa}
                </td>
                <td>
                  <input name={`${etapa}-Hombre`} type='number' min={0} step={0.0001} required />
                </td>
                <td>
                  <input name={`${etapa}-Mujer`} type='number' min={0} step={0.0001} required />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className='submit-weighing' type='submit'>Guardar cambios</button>
      </form>
    </>

  )
}
