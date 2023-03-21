import { useState } from 'react'
import '../DropDown.css'

export function DropDown ({ dropDownItems, anchor, dropDownName }) {
  const [showDropdown, setShowDropdown] = useState(false)

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown)
  }
  return (
    <div style={{ marginRight: '1rem', position: 'relative' }} onMouseEnter={handleDropdownToggle} onMouseLeave={handleDropdownToggle}>
      <a href={anchor} className='nav-dropdown '>{dropDownName}</a>
      <div className='dropdown'>
        {showDropdown && dropDownItems.map(d =>
          <a key={d} href='#' className='dropdown-item'>{d}</a>
        )}
      </div>

    </div>
  )
}
