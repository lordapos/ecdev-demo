import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik } from 'formik'
import './_review-popup.scss'
import { toggleReviewPopup } from '../../redux/actions/appAction'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { addReview } from '../../redux/actions/reviewAction'

const ReviewPopup = ({productId}) => {
  const reviewPopup = useSelector((state) => state.app.visibleReviewPopupForm)
  const reviewClasses = reviewPopup ? 'review-popup review-popup--show' : 'review-popup'
  const dispatch = useDispatch()
  const [ratingNumber, setRatingNumber] = useState(1)

  const handleClick = (value) => {
    const allNodesRating = document.getElementsByClassName('review-form__rating__item')

    for (const item of allNodesRating) {
        item.classList.remove('active')
      }
    for (let i = 0; i < value; i++) {
      allNodesRating[i].classList.add('active')
    }
    setRatingNumber(value)
  }

  const hidePopup = (e) => {
    e.preventDefault()
    dispatch(toggleReviewPopup(!reviewPopup))
  }


  return (
    <div className={reviewClasses}>
      <div className='review-popup__inner'>
        <div className='review-popup__close' onClick={hidePopup} onKeyDown={hidePopup} role='button' tabIndex={0}>✖</div>
        <Formik
          initialValues={{ email: '', name: '', title: '', review: '', rating: ratingNumber }}
          validate={values => {
            const errors = {}
            if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address'
            }
            return errors
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            values.rating = ratingNumber
            values.productId = productId
            resetForm({})
            dispatch(toggleReviewPopup(!reviewPopup))
            dispatch(addReview(values))
            setSubmitting(false)
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit} className='review-form' autoComplete='off'>
              <legend className='review-form__legend'>Write a review</legend>
              <div className='review-form__group'>
                <p className='review-form__label'>Your overall rating *</p>
                <div className='review-form__rating'>
                  <FontAwesomeIcon icon={faStar} className='review-form__rating__item active' onClick={() =>{handleClick(1)}}/>
                  <FontAwesomeIcon icon={faStar} className='review-form__rating__item' onClick={() =>{handleClick(2)}}/>
                  <FontAwesomeIcon icon={faStar} className='review-form__rating__item' onClick={() =>{handleClick(3)}}/>
                  <FontAwesomeIcon icon={faStar} className='review-form__rating__item' onClick={() =>{handleClick(4)}}/>
                  <FontAwesomeIcon icon={faStar} className='review-form__rating__item' onClick={() =>{handleClick(5)}}/>
                </div>
              </div>
              <div className='review-form__group'>
                <label htmlFor='title' className='review-form__label'>Title *</label>
                <input
                  type='text'
                  name='title'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                  placeholder='Enter title'
                  className='review-form__input'
                  required
                />
                <span className='review-form__error'>
                  {errors.title && touched.title && errors.title}
                </span>
              </div>
              <div className='review-form__group'>
                <label htmlFor='review' className='review-form__label'>Review *</label>
                <textarea
                  name='review'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.review}
                  placeholder='Enter your review...'
                  className='review-form__textarea'
                  required
                />
                <span className='review-form__error'>
                  {errors.review && touched.review && errors.review}
                </span>
              </div>
              <div className='review-form__group review-form__group--half'>
                <label htmlFor='name' className='review-form__label'>Name *</label>
                <input
                  type='text'
                  name='name'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  placeholder='Enter name'
                  className='review-form__input'
                  required
                />
                <span className='review-form__error'>
                  {errors.name && touched.name && errors.name}
                </span>
              </div>
              <div className='review-form__group review-form__group--half'>
                <label htmlFor='email' className='review-form__label'>Email *</label>
                <input
                  type='email'
                  name='email'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  placeholder='Enter email'
                  className='review-form__input'
                />
                <span className='review-form__error'>
                  {errors.email && touched.email && errors.email}
                </span>
              </div>
              <button className='review-form__button-clear review-form__button' onClick={hidePopup} >
                Cancel
              </button>
              <button type='submit' disabled={isSubmitting} className='review-form__button-submit review-form__button'>
                Submit
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default ReviewPopup