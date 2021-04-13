import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import SEO from '../../components/Seo'
import Message from '../../components/Message/Message'
import { Link, navigate } from 'gatsby'
import { useDispatch, useSelector } from 'react-redux'
import {
  getUserDetails,
  logout,
  updateUserProfile,
} from '../../redux/actions/userAction'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
import { listMyOrders } from '../../redux/actions/orderAction'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTimes,
} from '@fortawesome/free-solid-svg-icons'
import { USER_DETAILS_RESET } from '../../redux/actions/actionTypes'
import './_profile.scss'

const ProfilePage = () => {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [tab, setTab] = useState('account')

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  const orderListMy = useSelector((state) => state.orderListMy)
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } else {
      if (!user || !user.name) {
        dispatch(getUserDetails())
      } else {
        setName(user.name)
        setEmail(user.email)
      }
      if (user) {
        dispatch(listMyOrders())
      }
    }
  }, [dispatch, userInfo, user, success])

  useEffect(() => {
    return () => {
      dispatch({ type: USER_DETAILS_RESET })
    }
  }, [dispatch])

  const breadcrumbs = [
    { to: '/', label: 'Home' },
    { to: '/profile', label: 'My Account' },
  ]

  const logoutHandler = () => {
    dispatch(logout())
  }

  const tabHandler = (tab) => {
    setTab(tab)
  }

  const profile = ['profile']
  profile.push(tab)

  const submitHandler = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else if(password.length < 6){
      setMessage('Passwords do not match')
    }
    else {
      dispatch(updateUserProfile({ name, email, password }))
    }
  }

  const renderOrders = (items) => {
    return items.map((order, index) => {
      return (
        <li key={index} className='profile__orders__item'>
          <div className='profile__orders__item__tab'>
            <h6>{toDate(order.createdAt)}</h6>
          </div>
          <div className='profile__orders__item__tab'>
            <h6>{order.totalPrice}$</h6>
          </div>
          <div className='profile__orders__item__tab'>
            <h6>
              {order.paidAt ? (
                order.paidAt
              ) : (
                <FontAwesomeIcon icon={faTimes} style={{ color: 'red' }}/>
              )}
            </h6>
          </div>
          <div className='profile__orders__item__tab'>
            <h6>
              {order.isDelivered ? (
                order.deliveredAt
              ) : (
                <FontAwesomeIcon icon={faTimes} style={{ color: 'red' }}/>
              )}
            </h6>
          </div>
          <div className='profile__orders__item__tab'>
            <Link className='profile__orders__item__link' to={`/order/${order.id}`}>View</Link>
          </div>
        </li>
      )
    })
  }

  const toDate = (val) => {
    return new Date(+val).toLocaleString()
  }

  return (
    <Layout>
      <SEO title='Profile'/>
      <section className={profile.join(' ')}>
        <div className="profile__inner">
          <Breadcrumbs breadcrumbs={breadcrumbs}/>
          <div className="profile__content">
            <div className="profile__tabs">
              <ul className='profile__tabs__list'>
                <li className='profile__tabs__item'>
                  <button onClick={() => tabHandler('account')}
                          className='profile__tabs__button profile__tabs__button--account'>
                    <i className='fas fa-user'> </i> My Account
                  </button>
                </li>
                <li className='profile__tabs__item'>
                  <button onClick={() => tabHandler('orders')}
                          className='profile__tabs__button profile__tabs__button--orders'>
                    <i
                      className="fas fa-clipboard-list"> </i> My Orders
                  </button>
                </li>
                <li className='profile__tabs__item'>
                  <button onClick={logoutHandler}
                          className='profile__tabs__button'><i
                    className="fas fa-sign-out-alt"> </i> Log Out
                  </button>
                </li>
              </ul>
            </div>
            <div className="profile__tabs__content">
              <div className="profile__account active">
                <h2 className='profile__personal__title'>Personal
                  information {loading ? '' : null}</h2>
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
                           name='email'
                           pattern=".{6,}"
                           required
                           title="6 characters minimum"
                           value={email}/>
                  </div>
                  <div className="profile__personal__item">
                    <label htmlFor="password">Password</label>
                    <input onChange={(e) => setPassword(e.target.value)}
                           className='profile__personal__input' id='password'
                           type="password"
                           name='password'
                           pattern=".{6,}"
                           required
                           title="6 characters minimum"
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
                           required
                    />
                  </div>
                  <div className="profile__personal__submit">
                    <button className='profile__personal__button'
                            type='submit'>Save
                    </button>
                  </div>
                </form>
              </div>
              <div className="profile__orders">
                <h2 className='profile__orders__title'>My Orders</h2>
                {loadingOrders ? (
                  ''
                ) : errorOrders ? (
                  <Message variant='error'>{errorOrders}</Message>
                ) : (
                  <div className="profile__orders__overflow-container">
                    <ul className='profile__orders__list'>
                      <li className='profile__orders__item profile__orders__item--head'>
                        <div className='profile__orders__item__tab'>
                          <h6>DATE</h6>
                        </div>
                        <div className='profile__orders__item__tab'>
                          <h6>TOTAL</h6>
                        </div>
                        <div className='profile__orders__item__tab'>
                          <h6>PAID</h6>
                        </div>
                        <div className='profile__orders__item__tab'>
                          <h6>DELIVERED</h6>
                        </div>
                        <div className='profile__orders__item__tab'> </div>
                      </li>
                      {renderOrders(orders)}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default ProfilePage