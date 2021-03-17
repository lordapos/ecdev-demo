import React from 'react'
import { Link } from 'gatsby'
import './_product-card.scss'
import { addToCart } from '../../redux/actions/cartAction'
import { useDispatch } from 'react-redux'

const ProductCard = ({ product }) => {
  const dispatch = useDispatch()
  const addToCartHandler = () => {
    dispatch(addToCart(product.id, 1))
  }

  return (
    <div className='products__item'>
      <Link to={`/product/${product.id}`} className="products__item__image-wrap">
        <img className='products__item__image' src={product.image}
             alt={product.name}/>
      </Link>
      <div className="products__item__info">
        <Link to={`/product/${product.id}`} className='h6 products__item__title'>{product.name}</Link>
        <div className="products__item__bottom">
          <h6 className='products__item__price'>
            <sup><small>US</small></sup>${product.price}</h6>
          <button onClick={() => addToCartHandler(product.id)} className='products__item__button'>Add to Cart</button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard