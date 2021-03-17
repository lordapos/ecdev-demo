import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import logo from '../../images/logo.svg'
import Layout from '../../components/Layout/Layout'
import Message from '../../components/Message/Message'
import { Link } from 'gatsby'
import SEO from '../../components/Seo'
import { register } from '../../redux/actions/userAction'
import { navigate } from 'gatsby'
import './_signup.scss'

const SignupPage = ({ location, history }) => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const userRegister = useSelector((state) => state.userRegister)
  const { error, userInfo } = userRegister
  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(register(name, email, password))
    }
  }

  return (
    <Layout>
      <SEO title='Signup'/>
      <section className='register'>
        <div className="register__inner">
          <div className="register__content">
            <h1 className='register__title'>Sign Up</h1>
            {message && <Message variant='error'>{message}</Message>}
            {error && <Message variant='error'>{error}</Message>}
            <form onSubmit={submitHandler} className="register__form">
              <label htmlFor="email">Email address</label>
              <input onChange={(e) => setEmail(e.target.value)}
                     className='register__form__input' id='email' type="text"
                     name='email' required/>
              <label htmlFor="name">Name</label>
              <input onChange={(e) => setName(e.target.value)}
                     className='register__form__input' id='name' type="text"
                     name='name' required/>
              <label htmlFor="password">Password</label>
              <input onChange={(e) => setPassword(e.target.value)}
                     className='register__form__input' id='password'
                     type="password"
                     name='password' required/>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input onChange={(e) => setConfirmPassword(e.target.value)}
                     className='register__form__input' id='confirmPassword'
                     type="password"
                     name='confirmPassword' required/>
              <button type='submit' className='register__form__button'>Register
              </button>
              <p className='register__form__reg'>Have an Account?{' '}<Link
                to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                Login
              </Link></p>
            </form>
          </div>
          <div className="register__image">
            <img src={logo} alt="ecdev"/>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default SignupPage