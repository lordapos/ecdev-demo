import React from 'react'
import { Link } from 'gatsby'
import './_product-card.scss'
import { addToCart } from '../../redux/actions/cartAction'
import { useDispatch } from 'react-redux'
import Rating from '../Rating/Rating'

const ProductCard = ({ product }) => {
  const dispatch = useDispatch()
  const addToCartHandler = () => {
    dispatch(addToCart(product.id, 1))
  }

  return (
    <div className='products__item'>
      <Link to={`/product/${product.slug}`} className="products__item__image-wrap">
        <img className='products__item__image' src={product.image} alt={product.name}/>
      </Link>
        <Rating value={product.rating} text={`${product.numReviews}`} />
        <Link to={`/product/${product.slug}`} className='h6 products__item__title'>{product.name}</Link>
        <div className="products__item__bottom">
          <h5 className='products__item__price'>
            <sup><small>$</small></sup>{product.price}</h5>
          <button onClick={() => addToCartHandler(product.id)} className='products__item__button'>
            <div className='products__item__icon-cart'> </div>Add to Cart</button>
          <div className="products__item__icon-cart"> </div>
        </div>
    </div>
  )
}

export default ProductCard