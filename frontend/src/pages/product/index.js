import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { productDetails } from '../../redux/actions/productAction'
import Layout from '../../components/Layout/Layout'
import SEO from '../../components/Seo'
import { addToCart } from '../../redux/actions/cartAction'
import Message from '../../components/Message/Message'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
import { PRODUCT_DETAILS_CLEAN, REVIEW_CLEAN } from '../../redux/actions/actionTypes'
import './_product.scss'
import Preview from '../../components/ProductPage/Preview/Preview'
import Information from '../../components/ProductPage/Information/Information'

import iconCart from '../../images/ic_cart_white.svg'
import iconShipping from '../../images/ic_shipping.svg'
import Tabs from '../../components/ProductPage/Tabs/Tabs'

const ProductPage = ({ location }) => {
  const [qty, setQty] = useState(1)
  const dispatch = useDispatch()

  const [highlights, setHighlights] = useState([])
  const [specs, setSpecs] = useState([])
  const [description, setDescription] = useState([])
  const [images, setImages] = useState([])
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    const ID = location.pathname.split('/')[2]
    dispatch(productDetails(ID))
    return () => {
      dispatch({ type: PRODUCT_DETAILS_CLEAN })
    }
  }, [dispatch, location])

  const productInfo = useSelector(state => state.productDetails)
  const { loading, error, product } = productInfo

  const review = useSelector(state => state.review)
  const { success } = review

  useEffect(() => {
    if (success) {
      const ID = location.pathname.split('/')[2]
      dispatch(productDetails(ID))
      dispatch({ type: REVIEW_CLEAN })
    }
  }, [dispatch, success])

  useEffect(() => {
    if (product.highlights) {
      setHighlights(JSON.parse(product.highlights))
    }
    if (product.specs){
      setSpecs(JSON.parse(product.specs))
    }
    if (product.description){
      setDescription(JSON.parse(product.description))
    }
    if (product.images){
      setImages(JSON.parse(product.images))
    }
    if (product.review){
      setReviews(JSON.parse(product.review))
    }
  }, [product])

  const breadcrumbs = [
    { to: '/', label: 'EcDevShop' },
    { to: '/products', label: 'Cameras' },
    { to: `/product/${product.id}`, label: product.name },
  ]

  const addToCartHandler = () => {
    dispatch(addToCart(product.id, qty))
  }

  return (
    <Layout youtubeEmbed={product.youtubeEmbed}>
      <SEO title={product.name ? product.name : 'Product'}/>
      <section className='product'>
        <div className="product__inner">
          <Breadcrumbs breadcrumbs={breadcrumbs}/>
          {loading ?
            '' :
            error ? (<Message variant='error'>{error}</Message>) : (
              <div className="product__content">
                <div className="product__content__left">
                  <Preview
                    images={images}
                    alt={product.name}
                  />
                </div>
                <div className="product__content__right">
                  <Information
                    name={product.name}
                    price={product.price}
                    rating={product.rating}
                    numReviews={product.numReviews}
                    sku={product.sku}
                    highlights={highlights}
                  />
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
                <div className="product__content__bottom">
                  <Tabs
                    numReviews={product.numReviews}
                    specs = {specs}
                    description = {description}
                    youtubeEmbed = {product.youtubeEmbed}
                    reviews = {reviews}
                  />
                </div>
              </div>
            )}
        </div>
      </section>
    </Layout>
  )
}

export default ProductPage