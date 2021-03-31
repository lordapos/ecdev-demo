import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik } from 'formik'
import './_review-popup.scss'
import { toggleReviewPopup } from '../../redux/actions/appAction'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const ReviewPopup = () => {
  const reviewPopup = useSelector((state) => state.app.visibleReviewPopupForm)
  const reviewClasses = reviewPopup ? 'review-popup review-popup--show' : 'review-popup'
  const dispatch = useDispatch()

  const [ratingNumber, setRatingNumber] = useState(null)

  const handleClick = (e) => {
    const allNodesRating = document.getElementsByClassName('review-form__rating__item')
    for (const item of allNodesRating) {
      item.classList.remove('active')
    }
    const currentData = e.target.parentNode.dataset.value

    for (let i = 0; i < currentData; i++) {
      allNodesRating[i].classList.add('active')
    }
    setRatingNumber(currentData)
  }

  useEffect(() => {
    console.log(ratingNumber)
  }, [ratingNumber])

  const hidePopup = () => {
    dispatch(toggleReviewPopup(!reviewPopup))
  }
  return (
    <div className={reviewClasses}>
      <div className='review-popup__inner'>
        <div className='review-popup__close' onClick={hidePopup}>✖</div>
        <Formik
          initialValues={{ email: '', name: '', title: '', review: '', count: '' }}
          validate={values => {
            const errors = {}
            if (!values.email) {
              errors.email = 'Required'
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address'
            }
            if (!values.title) {
              errors.title = 'Required'
            }
            if (!values.title) {
              errors.review = 'Required'
            }
            if (!values.name) {
              errors.name = 'Required'
            }
            if (!values.count) {
              errors.count = 'Need to chose mark'
            }
            return errors
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2))
              setSubmitting(false)
            }, 400)
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
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit} className='review-form'>
              <legend className='review-form__legend'>Write a review</legend>
              <div className='review-form__group'>
                <label htmlFor='title' className='review-form__label'>Your overall rating *</label>
                <div className='review-form__rating'>
                  <FontAwesomeIcon icon={faStar} className='review-form__rating__item' data-value={1} onClick={handleClick}/>
                  <FontAwesomeIcon icon={faStar} className='review-form__rating__item' data-value={2} onClick={handleClick}/>
                  <FontAwesomeIcon icon={faStar} className='review-form__rating__item' data-value={3} onClick={handleClick}/>
                  <FontAwesomeIcon icon={faStar} className='review-form__rating__item' data-value={4} onClick={handleClick}/>
                  <FontAwesomeIcon icon={faStar} className='review-form__rating__item' data-value={5} onClick={handleClick}/>
                </div>

                <input
                  type='number'
                  name='count'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                  hidden
                  className='review-form__input'
                />

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
                  value={values.password}
                  placeholder='Enter name'
                  className='review-form__input'
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
              <button className='review-form__button-clear review-form__button'>
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