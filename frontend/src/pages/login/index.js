import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import logo from '../../images/logo.svg'
import Layout from '../../components/Layout/Layout'
import Message from '../../components/Message/Message'
import Loader from '../../components/Loader/Loader'
import { Link } from 'gatsby'
import SEO from '../../components/Seo'
import { login } from '../../redux/actions/userAction'
import { navigate } from 'gatsby'

const LoginPage = ({ location }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin
  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <Layout>
      <SEO title='Signup'/>
      <section className='login'>
        <div className="login__inner">
          <div className="login__content">
            <h1 className='login__title'>Log in</h1>
            {error && <Message variant='error'>{error}</Message>}
            {loading && <Loader/>}
            <form onSubmit={submitHandler} className="login__form">
              <label htmlFor="email">Email address</label>
              <input onChange={(e) => setEmail(e.target.value)}
                     className='login__form__input' id='email' type="text"
                     name='email' required placeholder='Enter email address'/>
              <label htmlFor="password">Password</label>
              <input onChange={(e) => setPassword(e.target.value)}
                     className='login__form__input' id='password'
                     type="password"
                     name='password' required/>
              <button type='submit' className='login__form__button'>Log In
              </button>
              <p className='login__form__reg'>New Customer?{' '} <Link
                to={redirect ? `/signup?redirect=${redirect}` : '/signup'}>
                Register
              </Link></p>
            </form>
          </div>
          <div className="login__image">
            <img src={logo} alt="ecdev"/>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default LoginPage