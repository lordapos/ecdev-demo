import React from 'react'
import './_checkoutSteps.scss'
import { Link } from 'gatsby'

const CheckoutSteps = ({ steps }) => {
  return (
    <div className='checkout-steps'>
      <div className="checkout-steps__inner">
        <div className="checkout-steps__list">
          {steps.map((step, index) => (
            <Link className={'checkout-steps__item '+ step.active} key={index} to={step.to}>
              <span className='checkout-steps__index'>{index + 1}</span>
              <span className='checkout-steps__name'>{step.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CheckoutSteps