import React from 'react'
import { useSelector } from 'react-redux'
import './_mobile-menu.scss'
import { graphql, StaticQuery, Link } from 'gatsby'


const MobileMenu = () => {
  const mobMenu = useSelector((state) => state.app.visibleMobileMenu)
  const menuClass = mobMenu ? 'mobile-menu mobile-menu--show' : 'mobile-menu'

  const renderLinks = (links) => {
    return links.map((link, index) => {
      return (
        <li className='mobile-menu__item' key={index}>
          <Link
            to={'/'+link.name.toLowerCase()}
            activeClassName='mobile-menu__link--active'
            className='mobile-menu__link'
          >
            {link.name}
          </Link>
        </li>
      )
    })
  }

  return (
    <div className={menuClass}>
      <StaticQuery
        query={graphql`
              query {
                swapi {
                  getCategories {
                    id, name
                  }
                }
              }
            `}
        render={data => (
          <ul className='mobile-menu__list'>
            <li className='mobile-menu__item'>
              <Link
                to='/'
                className='mobile-menu__link'
                activeClassName='mobile-menu__link--active'
              >Home</Link>
            </li>
            {renderLinks(data.swapi.getCategories)}
          </ul>
        )}
      />
    </div>
  )
}

export default MobileMenu