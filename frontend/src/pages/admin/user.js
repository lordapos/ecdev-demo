import React, { useState, useEffect } from 'react'
import AdminLayout from '../../components/Layout/AdminLayout'
import SEO from '../../components/Seo'
import { getUserAdmin, updateUserAdmin } from '../../redux/actions/userAction'
import { USER_DETAILS_RESET } from '../../redux/actions/actionTypes'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message/Message'

const UserPage = ({ location }) => {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  useEffect(() => {
    const ID = location.pathname.split("/")[3]
    if (!user || !user.name) {
      dispatch(getUserAdmin(ID))
    } else {
      setName(user.name)
      setEmail(user.email)
    }
  }, [dispatch, location, user])

  useEffect(() => {
    return () => {
      dispatch({ type: USER_DETAILS_RESET})
    }
  }, [dispatch, location])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      const id = location.pathname.split("/")[3]
      dispatch(updateUserAdmin({ id, name, email, password }))
    }
  }

  return (
    <AdminLayout>
      <SEO title={'User ' + name} />
      <h1>User {name} {loading ? '' : null}</h1>
      {message && <Message variant='error'>{message}</Message>}
      {error ? (<Message variant='error'>{error}</Message>) : null}
      {success &&
      <Message variant='success'>Profile Updated</Message>}
      <form onSubmit={submitHandler}
            className='profile__personal__form'>
        <div className="profile__personal__item">
          <label htmlFor="name">Name</label>
          <input onChange={(e) => setName(e.target.value)}
                 className='profile__personal__input' type="text"
                 required name='name' id='name' value={name}/>
        </div>
        <div className="profile__personal__item">
          <label htmlFor="email">Email address</label>
          <input onChange={(e) => setEmail(e.target.value)}
                 className='profile__personal__input' id='email'
                 type="text"
                 name='email' required value={email}/>
        </div>
        <div className="profile__personal__item">
          <label htmlFor="password">Password</label>
          <input onChange={(e) => setPassword(e.target.value)}
                 className='profile__personal__input' id='password'
                 type="password"
                 name='password'
                 placeholder='******'
          />
        </div>
        <div className="profile__personal__item">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input onChange={(e) => setConfirmPassword(e.target.value)}
                 className='profile__personal__input'
                 id='confirmPassword'
                 type="password"
                 name='confirmPassword'
                 placeholder='******'
          />
        </div>
        <div className="profile__personal__submit">
          <button className='profile__personal__button' type='submit'>Save</button>
        </div>
      </form>
    </AdminLayout>
  )
}

export default UserPage