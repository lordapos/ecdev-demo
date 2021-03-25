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
                  <h1 className='product__title'>{product.name}</h1>
                  <h3 className='product__price'>{product.price}</h3>
                  <p className='product__description'>{product.description}</p>
                  <div className="product__qty">
                    <p className='product__qty__title'>Quantity:</p>
                    <div className='product__qty__form'>
                      <button onClick={() => changeQty(qty - 1)} className='product__qty__button'>-</button>
                      <h6 className='product__qty__value'>{qty}</h6>
                      <button onClick={() => changeQty(qty + 1)} className='product__qty__button'>+</button>
                    </div>
                  </div>
                  <button onClick={addToCartHandler} className='h6 product__add-to-cart'>Add to cart</button>
                </div>
              </div>
            )}
        </div>
      </section>
    </Layout>
  )
}

export default ProductPage