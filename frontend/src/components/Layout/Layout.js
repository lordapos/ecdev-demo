import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import MobileMenu from '../MobileMenu/MobileMenu'
import { toggleMenu } from '../../redux/actions/appAction'
import ReviewPopup from '../ReviewPopup/ReviewPopup'
import VideoPopup from '../VideoPopup/VideoPopup'

const Layout = ({ children, history, youtubeEmbed, productId }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(toggleMenu(false))
  }, [dispatch, history])
  return (
    <>
      <Header/>
      <main>
        <MobileMenu/>
        <ReviewPopup productId={productId}/>
        <VideoPopup youtubeEmbed={youtubeEmbed}/>
        {children}
      </main>
      <Footer/>
    </>
  )
}

export default Layout