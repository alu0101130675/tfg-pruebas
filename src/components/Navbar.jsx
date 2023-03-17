import React from 'react'
import '../Navbar.css'
export function Navbar () {
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
        <div style={{ marginRight: '1rem' }}>
          <a href='/grafica' className='nav-link'>Grafica</a>
        </div>
        <div>
          <a href='/iniciativas' className='nav-link'>Iniciativas</a>
        </div>
      </div>
    </nav>
  )
}
