import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AdminLayout from '../../components/Layout/AdminLayout'
import SEO from '../../components/Seo'
import Message from '../../components/Message/Message'
import {
  productDetails,
  updateProduct,
} from '../../redux/actions/productAction'
import {
  PRODUCT_DETAILS_CLEAN,
  PRODUCT_UPDATE_RESET,
} from '../../redux/actions/actionTypes'
import axios from '../../axios/axios'
import { navigate } from 'gatsby'
import Loader from '../../components/Loader/Loader'

const EditProduct = ({ location }) => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState(1)
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)
  const dispatch = useDispatch()

  const productInfo = useSelector((state) => state.productDetails)
  const { loading, error, product } = productInfo

  const productUpdate = useSelector((state) => state.productUpdate)
  const {
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate

  useEffect(() => {
    const ID = location.pathname.split('/')[3]
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      navigate('/admin/products')
    } else {
      if (!product || !product.name) {
        dispatch(productDetails(ID))
      } else {
        setName(product.name)
        setPrice(product.price)
        setImage(product.image)
        setDescription(product.description)
      }
    }
  }, [dispatch, location, product, successUpdate])

  useEffect(() => {
    return () => {
      dispatch({ type: PRODUCT_DETAILS_CLEAN })
    }
  }, [dispatch, location])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setImage('/uploads/'+data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateProduct({
        id: product.id,
        name,
        price: parseFloat(price),
        image,
        description,
      })
    )
  }

  return (
    <AdminLayout>
      <SEO title='Edit product'/>
      <h1>Edit product</h1>
      {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
      {loading ? (
        ''
      ) : error ? (
        <Message variant='error'>{error}</Message>
      ) : (
        <form className='admin__product__form' action="#" onSubmit={submitHandler}>
          <label className="admin__product__form__item">
            <h6>Name</h6>
            <input type="text" value={name} className='admin__product__form__input' required onChange={(e) => setName(e.target.value)}/>
          </label>
          <label className="admin__product__form__item">
            <h6>Price</h6>
            <input type="number" value={price} min="1" className='admin__product__form__input' required onChange={(e) => setPrice(e.target.value)}/>
          </label>
          <label className="admin__product__form__item">
            <h6>Description</h6>
            <textarea name="description" cols="30" rows="10" value={description} required onChange={(e) => setDescription(e.target.value)}>

            </textarea>
          </label>
          <label className="admin__product__form__item">
            <h6>Image {uploading && <Loader />}</h6>
            <img src={image} alt="Ecdev"
                 className='admin__product__form__image'/>
            <input type="file" className='admin__product__form__input' onChange={uploadFileHandler}/>
          </label>

          <div className="admin__product__form__item">
            <button type='submit' className='admin__product__form__submit'>Update</button>
          </div>
        </form>
      )}
    </AdminLayout>
  )
}

export default EditProduct