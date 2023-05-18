export function MapFilter ({ options, setFilter }) {
  return (
    <select
      style={{ width: '100%' }}
      size={1} onChange={({ target }) => setFilter(prevState => ({ ...prevState, comunidadAutonoma: target.value }))}
    >
      {options.map(option =>
        <option
          key={option}
        >{option}
        </option>)}
    </select>
  )
}
