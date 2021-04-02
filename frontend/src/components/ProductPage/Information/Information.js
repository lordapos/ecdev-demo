import React, {useEffect}  from  'react'
import './_information.scss'
import Rating from '../../Rating/Rating'

import iconStock from '../../../images/ic_stock.svg'

const Information = ({ name, price, rating, numReviews, sku, highlights,  }) => {

  const renderItems = (items) =>{
     return items.map((item, index) => {
      return(
        <li className="highlights__item" key={index}>{ item }</li>
      )
    })
  }


  return (
    <div className='product__information'>
      <div className='product__information__inner'>
        <p className='product__sku'><span className='product__sku__abr'>SKU: </span>{sku}</p>
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
      <div className='highlights'>
        <p className='highlights__tagline'>Product Highlights</p>
        <ul className='highlights__list'>
          {renderItems(highlights)}
        </ul>
      </div>
    </div>
  )
}
export default Information