import React from 'react'
import { Link } from 'gatsby'
import './_cameras-review.scss'

const CamerasReview = () => {
  return (
    <section className='cameras-review'>
      <div className='cameras-review__inner'>
        <h3 className='cameras-review__title'>Create without limits</h3>
        <p className='cameras-review__tagline'>
          Once you’ve felt the liberating power, speed and performance of a Nikon DSLR, you’ll see why they’re the preferred tool of pro and aspiring
          photographers everywhere. See your photos and videos come to life with stunning clarity and rich detail through masterly-crafted Nikon DSLR cameras
          and world-renowned Nikkor lenses.
        </p>
        <ul className='cameras-review__list'>
          <li className='cameras-review__item cameras-review__item--dx'>
            <div className="cameras-review__information">
              <span className='cameras-review__name'>
                DX Series DSLRs
              </span>
              <Link to='/' className='cameras-review__link'>
                See DX Series Cameras
              </Link>
            </div>
          </li>
          <li className='cameras-review__item cameras-review__item--fx'>
            <div className="cameras-review__information">
              <span className='cameras-review__name'>
                FX Series DSLRs
              </span>
              <Link to='/' className='cameras-review__link'>
                See FX Series Cameras
              </Link>
            </div>

          </li>
        </ul>
      </div>
    </section>
  )
}

export default CamerasReview