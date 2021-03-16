import React from 'react'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'

const Layout = (props) => {
  const { children } = props
  return (
    <>
      <Header/>
      <main>
        {children}
      </main>
      <Footer/>
    </>
  )
}

export default Layout