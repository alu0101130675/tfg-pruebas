import './css/ConfirmMessage.css'
export function ConfirmMessage ({ message, showMessage, action = null }) {
  return (
    <span className='message-box'>
      <div className='message'>
        {message}
      </div>
      <div className='flex-buttons'>
        <button
          className='yes-button'
          onClick={() => {
            action()
            showMessage()
          }}
        >
          Si
        </button>
        <button
          className='no-button'
          onClick={showMessage}
        >
          No
        </button>
      </div>
    </span>
  )
}
