import React, { useEffect, useState } from 'react'
import { Link } from 'gatsby'
import logo from '../../images/logo.svg'
import './_header.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'

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

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  const [items, setItems] = useState(0)

  useEffect(() => {
    setItems(cartItems.reduce((acc, item) => acc + item.qty, 0))
  }, [cartItems])

  return (
    <header className='header'>
      <div className="header__inner">
        <Link className='header__logo' to='/'>
          <img src={logo} alt="prim"/>
        </Link>
        <nav className='header__nav'>
          <ul className='header__nav__list'>
            {renderLinks(links)}
            <li className='header__nav__item'>
              <Link
                to='/cart'
                activeClassName='header__nav__link--active'
                className='header__nav__link header__nav__link--icon'
              >
                <FontAwesomeIcon icon={faShoppingCart}/>
                {
                  items > 0 ?
                    (
                      <span className='count-cart'>
                                <sup><small>{items}</small></sup>
                              </span>
                    )
                    : null
                }
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header