import '../ToogleCheck.css'
export function ToogleCheck ({ setFilter }) {
  return (
    <label className='switch'>
      <input type='checkbox' defaultValue id='toggle' onChange={() => setFilter(prevState => ({ ...prevState, active: !prevState.active }))} />
      <span className='slider' />
    </label>
  )
}
