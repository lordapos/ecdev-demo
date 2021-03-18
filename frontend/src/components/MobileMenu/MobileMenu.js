import React from 'react'
import { useSelector } from 'react-redux'
import './_mobile-menu.scss'
import { Link } from 'gatsby'

const MobileMenu = () => {
  const mobMenu = useSelector((state) => state.app.visibleMobileMenu)
  const menuClass = mobMenu ? 'mobile-menu mobile-menu--show' : 'mobile-menu'
  const renderLinks = (links) => {
    return links.map((link, index) => {
      return (
        <li className='mobile-menu__item' key={index}>
          <Link
            to={link.to}
            activeClassName='mobile-menu__link--active'
            className='mobile-menu__link'
          >
            {link.label}
          </Link>
        </li>
      )
    })
  }

  const links = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Cameras' },
  ]

  return (
    <div className={menuClass}>
      <ul className="mobile-menu__list">
        {renderLinks(links)}
      </ul>
    </div>
  )
}

export default MobileMenu