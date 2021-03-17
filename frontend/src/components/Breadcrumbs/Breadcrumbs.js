import React from 'react'
import { Link } from 'gatsby'
import './_breadcrumbs.scss'

const Breadcrumbs = ({ breadcrumbs }) => {
  return (
    <div className='breadcrumbs'>
      {breadcrumbs.map((breadcrumb, index) => (
        <Link className='breadcrumbs__item' key={index} to={breadcrumb.to}>{breadcrumb.label}</Link>
      ))}
    </div>
  )
}

export default Breadcrumbs