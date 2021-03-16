import React from 'react'
import { Link } from 'gatsby'
import logo from '../../images/logo.svg'
import './_header.scss'

const Header = () => {
  const renderLinks = (links) => {
    return links.map((link, index) => {
      return (
        <li className='header__nav__item' key={index}>
          <Link
            to={link.to}
            activeClassName='header__nav__link--active'
            className='header__nav__link'>{link.label}</Link>
        </li>
      )
    })
  }
  const links = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
  ]

  return (
    <header className='header'>
      <div className="header__inner">
        <Link className='header__logo' to='/'>
          <img src={logo} alt="prim"/>
        </Link>
        <nav className='header__nav'>
          <ul className='header__nav__list'>
            {renderLinks(links)}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header