export function AxesSelector ({ options, axes, handleAxechange, axeFlag }) {
  const label = axeFlag === 'xField' ? 'x' : 'y'
  return (
    <label>
      Elije un dato para el eje {label}
      <select
        name={axeFlag} id={axeFlag} value={axes[axeFlag]}
        onChange={(event) => { handleAxechange(event, axeFlag) }}
      >
        {options?.map((value) => {
          return (<option key={value} value={value}>{value}</option>
          )
        })}
      </select>
    </label>
  )
}
