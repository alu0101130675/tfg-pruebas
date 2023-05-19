import { useEffect, useContext, useState } from 'react'
import './css/AdminWeighing.css'
import { getWeighing, postWeighing, updateWeighing } from '../services/data'
import { UserContext } from '../context/UserContext'
import { toast } from 'react-hot-toast'
const ETAPAS = ['Etapa A', 'Etapa B', 'Etapa C', 'Etapa D']
export function AdminWeighing () {
  const { user } = useContext(UserContext)
  const [actualWeighing, setActualWeighing] = useState()
  useEffect(() => {
    getWeighing()
      .then(d => {
        d === 'empty' ? setActualWeighing(1) : setActualWeighing(d.weighing)
      })
  }, [])
  const handleSubmit = event => {
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
      weighing[etapa] = { ...z, ...y }
    })
    const token = user.token
    actualWeighing !== 1
      ? toast.promise(
        updateWeighing({ weighing, token }),
        {
          loading: 'Actualizando ponderacion...',
          success: <b>Ponderación actualizada</b>,
          error: (error) => {
            console.log(error)
            return (<b>No se pudo actualizar</b>)
          }
        }
      )
      : toast.promise(
        postWeighing({ weighing, token }),
        {
          loading: 'Actualizando ponderacion...',
          success: () => {
            setActualWeighing(weighing)
            return (<b>Ponderación actualizada</b>)
          },
          error: (error) => {
            console.log(error)
            return (<b>No se pudo actualizar</b>)
          }
        }
      )
  }
  return (
    <>
      <h1 className='page-title'>Ponderacion de datos</h1>
      <form
        className='weighing-form' onSubmit={handleSubmit}
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
                  {actualWeighing &&
                    <input name={`${etapa}-Hombre`} defaultValue={actualWeighing !== 1 ? actualWeighing[etapa].Hombre : 0} type='number' min={0} step={0.0001} required />}
                </td>
                <td>
                  {actualWeighing &&
                    <input name={`${etapa}-Mujer`} defaultValue={actualWeighing !== 1 ? actualWeighing[etapa].Mujer : 0} type='number' min={0} step={0.0001} required />}
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
