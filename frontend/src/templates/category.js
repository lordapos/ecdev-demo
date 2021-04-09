import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../components/Layout/Layout'
import SEO from '../components/Seo'
import { listSortProducts } from '../redux/actions/productAction'
import ProductCard from '../components/ProductCard/ProductCard'
import Message from '../components/Message/Message'
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs'
import Filters from '../components/Filters/Filters'
import { PRODUCT_LIST_RESET, SORT_ADD, SORT_RESET } from '../redux/actions/actionTypes'
import { graphql } from 'gatsby'

const CamerasPage = ({ data, location }) => {
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const sortList = useSelector((state) => state.sort)
  const { error, products: updatedProducts, url } = productList
  const { sorting } = sortList
  const [products, setProducts] = useState(data.swapi.getCatProducts)
  const slug = location.pathname.split('/')[1]

  useEffect(() => {
    return () => {
      dispatch({ type: SORT_RESET })
      dispatch({ type: PRODUCT_LIST_RESET })
    }
  }, [dispatch, slug])

  useEffect(() => {
    if (typeof updatedProducts === 'object' && url === location.href) {
      setProducts(updatedProducts)
    }
  }, [updatedProducts, location, url])

  const sort = event => {
    dispatch({
      type: SORT_ADD, payload: {
        sortBy: event.target.value,
        price: sorting.price,
        brands: sorting.brands,
      },
    })
    dispatch(listSortProducts(slug))
  }

  const breadcrumbs = [
    { to: '/', label: 'EcDevShop' },
    { to: '/'+data.swapi.getCategory.slug, label: data.swapi.getCategory.name },
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
              <select name="sort" className='products__select' id="sort" onChange={sort} onBlur={sort}>
                <option value="date-desc">Date</option>
                <option value="low_to_high">Price: Low to High</option>
                <option value="high_to_low">Price: High to Low</option>
              </select>
            </div>
          </div>
          <div className='products__content'>
            <Filters brands={data.swapi.getBrands} category={slug}/>
            <div className='products__list'>
              {products.map((product, index) => (
                <ProductCard key={index} product={product}/>
              ))}
            </div>
            {error && <Message variant='error'>{error}</Message>}
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default CamerasPage

export const query = graphql`
  query($category: String!) {
    swapi {
      getCatProducts(category: $category) {
        id, name, image, images, price, rating, numReviews, slug
      }
      getBrands {
        id, name
      }
      getCategory (category: $category) {
        name, slug
      }
    }
  }
`