import { Label } from 'recharts'
import '../ToogleCheck.css'
export function ToogleCheck ({ setFilter, toogleLabel }) {
  return (
    <div className='toogle'>
      <div>Iniciativas activas</div>
      <label className='switch'>
        <input type='checkbox' defaultValue id='toggle' onChange={() => setFilter(prevState => ({ ...prevState, active: !prevState.active }))} />
        <span className='slider' />
      </label>
    </div>

  )
}
