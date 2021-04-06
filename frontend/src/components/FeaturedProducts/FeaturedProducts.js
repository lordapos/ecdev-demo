import React  from 'react'
import ProductCard from '../../components/ProductCard/ProductCard'

import './_featured_products.scss'

const FeaturedProducts = ({ products }) => {
  const productLength = 4
  return (
    <section className="featured_products">
      <div className="featured_products__inner products">
        <h3 className="featured_products__headline">Featured Products</h3>
        <div className='products__list'>
          {
            products.map((product, index) => (
              product.id <= productLength ?
                <ProductCard key={index} product={product}/>
                : null
            ))
          }
        </div>
      </div>
    </section>
  )
}
export default FeaturedProducts