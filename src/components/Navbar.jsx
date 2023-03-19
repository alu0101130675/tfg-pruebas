import React, { useState } from 'react'
import '../Navbar.css'
export function Navbar () {
  const data = ['data1 que se va haciendo my grande', 'data2', 'data3']
  const [showDropdown, setShowDropdown] = useState(false)
  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown)
  }
  return (
    <nav className='navbar'>
      <div className='logo'>
        <img
          src='https://www.women-inf.eu/wp-content/uploads/2022/05/cropped-identidad_grafica_WOMEN@INF-isologo.png'
          alt='ogo'
          height='27'
          width={200}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '20%' }}>
        <div style={{ marginRight: '1rem', position: 'relative' }} onMouseEnter={handleDropdownToggle} onMouseLeave={handleDropdownToggle}>
          <a href='/grafica' className='nav-dropdown '>Grafica</a>
          <div className='dropdown'>
            {showDropdown && data.map(d =>
              <a key={d} href='#' className='dropdown-item'>{d}</a>
            )}
          </div>

        </div>
        <div>
          <a href='/iniciativas' className='nav-link'>Iniciativas</a>
        </div>
      </div>
    </nav>
  )
}
