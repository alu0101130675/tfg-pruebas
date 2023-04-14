import './css/AxesSelector.css'
export function AxesSelector ({ options, axes, handleAxechange, axeFlag }) {
  const fields = axeFlag === 'xField' ? options.axeX : options.axeY
  const handleMouseOver = () => {

  }
  return (
    <label>
      <select
        className='axe-selector'
        name={axeFlag} id={axeFlag} value={axes[axeFlag]}
        onChange={(event) => { handleAxechange(event, axeFlag) }}
      >
        {fields?.map((value) => {
          return (
            <option
              onMouseOver={() => handleMouseOver()}
              className='axe-options'
              key={value} value={value}
            >
              {value.length > 30 ? `${value.slice(0, 30)}...` : value}
            </option>
          )
        })}
      </select>
    </label>
  )
}
