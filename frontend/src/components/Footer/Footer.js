import React from 'react'
import './_footer.scss'

const Footer = () => {
  return (
    <footer className='footer'>
      <div className="footer__inner">
        <p className='footer__copy-rights'>© 2021
          <a rel='noreferrer' target='_blank'
             href='https://ecdevstudio.com/'> EcDev Studio</a>.
          All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer