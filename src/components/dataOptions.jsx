export function Options ({ axe, data, options }) {
  return (
    <label>
      {`Pick a data for${axe}:`}
      <select
        name={axe} id={axe} value={data}
      >
        {options?.map((value) => {
          return (<option key={value} value={value}>{value}</option>
          )
        })}
      </select>
    </label>
  )
}
