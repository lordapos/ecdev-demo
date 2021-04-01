import React from 'react'
import { Link } from 'gatsby'
import './_incredible-shots.scss'
import lens from '../../images/incredible-shots/lens.png'

const IncredibleShots = () => {
  return (
    <section className='incredible-shots'>
      <div className='incredible-shots__inner'>
        <div className="incredible-shots__information">
          <div className="incredible-shots__information__inner">
            <div className='incredible-shots__left'>
              <h3 className="incredible-shots__headline">
                Incredible shots made
                easier
              </h3>
              <p className="incredible-shots__tagline">
                See your photos and videos come to life with stunning clarity and rich detail through legendary Canon cameras.
              </p>
              <button className="incredible-shots__button">
                Shop now
                <svg width="5" height="10" viewBox="0 0 5 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L4 5L1 9" stroke="white" strokeWidth="1.5"/>
                </svg>
              </button>
            </div>
            <div className='incredible-shots__right'>
              <img src={lens} alt="lens" className='incredible-shots__image'/>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default IncredibleShots