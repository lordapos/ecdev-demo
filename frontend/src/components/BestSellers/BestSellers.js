import React from 'react'
import { Link } from 'gatsby'
import greenIconArrow from '../../images/cameras-review/ic_green-arrow.svg'
import iconArrow from '../../images/ic_arrow.svg'
import item1 from '../../images/best-sellers/item1.png'
import item2 from '../../images/best-sellers/item2.png'
import item3 from '../../images/best-sellers/item3.png'
import item4 from '../../images/best-sellers/item4.png'

import './_best-sellers.scss'

const BestSellers = () => {
  return (
    <section className="best-sellers">
      <div className="best-sellers__inner">
        <h3 className='best-sellers__headline'>Best Sellers Today</h3>
        <Link className="best-sellers__view-more" to='/'>
          View more <img src={iconArrow} alt="icon arrow"/>
        </Link>
        <div className="best-sellers__list">
          <div className="best-sellers__left">
            <Link to='/' className="best-sellers__item best-sellers__left__item">
              <img src={item1} alt="item1"/>
              <div className="best-sellers__information">
                <p className="best-sellers__tagline">FX Flagship</p>
                <p className="best-sellers__name">Nikon D6</p>
                <p className="best-sellers__learn-more">
                  Learn more <img src={greenIconArrow} alt="icon arrow"/>
                </p>
              </div>
            </Link>

          </div>
          <div className="best-sellers__right">
            <Link to='/' className="best-sellers__item best-sellers__right__item">
              <img src={item2} alt="item2"/>
              <div className="best-sellers__information">
                <p className="best-sellers__tagline">FX Professional</p>
                <p className="best-sellers__name">Nikon D850</p>
                <p className="best-sellers__learn-more">
                  Learn more <img src={greenIconArrow} alt="icon arrow"/>
                </p>
              </div>
            </Link>
            <Link to='/' className="best-sellers__item best-sellers__right__item">
              <img src={item3} alt="item3"/>
              <div className="best-sellers__information">
                <p className="best-sellers__tagline">FX Advanced Entry</p>
                <p className="best-sellers__name">Nikon D780</p>
                <p className="best-sellers__learn-more">
                  Learn more <img src={greenIconArrow} alt="icon arrow"/>
                </p>
              </div>
            </Link>
            <Link to='/' className="best-sellers__item best-sellers__right__item">
              <img src={item4} alt="item4"/>
              <div className="best-sellers__information">
                <p className="best-sellers__tagline">FX Entry-Level</p>
                <p className="best-sellers__name">Nikon D610</p>
                <p className="best-sellers__learn-more">
                  Learn more <img src={greenIconArrow} alt="icon arrow"/>
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
export default BestSellers