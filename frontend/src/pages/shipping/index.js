import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../../components/Layout/Layout'
import SEO from '../../components/Seo'
import { navigate } from 'gatsby'
import CheckoutSteps from '../../components/CheckoutSteps/CheckoutSteps'
import { saveShippingAddress } from '../../redux/actions/cartAction'
import './_shipping.scss'

const ShippingPage = () => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const steps = [
    { to: '/shipping', label: 'Shipping', active: 'active' },
    { to: '/payment', label: 'Payment', active: null },
    { to: '/placeorder', label: 'Complete Order ', active: null },
  ]
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [country, setCountry] = useState('')
  const dispatch = useDispatch()
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    navigate('/payment')
  }

  useEffect(() => {
    setAddress(shippingAddress.address)
    setCity(shippingAddress.city)
    setPostalCode(shippingAddress.postalCode)
    setCountry(shippingAddress.country)
  }, [shippingAddress])

  return (
    <Layout>
      <SEO title='Shipping'/>
      <section className='shipping'>
        <CheckoutSteps steps={steps}/>
        <div className="shipping__inner">
          <h1 className='h2 shipping__title'>Shipping</h1>
          <form onSubmit={submitHandler} className="shipping__form">
            <div className="shipping__form__item">
              <label htmlFor="address">Address</label>
              <input onChange={(e) => setAddress(e.target.value)}
                     className='shipping__form__input'
                     id='address'
                     type="text"
                     name='address'
                     required
                     defaultValue={address}
              />
            </div>
            <div className="shipping__form__item">
              <label htmlFor="city">City</label>
              <input onChange={(e) => setCity(e.target.value)}
                     className='shipping__form__input'
                     id='city'
                     type="text"
                     name='city'
                     required
                     defaultValue={city}
              />
            </div>
            <div className="shipping__form__item">
              <label htmlFor="postal-code">Postal Code</label>
              <input onChange={(e) => setPostalCode(e.target.value)}
                     className='shipping__form__input'
                     id='postal-code'
                     type="text"
                     name='postal-code'
                     required
                     defaultValue={postalCode}
              />
            </div>
            <div className="shipping__form__item">
              <label htmlFor="country">Country</label>
              <input onChange={(e) => setCountry(e.target.value)}
                     className='shipping__form__input'
                     id='country'
                     type="text"
                     name='country'
                     required
                     defaultValue={country}
              />
            </div>
            <div className="shipping__form__submit">
              <button className='shipping__form__button' type='submit'>Continue</button>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  )
}

export default ShippingPage