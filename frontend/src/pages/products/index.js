import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../../components/Layout/Layout'
import SEO from '../../components/Seo'
import { listProducts } from '../../redux/actions/productAction'
import ProductCard from '../../components/ProductCard/ProductCard'
import Message from '../../components/Message/Message'
import './_products.scss'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'

const ProductsPage = () => {
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList
  const cls = ['products__list']

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  const sort = event => {
    const val = event.target.value
    dispatch(listProducts(val))
  }

  const breadcrumbs = [
    { to: '/', label: 'EcDevShop' },
    { to: '/products', label: 'Cameras' },
  ]

  return (
    <Layout>
      <SEO title='Products'/>
      <section className='products'>
        <div className="products__inner">
          <Breadcrumbs breadcrumbs={breadcrumbs}/>
          <div className="products__head">
            <h3 className='products__title'>DSLR and Mirrorless Cameras</h3>
            <div className="products__sort">
              <label htmlFor="sort">Sort by:</label>
              <select name="sort" className='products__select' id="sort" onChange={sort}>
                <option value="date-desc">Date</option>
                <option value="low_to_high">Price: Low to High</option>
                <option value="high_to_low">Price: High to Low</option>
              </select>
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