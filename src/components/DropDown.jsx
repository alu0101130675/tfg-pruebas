import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../DropDown.css'

export function DropDown ({ dropDownItems, anchor, dropDownName, side = 'left' }) {
  const [showDropdown, setShowDropdown] = useState(false)

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown)
  }
  return (
    <div style={{ marginRight: '1rem', position: 'relative' }} onMouseEnter={handleDropdownToggle} onMouseLeave={handleDropdownToggle}>
      <Link to={anchor} className='nav-dropdown'>{dropDownName}</Link>
      <div className={`dropdown ${side === 'right' ? 'right' : ''}`}>
        {showDropdown && dropDownItems.map(d =>
          <a key={d} href='#' className='dropdown-item'>{d}</a>
        )}
      </div>

    </div>
  )
}
