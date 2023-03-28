import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../DropDown.css'
import { useTrigger } from '../hooks/useTrigger'

export function DropDown ({ dropDownItems, anchor, dropDownName, side = 'left' }) {
  const [showDropdown, setShowDropdown] = useTrigger(false)

  return (
    <div style={{ marginRight: '1rem', position: 'relative', alignSelf: 'center' }} onMouseEnter={setShowDropdown} onMouseLeave={setShowDropdown}>
      <Link to={anchor} className='nav-dropdown'>{dropDownName}</Link>
      <div className={`dropdown ${side === 'right' ? 'right' : ''}`}>
        {showDropdown && dropDownItems.map(({ visual, action }) =>
          action
            ? <a key={visual} href='#' className='dropdown-item' onClick={action}>{visual}</a>
            : <a key={visual} href='#' className='dropdown-item'>{visual}</a>
        )}
      </div>
    </div>
  )
}
