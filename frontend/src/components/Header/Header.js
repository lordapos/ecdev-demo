import React, { useEffect, useState } from 'react'
import { Link } from 'gatsby'
import logo from '../../images/logo.svg'
import './_header.scss'
import { useSelector } from 'react-redux'
import userIcon from '../../images/ic_user.svg'
import cartIcon from '../../images/ic_cart.svg'

const Header = () => {
  const [view, setView] = useState('')
  const cls = ['header']
  cls.push(view)
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

  useEffect(() => {
    let scroll = 0
    window.onscroll = () => {
      if (window.pageYOffset > 100 && (scroll - window.pageYOffset) < 0) {
        setView('header--hide')
      } else {
        setView('')
      }
      scroll = window.pageYOffset
    }
  }, [])

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const [items, setItems] = useState(0)

  useEffect(() => {
    setItems(cartItems.reduce((acc, item) => acc + item.qty, 0))
  }, [cartItems])

  let userLink = '/login'
  if (userInfo) {
    userLink = '/profile'
  }

  const user = {
    backgroundImage: `url(${userIcon})`
  }

  const cartBG = {
    backgroundImage: `url(${cartIcon})`
  }

  return (
    <header className={cls.join(' ')}>
      <div className="header__head">FREE SHIPPING & RETURNS</div>
      <div className="header__inner">
        <Link className='header__logo' to='/'>
          <img src={logo} alt="prim"/>
        </Link>
        <nav className='header__nav'>
          <ul className='header__nav__list'>{renderLinks(links)}</ul>
        </nav>
        <nav className='header__nav'>
          <ul className='header__nav__list'>
            <li className='header__nav__item'>
              <Link
                to={userLink}
                activeClassName='header__nav__link--active'
                className='header__nav__link header__nav__link--icon'
              >
                <div className='user-icon' style={user}> </div>
              </Link>
            </li>
            <li className='header__nav__item'>
              <Link
                to='/cart'
                activeClassName='header__nav__link--active'
                className='header__nav__link header__nav__link--icon'
              >
                <div className='cart-icon' style={cartBG}> </div>
                {
                  items > 0 ? (<span className='count-cart'>{items}</span>) : null
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