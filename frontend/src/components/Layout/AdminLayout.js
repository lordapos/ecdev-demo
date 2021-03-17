import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, navigate } from 'gatsby'
import logo from '../../images/logo.svg'
import './_admin.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUser,
  faTachometerAlt,
  faMoneyBillAlt,
  faClipboardList,
} from '@fortawesome/free-solid-svg-icons'
import { checkRoles } from '../../redux/actions/roleAction'
import Loader from '../Loader/Loader'
import Message from '../Message/Message'

const Layout = (props) => {
  const dispatch = useDispatch()
  const { children } = props
  const userRole = useSelector((state) => state.roles)
  const { roleLoading, error, Roles } = userRole
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } else if (Roles !== null && Roles.isModerator === false) {
      navigate('/')
    } else if (Roles === null){
      dispatch(checkRoles())
    }
  }, [dispatch, userInfo, Roles])

  const renderLinks = (links) => {
    return links.map((link, index) => {
      return (
        <li className='admin__nav__item' key={index}>
          <Link
            to={link.to}
            activeClassName='admin__nav__link--active'
            className='admin__nav__link'
          >
            <FontAwesomeIcon icon={link.icon}/>
            <span>{link.label}</span>
          </Link>
        </li>
      )
    })
  }

  const links = [
    { to: '/admin', label: 'Dashboard', exact: true, icon: faTachometerAlt },
    {
      to: '/admin/orders',
      label: 'Orders',
      exact: false,
      icon: faMoneyBillAlt,
    },
    {
      to: '/admin/products',
      label: 'Products',
      exact: false,
      icon: faClipboardList,
    },
    { to: '/admin/users', label: 'Users', exact: false, icon: faUser },
  ]

  return (
    <>
      {roleLoading ?
        <h6>Loading... <Loader/></h6> :
        error ? (<Message variant='error'>{error}</Message>) : Roles ? (
          <div className='admin'>
            <div className='admin__inner'>
              <nav className='admin__nav'>
                <Link className='admin__nav__logo' to='/'>
                  <img src={logo} alt="prim"/>
                </Link>
                <ul className='admin__nav__list'>
                  {renderLinks(links)}
                </ul>
              </nav>
              <main>
                {children}
              </main>
            </div>
          </div>
        ) : null}
    </>
  )
}

export default Layout