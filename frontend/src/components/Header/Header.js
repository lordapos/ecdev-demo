import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { graphql, StaticQuery, Link } from 'gatsby'
import logo from '../../images/logo.svg'
import './_header.scss'
import userIcon from '../../images/ic_user.svg'
import cartIcon from '../../images/ic_cart.svg'
import headLine from '../../images/head-line.svg'
import { toggleMenu } from '../../redux/actions/appAction'

const Header = () => {
  const dispatch = useDispatch()
  const mobMenu = useSelector((state) => state.app.visibleMobileMenu)
  const burgerClass = mobMenu ? 'mobile-btn mobile-btn--active' : 'mobile-btn'
  const [view, setView] = useState('')
  const cls = ['header']
  cls.push(view)

  const renderLinks = (links) => {
    return links.map((link, index) => {
      return (
        <li className='header__nav__item' key={index}>
          <Link
            to={'/' + link.name.toLowerCase()}
            className='header__nav__link'>{link.name}</Link>
        </li>
      )
    })
  }

  useEffect(() => {
    window.onscroll = () => {
      if (window.pageYOffset > 100) {
        setView('header--hide')
      } else {
        setView('')
      }
    }
  }, [dispatch])

  const addVisibleAnimation = () => {
    dispatch(toggleMenu(!mobMenu))
  }

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
    backgroundImage: `url(${userIcon})`,
  }

  const cartBG = {
    backgroundImage: `url(${cartIcon})`,
  }

  return (
    <header className={cls.join(' ')}>
      <div className="header__head">
        <div className="header__head__information">
          <span className="header__head__title">Demo Shop</span>
          <span className="header__head__title">Demo Shop</span>
          <p className="header__head__slogan">
            <img
              src={headLine} alt="head line"
              className="header__head__line"
            />
            <span className="header__head__text">
               This is a demo store, created by EcDevStudio to demonstrate its speed and other key capabilities
            </span>
            <img
              src={headLine} alt="head line"
              className="header__head__line"
            />

          </p>
          <span className="header__head__title">Demo Shop</span>
          <span className="header__head__title">Demo Shop</span>
        </div>

      </div>
      <div className="header__inner">
        <Link className='header__logo' to='/'>
          <img src={logo} alt="prim"/>
        </Link>
        <nav className='header__nav'>
          <StaticQuery
            query={graphql`
              query {
                swapi {
                  getCategories {
                    id, name
                  }
                }
              }
            `}
            render={data => (
              <ul className='header__nav__list'>
                <li className='header__nav__item'>
                  <Link
                    to='/'
                    className='header__nav__link'>Home</Link>
                </li>
                {renderLinks(data.swapi.getCategories)}
              </ul>
            )}
          />
        </nav>
        <ul className='header__nav__list'>
          <li className='header__nav__button'>
            <Link
              to={userLink}
              className='header__nav__link header__nav__link--icon'
            >
              <div className='user-icon' style={user}></div>
            </Link>
          </li>
          <li className='header__nav__button'>
            <Link
              to='/cart'
              className='header__nav__link header__nav__link--icon'
            >
              <div className='cart-icon' style={cartBG}></div>
              {
                items > 0 ? (<span className='count-cart'>{items}</span>) : null
              }
            </Link>
          </li>
          <div className={burgerClass} onClick={addVisibleAnimation}
               onKeyDown={addVisibleAnimation} role='button' tabIndex={0}>
            <span> </span>
            <span> </span>
            <span> </span>
          </div>
        </ul>
      </div>
    </header>
  )
}

export default Header