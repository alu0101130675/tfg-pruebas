import { useState } from 'react'
import '../Navbar.css'
import { Link } from 'react-router-dom'
import { DropDown } from './DropDown'
import { HamburgerButton } from './HamburgerButton'
export function Navbar () {
  const [toogleBar, setToogleBar] = useState(false)
  const dropdownItems = ['data1 que se va haciendo my grande', 'data2', 'data3']
  const handleToogle = () => {
    setToogleBar(!toogleBar)
  }

  return (
    <nav className='navbar'>
      <div className='navbar-items-logo'>
        <div className='logo'>
          <img
            src='https://www.women-inf.eu/wp-content/uploads/2022/05/cropped-identidad_grafica_WOMEN@INF-isologo.png'
            alt='logo de women@info'
          />
        </div>
        <div className={`navbar-items ${toogleBar ? 'show-links' : ''}`}>
          <DropDown dropDownItems={dropdownItems} anchor='/' dropDownName='Grafica' />
          <div>
            <Link to='/InitiativeMap' className='nav-link'>Iniciativas</Link>
          </div>
        </div>
      </div>
      <HamburgerButton />

    </nav>
  )
}
