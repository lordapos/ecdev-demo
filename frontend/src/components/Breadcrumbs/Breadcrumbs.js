import React from 'react'
import { Link } from 'gatsby'
import './_breadcrumbs.scss'
import arrow from '../../images/arrowBack.svg'

const Breadcrumbs = ({ breadcrumbs }) => {
  return (
    <div className='breadcrumbs'>
      {breadcrumbs.map((breadcrumb, index) => (
        <Link className='breadcrumbs__item' key={index} to={breadcrumb.to}>
          { index === 0 ? (<div className='breadcrumbs__back'><img className='arrow' src={arrow} alt="arrow"/><strong>Back</strong></div>) : null}
          {breadcrumb.label}
        </Link>
      ))}
    </div>
  )
}

export default Breadcrumbs