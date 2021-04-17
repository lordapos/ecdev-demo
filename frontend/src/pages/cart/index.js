import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart, addToCart } from '../../redux/actions/cartAction'
import Layout from '../../components/Layout/Layout'
import SEO from '../../components/Seo'
import { navigate } from 'gatsby'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
import Message from '../../components/Message/Message'
import Link from 'gatsby-link'
import { updateCart } from '../../redux/actions/cartAction'
import './_cart.scss'

const CartPage = () => {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const { cartItems, loaded } = cart
  const [items, setItems] = useState(0)
  const [price, setPrice] = useState(0)

  const breadcrumbs = [
    { to: '/', label: 'Home' },
    { to: '/cart', label: 'Shopping Cart' },
  ]

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const checkoutHandler = () => {
    if (userInfo) {
      navigate('/shipping')
    } else {
      navigate('/login')
    }
  }

  useEffect(() => {
    if (!loaded) {
      dispatch(updateCart())
    }
  }, [dispatch, loaded])

  useEffect(() => {
    setItems(cartItems.reduce((acc, item) => acc + item.qty, 0))
    setPrice(cartItems.reduce((acc, item) => acc + item.qty * item.price, 0))
  }, [cartItems, price])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const changeCartQtyHandler = (id, qty, old) => {
    if (old + qty > 0) {
      dispatch(addToCart(id, qty))
    } else if (old + qty === 0) {
      dispatch(removeFromCart(id))
    } else if (old + qty < 0) {
      dispatch(removeFromCart(id))
    } else {
      dispatch(removeFromCart(id))
    }
  }

  return (
    <Layout>
      <SEO title='Cart'/>
      <section className='cart'>
        <div className="cart__inner">
          <Breadcrumbs breadcrumbs={breadcrumbs}/>
          <h1 className='cart__title'>Shopping Cart</h1>
          <div className='cart__content'>
            {!cartItems || cartItems.length === 0 ?
              <Message variant='info'>Your cart is empty</Message> :
              (<>
                  <div className="cart__content__left">
                    <div className="cart__product">
                      <div className='cart__product__head'>
                        <p className="cart__product__head__name">Product</p>
                        <p className="cart__product__head__qty">Quantity</p>
                        <p className="cart__product__head__total">Total</p>
                      </div>
                      {cartItems.map((product) => (
                        <div key={product.id} className="cart__product__item">
                          <Link className='cart__product__item__image-wrap' to={`/product/${product.slug}`}>
                            <img className='cart__product__item__image' src={product.image}
                                 alt="ecdev"/></Link>
                          <div className="cart__product__item__info">
                            <Link to={`/product/${product.slug}`} className='cart__product__item__title'>{product.name}</Link>
                            <p className='cart__product__item__price'>${product.price}</p>
                            <button onClick={() => removeFromCartHandler(product.id)} className='cart__product__item__remove'>
                              <span>Remove</span>
                            </button>
                          </div>
                          <div className="cart__product__item__qty">
                            <button onClick={() => changeCartQtyHandler(product.id, -1, product.qty)} className='cart__product__item__qty-btn'>
                              <svg height="426pt" viewBox="0 -192 426.66667 426" width="426pt" xmlns="http://www.w3.org/2000/svg">
                                <path
                                  d="m405.332031 43h-384c-11.773437 0-21.332031-9.558594-21.332031-21.332031 0-11.777344 9.558594-21.335938 21.332031-21.335938h384c11.777344 0 21.335938 9.558594 21.335938 21.335938 0 11.773437-9.558594 21.332031-21.335938 21.332031zm0 0"/>
                              </svg>
                            </button>
                            <span className='cart__product__item__qty-val'>{product.qty}</span>
                            <button onClick={() => changeCartQtyHandler(product.id, 1, product.qty)} className='cart__product__item__qty-btn'>
                              <svg height="426.66667pt" viewBox="0 0 426.66667 426.66667" width="426.66667pt" xmlns="http://www.w3.org/2000/svg">
                                <path
                                  d="m405.332031 192h-170.664062v-170.667969c0-11.773437-9.558594-21.332031-21.335938-21.332031-11.773437 0-21.332031 9.558594-21.332031 21.332031v170.667969h-170.667969c-11.773437 0-21.332031 9.558594-21.332031 21.332031 0 11.777344 9.558594 21.335938 21.332031 21.335938h170.667969v170.664062c0 11.777344 9.558594 21.335938 21.332031 21.335938 11.777344 0 21.335938-9.558594 21.335938-21.335938v-170.664062h170.664062c11.777344 0 21.335938-9.558594 21.335938-21.335938 0-11.773437-9.558594-21.332031-21.335938-21.332031zm0 0"/>
                              </svg>
                            </button>
                          </div>
                          <p className="cart__product__item__total">${(product.qty * product.price).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="cart__content__right">
                    <div className="cart__order">
                      <h5 className="cart__order__title">Order Summary</h5>
                      <div className="cart__order__item">
                        <p>{items > 1 ? items + ' Items' : items + ' Item'}</p>
                        <p>${price.toFixed(2)}</p>
                      </div>
                      <div className="cart__order__item cart__order__item--total">
                        <p>Total</p>
                        <p>${price.toFixed(2)}</p>
                      </div>
                      <button onClick={checkoutHandler} className='cart__order__button'>Checkout</button>
                    </div>
                  </div>
                </>)}
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default CartPage