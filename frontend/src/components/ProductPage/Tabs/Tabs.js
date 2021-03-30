import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { togglePopup, toggleYoutubePopup } from '../../../redux/actions/appAction'
import './_tabs.scss'
import Rating from '../../Rating/Rating'

const Tabs = ({ numReviews, specs, description, youtubeEmbed }) => {
  const [tab, setTab] = useState('description')

  const dispatch = useDispatch()

  const visiblePopup = useSelector((state) => state.app.visiblePopupForm)
  const visibleYoutubePopup = useSelector((state) => state.app.visibleYoutubePopupForm)

  const addVisiblePopup = () => {
    dispatch(togglePopup(!visiblePopup))
  }

  const addVisibleYoutubePopup = () => {
    dispatch(toggleYoutubePopup(!visibleYoutubePopup))
  }

  const tabHandler = (tab, e) => {
    const tabsNode = document.getElementsByClassName('product-tabs__item')
    for (const node of tabsNode) {
      node.classList.remove('active')
    }
    e.target.classList.add('active')

    setTab(tab)
  }

  const renderSpecs = (items) => {
    return items.map((item, index) => {
      return (
        <li className='specs-tab__item' key={index}>
        <span className='specs-tab__name'>
          {item.key}
        </span>
          <p className='specs-tab__description'>
            {item.value}
          </p>
        </li>
      )
    })
  }

  const renderDescription = (items) => {
    return items.map((item, index) => {
      return (
        <li className="description-tab__item" key={index}>
          <p className='description-tab__tagline'>
            {item.title}
          </p>
          <p className='description-tab__text'>
            {item.value}
          </p>
        </li>
      )
    })
  }

  const tabsClasses = ['product-tabs']
  tabsClasses.push(tab)

  const videoStyle = {
    backgroundImage: `url('https://img.youtube.com/vi/${youtubeEmbed}/maxresdefault.jpg')`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  }

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
        <ul className="description-tab__list">
          {renderDescription(description)}
        </ul>
      </div>
      <div className='product-tab__item specs-tab'>
        <h5 className='product-tab__headline'>
          Specs
        </h5>
        <ul className='specs-tab__list'>
          {renderSpecs(specs)}
        </ul>
      </div>
      <div className='product-tab__item videos-tab'>
        <h5 className='product-tab__headline'>
          Video
        </h5>

        <div className='videos-tab__preview'
             onClick={addVisibleYoutubePopup}
              style={videoStyle}
        >
          <svg width='59' height='60' viewBox='0 0 59 60' fill='none' xmlns='http://www.w3.org/2000/svg' className='videos-tab__preview__icon'>
            <path
              d='M22.3927 0H36.6073C48.9395 0 59 10.231 59 22.7723V37.2277C59 49.769 48.907 60 36.6073 60H22.3927C10.0605 60 0 49.736 0 37.2277V22.7723C0 10.231 10.0605 0 22.3927 0ZM21.6788 20.9901V39.0429C21.6788 41.4851 24.3075 42.9703 26.352 41.6832L40.5666 32.6403C42.4813 31.4191 42.4813 28.5809 40.5666 27.3927L26.3196 18.3498C24.3075 17.0627 21.6788 18.5479 21.6788 20.9901Z'
              fill='#ffffffad'/>
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