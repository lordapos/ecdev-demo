import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { togglePopup } from '../../../redux/actions/appAction'
import './_tabs.scss'

import Rating from '../../Rating/Rating'

const Tabs = ({ numReviews }) => {
  const [tab, setTab] = useState('description')

  const dispatch = useDispatch()
  const visiblePopup = useSelector((state) => state.app.visiblePopupForm)

  const addVisiblePopup = () => {
    dispatch(togglePopup(!visiblePopup))
  }

  const tabHandler = (tab, e) => {
    const tabsNode = document.getElementsByClassName('product-tabs__item')
    for (const node of tabsNode) {
      node.classList.remove('active')
    }
    e.target.classList.add('active')

    setTab(tab)
  }

  const tabsClasses = ['product-tabs']
  tabsClasses.push(tab)

  return (
    <div className={tabsClasses.join(' ')}>
      <ul className='product-tabs__list'>
        <li
          className='product-tabs__item active'
          onClick={(e) => tabHandler('description', e)}
        >
          Description
        </li>
        <li
          className='product-tabs__item'
          onClick={(e) => tabHandler('specs', e)}
        >
          Specs
        </li>
        <li
          className='product-tabs__item'
          onClick={(e) => tabHandler('videos', e)}
        >
          Video
        </li>
        <li
          className='product-tabs__item'
          onClick={(e) => tabHandler('reviews', e)}
        >
          Reviews
        </li>
      </ul>
      <div className='product-tab__item description-tab'>
        <h5 className='product-tab__headline'>
          Description
        </h5>
        <p className='description-tab__tagline'>
          The Precision of Fine Control
        </p>
        <p className='description-tab__text'>
          The first PowerShot G-Series camera to incorporate a full-featured 2.36 million dot electronic viewfinder, the PowerShot G5 X camera makes it simple
          to capture high-quality stills and video without taking your eye away from the camera. With its 1.0-inch CMOS sensor and a 4.2x Optical Zoom lens, it
          can deliver incredible performance that's easy to see.
        </p>
        <p className='description-tab__tagline'>
          Built-in Electronic Viewfinder
        </p>
        <p className='description-tab__text'>
          The PowerShot G5 X's 2.36 million dot electronic viewfinder adds flexibility in how you use the camera. It's great for photographers who prefer to
          hold the camera up to their eye, and is a veritable lifesaver in bright light and other situations where the lighting is difficult. What's more, you
          can also customize the image information you see in the viewfinder to help get your photo looking how you want it to, and view vivid edge-to-edge
          images you can easily compose, adjust and review.
        </p>

        <p className='description-tab__tagline'>
          1.0-inch CMOS Sensor
        </p>
        <p className='description-tab__text'>
          At the heart of the PowerShot G5 X camera is a brilliant 1.0-inch 20.2 Megapixel* High-Sensitivity CMOS sensor. Physically larger than the sensors
          found in most compact cameras, the PowerShot G5 X's sensor works in tandem with Canon's DIGIC 6 Image Processor to quickly deliver gorgeous,
          high-resolution images with nuanced details, plus impressive low-light performance with a low signal-to-noise ratio and minimal noise and distortion.
        </p>
      </div>
      <div className='product-tab__item specs-tab'>
        <h5 className='product-tab__headline'>
          Specs
        </h5>
        <ul className='specs-tab__list'>
          <li className='specs-tab__item'>
      <span className='specs-tab__name'>
      Sensor Type
      </span>
            <p className='specs-tab__description'>
              Approx. 22.3 mm x 14.9 mm CMOS
            </p>
          </li>
          <li className='specs-tab__item'>
      <span className='specs-tab__name'>
      Effective Pixels
      </span>
            <p className='specs-tab__description'>
              Approx. 24.1 megapixels
            </p>
          </li>
          <li className='specs-tab__item'>
      <span className='specs-tab__name'>
      Total Pixels
      </span>
            <p className='specs-tab__description'>
              Approx. 24.7 megapixels
            </p>
          </li>
          <li className='specs-tab__item'>
      <span className='specs-tab__name'>
      Sensor Type
      </span>
            <p className='specs-tab__description'>
              Approx. 22.3 mm x 14.9 mm CMOS
            </p>
          </li>
          <li className='specs-tab__item'>
      <span className='specs-tab__name'>
      Effective Pixels
      </span>
            <p className='specs-tab__description'>
              Approx. 24.1 megapixels
            </p>
          </li>
          <li className='specs-tab__item'>
      <span className='specs-tab__name'>
      Total Pixels
      </span>
            <p className='specs-tab__description'>
              Approx. 24.7 megapixels
            </p>
          </li>
          <li className='specs-tab__item'>
      <span className='specs-tab__name'>
      Sensor Type
      </span>
            <p className='specs-tab__description'>
              Approx. 22.3 mm x 14.9 mm CMOS
            </p>
          </li>
          <li className='specs-tab__item'>
      <span className='specs-tab__name'>
      Effective Pixels
      </span>
            <p className='specs-tab__description'>
              Approx. 24.1 megapixels
            </p>
          </li>
          <li className='specs-tab__item'>
      <span className='specs-tab__name'>
      Total Pixels
      </span>
            <p className='specs-tab__description'>
              Approx. 24.7 megapixels
            </p>
          </li>
        </ul>
      </div>
      <div className='product-tab__item videos-tab'>
        <h5 className='product-tab__headline'>
          Video
        </h5>

        <div className='videos-tab__preview'>
          <svg width='59' height='60' viewBox='0 0 59 60' fill='none' xmlns='http://www.w3.org/2000/svg' className='videos-tab__preview__icon'>
            <path
              d='M22.3927 0H36.6073C48.9395 0 59 10.231 59 22.7723V37.2277C59 49.769 48.907 60 36.6073 60H22.3927C10.0605 60 0 49.736 0 37.2277V22.7723C0 10.231 10.0605 0 22.3927 0ZM21.6788 20.9901V39.0429C21.6788 41.4851 24.3075 42.9703 26.352 41.6832L40.5666 32.6403C42.4813 31.4191 42.4813 28.5809 40.5666 27.3927L26.3196 18.3498C24.3075 17.0627 21.6788 18.5479 21.6788 20.9901Z'
              fill='white'/>
          </svg>
        </div>
      </div>
      <div className='product-tab__item reviews-tab'>
        <h5 className='product-tab__headline'>
          Reviews
        </h5>
        <div className='reviews-result'>
          <div className='reviews-result__left'>
            <p className='reviews-result__all-review'><span>{numReviews}</span> User Review</p>
            <span className='reviews-result__mark'>
              5.0
            </span>
            <Rating value={6} hideCountReviewers={true}/>
          </div>
          <div className='reviews-result__right'>
            <ul className='reviews-result__list'>
              <li className='reviews-result__item'>
                <div className='reviews-result__item__name'>5 <span>Stars</span></div>
                <div className='reviews-result__item__scale'></div>
                <div className='reviews-result__item__count'>(220)</div>
              </li>
              <li className='reviews-result__item'>
                <div className='reviews-result__item__name'>4 <span>Stars</span></div>
                <div className='reviews-result__item__scale'></div>
                <div className='reviews-result__item__count'>(0)</div>
              </li>
              <li className='reviews-result__item'>
                <div className='reviews-result__item__name'>3 <span>Stars</span></div>
                <div className='reviews-result__item__scale'></div>
                <div className='reviews-result__item__count'>(0)</div>
              </li>
              <li className='reviews-result__item'>
                <div className='reviews-result__item__name'>2 <span>Stars</span></div>
                <div className='reviews-result__item__scale'></div>
                <div className='reviews-result__item__count'>(0)</div>
              </li>
              <li className='reviews-result__item'>
                <div className='reviews-result__item__name'>1 <span>Stars</span></div>
                <div className='reviews-result__item__scale'></div>
                <div className='reviews-result__item__count'>(0)</div>
              </li>
            </ul>

          </div>
        </div>
        <div className='review-comments'>
          <ul className='review-comments__list'>
            <li className='review-comments__item'>
              <div className='review-comments__head'>
                <div className='review-comments__head__inner'>
                  <Rating value={6} hideCountReviewers={true}/>
                  <span className='review-comments__user-name'>
                Max Cooper
              </span>
                </div>
                <span className='review-comments__date-of-publication'>
              December 17, 2020
            </span>
              </div>
              <div className='review-comments__body'>
                <p className='review-comments__title'>
                  What a dandy little camera
                </p>
                <p className='review-comments__text'>
                  I own, and have used for at least twenty eight years, several view cameras, currently I have, 6 or 7, so maybe this gives me some
                  qualification.
                  I
                  have only seen three or four Technikardan Cameras, I own a 6 X 9. This camera is incredible compact folded up, and relative light, I own a
                  lighter
                  4 X 5, I do not use it, and if you had a choice between the two neither would you. I carry this camera almost every where I go, in my
                  backpack,
                  along with two Super Rollex 6 X 9 film backs.
                </p>
              </div>
            </li>
            <li className='review-comments__item'>
              <div className='review-comments__head'>
                <div className='review-comments__head__inner'>
                  <Rating value={6} hideCountReviewers={true}/>
                  <span className='review-comments__user-name'>
                Max Cooper
              </span>
                </div>
                <span className='review-comments__date-of-publication'>
              December 17, 2020
            </span>
              </div>
              <div className='review-comments__body'>
                <p className='review-comments__title'>
                  What a dandy little camera
                </p>
                <p className='review-comments__text'>
                  I own, and have used for at least twenty eight years, several view cameras, currently I have, 6 or 7, so maybe this gives me some
                  qualification.
                  I
                  have only seen three or four Technikardan Cameras, I own a 6 X 9. This camera is incredible compact folded up, and relative light, I own a
                  lighter
                  4 X 5, I do not use it, and if you had a choice between the two neither would you. I carry this camera almost every where I go, in my
                  backpack,
                  along with two Super Rollex 6 X 9 film backs.
                </p>
              </div>
            </li>
          </ul>
          <button className='review-comments__button' onClick={addVisiblePopup}>
            <svg width='17' height='18' viewBox='0 0 17 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M14.7829 1.50351L15.5319 2.30912C16.156 2.98046 16.156 3.92034 15.5319 4.59168L5.42073 15.4674L1.80068 16.9444C1.55102 17.0787 1.30136 16.9444 1.17654 16.8101C1.05171 16.6758 0.926877 16.4073 1.05171 16.1388L2.54966 12.3793L12.6608 1.50351C13.1601 0.832164 14.1588 0.832164 14.7829 1.50351Z'
                stroke='#242222' strokeWidth='1.7' strokeMiterlimit='10'/>
            </svg>
            Write a review
          </button>
        </div>
      </div>
    </div>
  )
}

export default Tabs