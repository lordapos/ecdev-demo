import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, listProducts } from '../../redux/actions/productAction'
import AdminLayout from '../../components/Layout/AdminLayout'
import SEO from '../../components/Seo'
import Message from '../../components/Message/Message'
import { Link } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'

const ProductsPage = () => {
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  const productDelete = useSelector((state) => state.productDelete)
  const {
    error: errorDelete,
    success: successDelete,
  } = productDelete

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch, successDelete])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteProduct(id))
    }
  }

  const renderProducts = (products) => {
    return products.map((product, index) => {
      return (
        <li className='admin__products__item' key={index}>
          <div className='admin__products__item__tab'>
            <p>{product.id}</p>
          </div>
          <div className='admin__products__item__tab'>
            <p>{product.name}</p>
          </div>
          <div className='admin__products__item__tab'>
            <p>{product.price}$</p>
          </div>
          <div className='admin__products__item__tab'>
            <Link className='admin__products__link' to={`/admin/product/` + product.id}><FontAwesomeIcon icon={faEdit}/></Link>
            <button
              className='admin__products__remove'
              onClick={() => deleteHandler(product.id)}
            >
              <FontAwesomeIcon icon={faTrash}/>
            </button>
          </div>
        </li>
      )
    })
  }

  return (
    <AdminLayout>
      <SEO title='Products List'/>
      <div className="admin__head">
        <h1>Products</h1>
        <Link to='/admin/add-product' className='admin__add-btn'>Create Product</Link>
      </div>
      {errorDelete && <Message variant='error'>{errorDelete}</Message>}
      {loading ? (
        ''
      ) : error ? (
        <Message variant='error'>{error}</Message>
      ) : (
        <ul className='admin__products__list'>
          <li className='admin__products__item'>
            <div className='admin__products__item__tab'>
              <h6>ID</h6>
            </div>
            <div className='admin__products__item__tab'>
              <h6>Name</h6>
            </div>
            <div className='admin__products__item__tab'>
              <h6>Email</h6>
            </div>
            <div className='admin__products__item__tab'>
              <h6>Action</h6>
            </div>
          </li>
          {renderProducts(products)}
        </ul>
      )}
    </AdminLayout>
  )
}

export default ProductsPage
