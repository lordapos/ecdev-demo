import React from 'react'
import './_rating.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const Rating = ({ value, text, hideCountReviewers }) => {
  const style = {
    color: '#dddddd'
  }

  return (
    <div className='rating'>
      <span>
        <FontAwesomeIcon style={value < 1 ? style : null} icon={faStar}/>
      </span>
      <span>
        <FontAwesomeIcon style={value < 2 ? style : null} icon={faStar}/>
      </span>
      <span>
        <FontAwesomeIcon style={value < 3 ? style : null} icon={faStar}/>
      </span>
      <span>
        <FontAwesomeIcon style={value < 4 ? style : null} icon={faStar}/>
      </span>
      <span>
        <FontAwesomeIcon style={value < 5 ? style : null} icon={faStar}/>
      </span>
      {
        hideCountReviewers ? null
          : <span>({text})</span>
      }
    </div>
  )
}

Rating.defaultProps = {
  color: '#f8e825',
}

export default Rating
