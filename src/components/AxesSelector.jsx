import './css/AxesSelector.css'
export function AxesSelector ({ options, axes, handleAxechange, axeFlag }) {
  return (
    <label>
      <select
        className='axe-selector'
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
