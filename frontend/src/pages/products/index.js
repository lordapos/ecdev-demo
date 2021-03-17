import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../../components/Layout/Layout'
import SEO from '../../components/Seo'
import { listProducts, viewProducts } from '../../redux/actions/productAction'
import Select from 'react-select'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faThLarge,
  faTh,
} from '@fortawesome/free-solid-svg-icons'
import ProductCard from '../../components/ProductCard/ProductCard'
import Message from '../../components/Message/Message'
import './_products.scss'

const ProductsPage = () => {
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList
  const view = useSelector((state) => state.productView)
  const { productsView } = view
  const products_views = ['products__views']
  products_views.push(productsView)
  const cls = ['products__list']
  cls.push(productsView)

  const bigCards = () => {
    dispatch(viewProducts('big-cards'))
  }

  const smallCards = () => {
    dispatch(viewProducts('small-cards'))
  }

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  const sort = selectedOption => {
    const val = selectedOption.value
    dispatch(listProducts(val))
  }

  const options = [
    { value: 'date-desc', label: 'Newest' },
    { value: 'low_to_high', label: 'Price: Low to High' },
    { value: 'high_to_low', label: 'Price: High to Low' },
  ]

  return (
    <Layout>
      <SEO title='Products'/>
      <section className='products'>
        <div className="products__inner">
          <div className="products__head">
            <h3 className='products__title'>Products</h3>
            <div className="products__sort">
              <Select placeholder='Sorting...' options={options} className='products__select' onChange={sort}/>
            </div>
            <div className={products_views.join(' ')}>
              <button className='products__views__item' onClick={bigCards}>
                <FontAwesomeIcon icon={faThLarge}/>
              </button>
              <button className='products__views__item' onClick={smallCards}>
                <FontAwesomeIcon icon={faTh}/>
              </button>
            </div>
          </div>
          {
            loading ? ('')
              : error ? (<Message variant='error'>{error}</Message>)
              : (<div className={cls.join(' ')}>
                {products.map((product, index) => (
                  <ProductCard key={index} product={product}/>
                ))}
              </div>)
          }
        </div>
      </section>
    </Layout>
  )
}

export default ProductsPage