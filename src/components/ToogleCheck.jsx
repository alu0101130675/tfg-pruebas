import './css/ToogleCheck.css'
export function ToogleCheck ({ setFilter, toogleLabel, check, filter }) {
  return (
    <div className='toogle'>
      <div>{toogleLabel}</div>
      <label className='switch'>
        <input
          type='checkbox'
          id={filter}
          defaultChecked={check}
          onClick={() => setFilter(prevState => ({
            ...prevState, [filter]: !prevState[filter]
          }))}
        />
        <span className='slider' />
      </label>
    </div>

  )
}
