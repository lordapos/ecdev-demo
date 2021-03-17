import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AdminLayout from '../../components/Layout/AdminLayout'
import SEO from '../../components/Seo'
import Loader from '../../components/Loader/Loader'
import Message from '../../components/Message/Message'
import { navigate } from 'gatsby'
import axios from '../../axios/axios'
import { PRODUCT_CREATE_RESET } from '../../redux/actions/actionTypes'
import { createProduct } from '../../redux/actions/productAction'

const AddProductPage = () => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState(1)
  const [image, setImage] = useState('/uploads/sample.jpg')
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)
  const dispatch = useDispatch()

  const productCreate = useSelector((state) => state.productCreate)
  const {
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate

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
      setImage('/uploads/' + data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET })
    if (successCreate) {
      navigate(`/admin/product/${createdProduct.id}`)
    }
  }, [dispatch, successCreate, createdProduct])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createProduct({
      name,
      price: parseFloat(price),
      image,
      description,
    }))
  }

  return (
    <AdminLayout>
      <SEO title='Add product'/>
      <h1>Add product</h1>
      {errorCreate && <Message variant='error'>{errorCreate}</Message>}
      <form className='admin__product__form' action="#" onSubmit={submitHandler}>
        <label className="admin__product__form__item">
          <h6>Name</h6>
          <input type="text" value={name} required className='admin__product__form__input' onChange={(e) => setName(e.target.value)}/>
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
          <h6>Image {uploading && <Loader/>}</h6>
          <img src={image} alt="Ecdev" className='admin__product__form__image'/>
          <input type="file" className='admin__product__form__input' onChange={uploadFileHandler}/>
        </label>

        <div className="admin__product__form__item">
          <button type='submit' className='admin__product__form__submit'>Create</button>
        </div>
      </form>
    </AdminLayout>
  )
}

export default AddProductPage