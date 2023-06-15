import './css/AdminSelectAxes.css'
export function AdminSelectAxes ({ axes, setAxes }) {
  const handleOnChange = ({ target }) => {
    const { selectedOptions } = target
    const y = Array.from(selectedOptions, option => option.value)
    setAxes((prevState) => ({ ...prevState, axeY: y }))
  }
  return (
    <>
      <select
        size={6}
        multiple onChange={(({ target }) => {
          console.log(target.selectedOptions[0].value)
          handleOnChange({ target })
        })}
      >
        {axes.axeX?.map(opt => <option key={opt} value={opt}>{opt}</option>
        )}
      </select>
      <div className='axe-list'>
        <ol className='x-list'>
          <h2 className='title-list'>Eje x</h2>
          {axes.axeX.map((item, i) => <li className='axe-element' key={i}>{item}</li>
          )}
        </ol>
        <ol className='y-list'>
          <h2 className='title-list'>Eje y</h2>
          {axes.axeY.map(item => <li className='axe-element' key={item}>{item}</li>
          )}
        </ol>
      </div>
    </>
  )
}
