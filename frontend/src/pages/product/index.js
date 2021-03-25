import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { productDetails } from '../../redux/actions/productAction'
import Layout from '../../components/Layout/Layout'
import SEO from '../../components/Seo'
import { addToCart } from '../../redux/actions/cartAction'
import Message from '../../components/Message/Message'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
import { PRODUCT_DETAILS_CLEAN } from '../../redux/actions/actionTypes'
import './_product.scss'
import ProductPreview from '../../components/ProductPage/ProductPreview/ProductPreview'
import ProductInformation from '../../components/ProductPage/ProductInformation/ProductInformation'

import iconCart from '../../images/ic_cart_white.svg'
import iconShipping from '../../images/ic_shipping.svg'

const ProductPage = ({ location }) => {
  const [qty, setQty] = useState(1)
  const dispatch = useDispatch()

  useEffect(() => {
    const ID = location.pathname.split('/')[2]
    dispatch(productDetails(ID))
    return () => {
      dispatch({ type: PRODUCT_DETAILS_CLEAN })
    }
  }, [dispatch, location])

  const productInfo = useSelector(state => state.productDetails)
  const { loading, error, product } = productInfo

  const changeQty = (value) => {
    if (value < 1) {
      setQty(1)
    } else {
      setQty(value)
    }
  }

  const breadcrumbs = [
    { to: '/', label: 'EcDevShop' },
    { to: '/products', label: 'Cameras' },
    { to: `/product/${product.id}`, label: product.name },
  ]

  const addToCartHandler = () => {
    dispatch(addToCart(product.id, qty))
  }

  return (
    <Layout>
      <SEO title={product.name ? product.name : 'Product'}/>
      <section className='product'>
        <div className="product__inner">
          <Breadcrumbs breadcrumbs={breadcrumbs}/>
          {loading ?
            '' :
            error ? (<Message variant='error'>{error}</Message>) : (
              <div className="product__content">
                <div className="product__content__left">
                  <ProductPreview mainImage={product.image} alt={product.name}/>
                </div>
                <div className="product__content__right">
                  <ProductInformation name={product.name} price={product.price} rating={product.rating} numReviews={product.numReviews}/>
                  <button onClick={addToCartHandler} className='product__add-to-cart'>
                    <img src={iconCart} alt='icon cart' className="product__add-to-cart__icon"/>
                    Add to cart
                  </button>
                  <div className="product__shipping">
                    <img src={iconShipping} alt="icon shipping" className="product__shipping__icon"/>
                    <a href="/" className="product__shipping__link">FREE SHIPPING</a>
                    <span className="product__shipping__text">Available</span>
                  </div>
                </div>
              </div>
            )}
        </div>
      </section>
    </Layout>
  )
}

export default ProductPage