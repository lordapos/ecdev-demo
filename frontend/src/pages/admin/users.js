import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AdminLayout from '../../components/Layout/AdminLayout'
import { listUsers, deleteUser } from '../../redux/actions/userAction'
import { Link } from 'gatsby'
import Message from '../../components/Message/Message'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTrash,
  faEdit
} from '@fortawesome/free-solid-svg-icons'
import SEO from '../../components/Seo'

const UsersPage = () => {
  const dispatch = useDispatch()
  const userList = useSelector((state) => state.userList)
  const { loading, error, users } = userList

  const userDelete = useSelector((state) => state.userDelete)
  const { success: successDelete } = userDelete

  useEffect(() => {
    dispatch(listUsers())
  }, [dispatch, successDelete])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteUser(id))
    }
  }

  const renderUsers = (users) => {
    return users.map((user, index) => {
      return (
        <li className='admin__user__item' key={index}>
          <div className='admin__user__item__tab'>
            <p>{user.id}</p>
          </div>
          <div className='admin__user__item__tab'>
            <p>{user.name}</p>
          </div>
          <div className='admin__user__item__tab'>
            <p>{user.email}</p>
          </div>
          <div className='admin__user__item__tab'>
            <Link className='admin__user__link' to={`/admin/user/` + user.id}><FontAwesomeIcon icon={faEdit}/></Link>
            <button
              className='admin__user__remove'
              onClick={() => deleteHandler(user.id)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </li>
      )
    })
  }

  return (
    <AdminLayout>
      <SEO title='Users' />
      <h1>Users</h1>
      {loading ? (
        ''
      ) : error ? (
        <Message variant='error'>{error}</Message>
      ) : (
      <ul className='admin__user__list'>
        <li className='admin__user__item'>
          <div className='admin__user__item__tab'>
            <h6>ID</h6>
          </div>
          <div className='admin__user__item__tab'>
            <h6>Name</h6>
          </div>
          <div className='admin__user__item__tab'>
            <h6>Email</h6>
          </div>
          <div className='admin__user__item__tab'>
            <h6>Action</h6>
          </div>
        </li>
        {renderUsers(users)}
      </ul>
      )}
    </AdminLayout>
  )
}

export default UsersPage
