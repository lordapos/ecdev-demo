import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listSortProducts } from '../../redux/actions/productAction'
import ProductCard from '../../components/ProductCard/ProductCard'
import Message from '../../components/Message/Message'

import './_featured_products.scss'

const FeaturedProducts = () => {
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList
  const productLength = 4

  useEffect(() => {
    dispatch(listSortProducts('cameras'))
  }, [dispatch])

  return (
    <section className="featured_products">
      <div className="featured_products__inner products">
        <h3 className="featured_products__headline">Featured Products</h3>
        {
          loading ? ('')
            : error ? (<Message variant='error'>{error}</Message>)
            : (<div className='products__list'>
              {
                products.map((product, index) => (
                  product.id <= productLength ?
                    <ProductCard key={index} product={product}/>
                    : null
                ))
              }
            </div>)
        }
      </div>
    </section>
  )
}
export default FeaturedProducts