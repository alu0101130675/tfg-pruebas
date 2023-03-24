import '../HamburgerButton.css'
export function HamburgerButton () {
  return (
    <button className='hamburger-button' aria-label='Open menu'>
      <span className='hamburger-line' />
      <span className='hamburger-line' />
      <span className='hamburger-line' />
    </button>
  )
}
