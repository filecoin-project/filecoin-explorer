import React from 'react'

const ErrorModal = ({subject, onClose, children}) => {
  return (
    <div className='modal'>
      <div>
        <h2>
          {subject}
          <button className='close' onClick={onClose} />
        </h2>
        <p>{children}</p>
      </div>
    </div>)
}

export default ErrorModal
