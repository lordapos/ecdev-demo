import React from 'react'
import './_message.scss'

const Message = ({ variant, children }) => {
  const cls = ['message']
  if (variant === 'error') {
    cls.push('message--error')
  } else if (variant === 'success') {
    cls.push('message--success')
  } else {
    cls.push('message--info')
  }

  return (
    <div className={cls.join(' ')}>
      {children}
    </div>
  )
}

Message.defaultPrors = {
  variant: 'info',
}

export default Message