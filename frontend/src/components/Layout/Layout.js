import React from 'react'
import Footer from '../Footer/Footer'

const Layout = (props) => {
  const { children } = props
  return (
    <>
      <main>
        {children}
      </main>
      <Footer/>
    </>
  )
}

export default Layout