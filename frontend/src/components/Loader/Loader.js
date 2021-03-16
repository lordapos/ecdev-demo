import React from 'react'
import './_loader.scss'
import loader from '../../images/loader.svg'

const Loader = () => {
  return (
    <div className='loader'>
      <img className='loader__image' src={loader} alt="Loading..."/>
    </div>
  )
}

export default Loader