import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../../components/Layout/Layout'
import SEO from '../../components/Seo'
import { listProducts } from '../../redux/actions/productAction'
import ProductCard from '../../components/ProductCard/ProductCard'
import Message from '../../components/Message/Message'
import './_products.scss'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
import Filters from '../../components/Filters/Filters'
import { getBrand } from '../../redux/actions/brandAction'
import { SORT_ADD, SORT_RESET } from '../../redux/actions/actionTypes'
import { graphql } from 'gatsby'

const ProductsPage = ({ data }) => {
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const brandList = useSelector((state) => state.brands)
  const sortList = useSelector((state) => state.sort)
  const { error, products: updatedProducts } = productList
  const { brands: updatedBrands, error: brandError } = brandList
  const { sorting } = sortList
  const [products, setProducts] = useState([])
  const [brands, setBrands] = useState([])

  useEffect(() => {
    if (!updatedProducts) {
      dispatch(listProducts())
    } else {
      setProducts(updatedProducts)
    }
    if (!updatedBrands) {
      dispatch(getBrand())
    } else {
      setBrands(updatedBrands)
    }
  }, [dispatch, updatedProducts, updatedBrands])

  useEffect(() => {
    if (data) {
      setProducts(data.swapi.getProducts)
      setBrands(data.swapi.getBrands)
    }
  }, [data])

  useEffect(() => {
    return () => {
      dispatch({type: SORT_RESET})
      dispatch(listProducts())
      setProducts(updatedProducts)
    }
  }, [dispatch])

  const sort = event => {
    dispatch({ type: SORT_ADD, payload: {
        sortBy: event.target.value,
        price: sorting.price,
        brands: sorting.brands,
    }})
    dispatch(listProducts('sort'))
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
          <div className='products__content'>
            <Filters brands={brands}/>
            <div className='products__list'>
              {products.map((product, index) => (
                <ProductCard key={index} product={product}/>
              ))}
            </div>
            {error && <Message variant='error'>{error}</Message>}
            {brandError && <Message variant='error'>{brandError}</Message>}
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default ProductsPage

export const query = graphql`
  query {
    swapi {
      getProducts {
        id, name, image,images, price, rating, numReviews, slug
      }
      getBrands {
        id, name
      }
    }
  }
`