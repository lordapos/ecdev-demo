import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutSteps from '../../components/CheckoutSteps/CheckoutSteps'
import { savePaymentMethod } from '../../redux/actions/cartAction'
import { navigate } from 'gatsby'
import SEO from '../../components/Seo'
import Layout from '../../components/Layout/Layout'
import './_payment.scss'

const PaymentPage = () => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  const steps = [
    { to: '/shipping', label: 'Shipping', active: 'active' },
    { to: '/payment', label: 'Payment', active: 'active' },
    { to: '/placeorder', label: 'Complete Order ', active: null },
  ]

  const dispatch = useDispatch()
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    navigate('/placeorder')
  }

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping')
    }
  }, [shippingAddress])

  return (
    <Layout>
      <SEO title='Payment' />
      <section className='payment'>
        <CheckoutSteps steps={steps}/>
        <div className='payment__inner'>
          <h1 className='h2 payment__title'>Payment Method</h1>
          <form onSubmit={submitHandler} className="payment__form">
            <div className="payment__form__item">
              <input type="radio" id='PayPal' value='PayPal' checked
                     name='paymentMethod'
                     onChange={(e) => setPaymentMethod(e.target.value)}/>
              <label htmlFor="PayPal">PayPal or Credit Card</label>
            </div>
            <div className="payment__form__submit">
              <button className='payment__form__button' type='submit'>Continue</button>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  )
}

export default PaymentPage