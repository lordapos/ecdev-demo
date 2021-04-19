import React from 'react'
import './_footer.scss'
import logo from '../../images/logo-white.svg'
import { Link } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'
import visa from '../../images/visa.svg'
import express from '../../images/express.svg'
import mastercard from '../../images/mastercard.svg'
import paypal from '../../images/paypal.svg'

const Footer = () => {
  const visaIcon = {
    backgroundImage: `url(${visa})`,
  }
  const expressIcon = {
    backgroundImage: `url(${express})`,
  }
  const mastercardIcon = {
    backgroundImage: `url(${mastercard})`,
  }
  const paypalIcon = {
    backgroundImage: `url(${paypal})`,
  }
  const renderLinks = (links) => {
    return links.map((link, index) => {
      return (
        <li className='footer__links__item' key={index}>
          <Link
            to={link.to}
            activeClassName=''
            className='footer__link'>{link.label}</Link>
        </li>
      )
    })
  }

  const links = [
    { to: '/policy', label: 'Privacy Policy' },
    { to: '/terms', label: 'Terms of Use' },
  ]

  return (
    <footer className='footer'>
      <div className="footer__head">
        <div className="footer__inner">
          <Link className='footer__logo' to='/'>
            <img src={logo} alt="ecdev"/>
          </Link>
          <div className='footer__info'>
          <div className="footer__social">
            <h6 className='footer__social__title'>Social</h6>
            <div className="footer__social__list">
              <a href="https://www.instagram.com/" target='_blank' rel='noreferrer' className='footer__social__item'>
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="https://www.facebook.com/" target='_blank' rel='noreferrer' className='footer__social__item'>
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="https://twitter.com/?lang=en" target='_blank' rel='noreferrer' className='footer__social__item'>
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="https://www.youtube.com/" target='_blank' rel='noreferrer' className='footer__social__item'>
                <FontAwesomeIcon icon={faYoutube} />
              </a>
            </div>
          </div>
          <div className="footer__cards">
            <h6 className='footer__cards__title'>We Accept</h6>
            <ul className='footer__cards__list'>
              <li className='footer__cards__item' style={visaIcon}> </li>
              <li className='footer__cards__item' style={expressIcon}> </li>
              <li className='footer__cards__item' style={mastercardIcon}> </li>
              <li className='footer__cards__item' style={paypalIcon}> </li>
            </ul>
          </div>
          </div>
        </div>
      </div>
      <div className="footer__inner">
        <p className='footer__copy-rights'>© 2021 CamWorld. All Rights Reserved.</p>
        <ul className="footer__links__list">
          {renderLinks(links)}
          <li className='footer__links__item'>
            <a className='footer__link' href="/sitemap.xml" target='_blank' rel='noreferrer'>Site Map</a>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer