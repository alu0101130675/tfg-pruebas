export function MapFilter ({ options, setFilter }) {
  return (
    <select
      style={{ padding: '2px', borderRadius: '5px', backgroundColor: 'white', border: '1px solid black' }}
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
