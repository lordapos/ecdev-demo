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

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  const rating = getRandomArbitrary(2, 5) + Math.random()

  const text = getRandomInt(500)

  return (
    <div className='products__item'>
      <Link to={`/product/${product.id}`} className="products__item__image-wrap">
        <img className='products__item__image' src={product.image} alt={product.name}/>
      </Link>
      <div className="products__item__info">
        <Rating value={rating} text={text} />
        <Link to={`/product/${product.id}`} className='h6 products__item__title'>{product.name}</Link>
        <div className="products__item__bottom">
          <h5 className='products__item__price'>
            <sup><small>$</small></sup>{product.price}</h5>
          <button onClick={() => addToCartHandler(product.id)} className='products__item__button'>
            <div className='products__item__icon-cart'> </div>Add to Cart</button>
          <div className="products__item__icon-cart"> </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard