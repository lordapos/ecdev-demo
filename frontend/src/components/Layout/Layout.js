import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import MobileMenu from '../MobileMenu/MobileMenu'
import { toggleMenu } from '../../redux/actions/appAction'

const Layout = ({ children, history }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(toggleMenu(false))
  }, [dispatch, history])
  return (
    <>
      <Header/>
      <main>
        <MobileMenu/>
        {children}
      </main>
      <Footer/>
    </>
  )
}

export default Layout