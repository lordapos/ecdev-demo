import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import MobileMenu from '../MobileMenu/MobileMenu'
import { toggleMenu } from '../../redux/actions/appAction'
import ReviewPopup from '../ReviewPopup/ReviewPopup'

const Layout = ({ children, history, productId }) => {
  const mobMenu = useSelector((state) => state.app.visibleMobileMenu)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(toggleMenu(false))
  }, [dispatch, history])

  useEffect(() => {
    if (mobMenu) {
      document.body.classList.add("no-scroll")
    } else {
      document.body.classList.remove("no-scroll")
    }
  }, [dispatch, mobMenu])
  return (
    <>
      <Header/>
      <main>
        <MobileMenu/>
        <ReviewPopup productId={productId}/>
        {children}
      </main>
      <Footer/>
    </>
  )
}

export default Layout