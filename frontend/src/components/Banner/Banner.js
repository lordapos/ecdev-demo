import React from 'react'
import { Link } from 'gatsby'
import './_banner.scss'

const Banner = () => {
  return (
    <section className='banner'>
      <div className="banner__inner">
        <div className="banner__content">
          <span className="banner__flag">FX Flagship</span>
          <h1 className="banner__headline">Nikon <span>D5</span></h1>
          <p className="banner__tagline">
            Introducing the D5, an FX-format DSLR that makes the impossible possible.
          </p>
          <Link to='/product/canon-powershot-sx540' className="banner__button button">
            Buy now
            <svg width="5" height="10" viewBox="0 0 5 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L4 5L1 9" stroke="white" strokeWidth="1.5"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Banner