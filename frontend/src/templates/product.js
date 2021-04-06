import React, { useEffect, useState } from 'react'
import { graphql } from 'gatsby'
import { useDispatch, useSelector } from 'react-redux'
import { productDetails } from '../redux/actions/productAction'
import { PRODUCT_DETAILS_CLEAN, REVIEW_CLEAN } from '../redux/actions/actionTypes'
import { addToCart } from '../redux/actions/cartAction'
import Layout from '../components/Layout/Layout'
import SEO from '../components/Seo'
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs'
import Message from '../components/Message/Message'
import Preview from '../components/ProductPage/Preview/Preview'
import Information from '../components/ProductPage/Information/Information'
import iconCart from '../images/ic_cart_white.svg'
import iconShipping from '../images/ic_shipping.svg'
import Tabs from '../components/ProductPage/Tabs/Tabs'
import './_product.scss'

const ProductPage = ({ data, location }) => {
  const dispatch = useDispatch()
  const [highlights, setHighlights] = useState([])
  const [specs, setSpecs] = useState([])
  const [description, setDescription] = useState([])
  const [images, setImages] = useState([])
  const [reviews, setReviews] = useState([])
  const [product, setProduct] = useState(data.swapi.getProductBySlug)

  const productInfo = useSelector(state => state.productDetails)
  const { error, product: updatedProduct } = productInfo
  const review = useSelector(state => state.review)
  const { success } = review
  const slug = location.pathname.split('/')[2]

  useEffect(() => {
    dispatch(productDetails(slug))
    return () => {
      dispatch({ type: PRODUCT_DETAILS_CLEAN })
    }
  },[dispatch, location, slug])

  useEffect(() => {
    if (updatedProduct && updatedProduct.slug === slug) {
      setProduct(updatedProduct)
    }
  }, [updatedProduct, slug])

  useEffect(() => {
    if (data) {
      setProduct(data.swapi.getProductBySlug)
    }
  }, [data, location])

  useEffect(() => {
    if (success) {
      dispatch(productDetails(product.slug))
      dispatch({ type: REVIEW_CLEAN })
    }
  }, [dispatch, success, product])

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
    { to: '/cameras', label: 'Cameras' },
    { to: `/product/${product.id}`, label: product.name },
  ]

  const addToCartHandler = () => {
    dispatch(addToCart(product.id, 1))
  }

  return (
    <Layout productId={product.id}>
      <SEO title={product.name ? product.name : 'Product'}/>
      <section className='product'>
        <div className="product__inner">
          <Breadcrumbs breadcrumbs={breadcrumbs}/>
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
                <span className="product__shipping__text">FREE SHIPPING Available</span>
              </div>
            </div>
            <div className="product__content__bottom">
              <Tabs
                rating={product.rating}
                numReviews={product.numReviews}
                specs = {specs}
                description = {description}
                reviews = {reviews}
              />
            </div>
          </div>
          {error && <Message variant='error'>{error}</Message>}
        </div>
      </section>
    </Layout>
  )
}

export default ProductPage

export const query = graphql`
  query($slug: String!) {
    swapi {
      getProductBySlug(slug: $slug) {
         id, name, image,images, price, description, rating, numReviews, brandId, sku, highlights, specs, youtubeEmbed, review 
      }
    }
  }
`