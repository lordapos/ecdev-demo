import React from 'react'
import './_product-information.scss'
import Rating from '../../Rating/Rating'

import iconStock from '../../../images/ic_stock.svg'

const ProductInformation = ({ name, price, rating, numReviews }) => {
  return (
    <div className='product__information'>
      <div className='product__information__inner'>
        <p className='product__sku'><span className='product__sku__abr'>SKU: </span>756YRT34</p>
        <Rating value={rating} text={numReviews}/>
      </div>
      <h1 className='product__title'>{name}</h1>
      <div className='product__information__inner'>
        <h3 className='product__price'><span>$</span>{price}</h3>
        <p className='product__in-stock'>
          <img src={iconStock} alt='icon stock'/>
          In Stock
        </p>
      </div>
      <div className="highlights">
        <p className="highlights__tagline">Product Highlights</p>
        <ul className="highlights__list">
          <li className="highlights__item">Large 24.1 Megapixel APS-C Sensor</li>
          <li className="highlights__item">Full HD Movie Recording</li>
          <li className="highlights__item">Built-in Wi-Fi and NFC</li>
          <li className="highlights__item">Canon Connect App</li>
          <li className="highlights__item">3fps Burst Shooting</li>
          <li className="highlights__item">3.0" LCD Screen</li>
        </ul>
      </div>
    </div>
  )
}
export default ProductInformation