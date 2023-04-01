import { Link } from 'react-router-dom'
import './css/DropDown.css'
import { useTrigger } from '../hooks/useTrigger'

export function DropDown ({ dropDownItems, anchor, dropDownName, side = 'left' }) {
  const [showDropdown, setShowDropdown] = useTrigger(false)

  return (
    <div style={{ marginRight: '1rem', position: 'relative', alignSelf: 'center' }} onMouseEnter={setShowDropdown} onMouseLeave={setShowDropdown}>
      <Link to={anchor} className='nav-dropdown'>{dropDownName}</Link>
      <div className={`dropdown ${side === 'right' ? 'right' : ''}`}>
        {showDropdown && dropDownItems.map(({ visual, action }) =>
          action
            ? <Link key={visual} to={visual} className='dropdown-item' onClick={action}>{visual}</Link>
            : <Link key={visual} to={visual} className='dropdown-item'>{visual}</Link>
        )}
      </div>
    </div>
  )
}
