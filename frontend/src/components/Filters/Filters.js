import React, { useState, useEffect } from 'react'
import InputRange from 'react-input-range'
import './_filter.scss'
import { useDispatch, useSelector } from 'react-redux'
import { SORT_ADD } from '../../redux/actions/actionTypes'
import { listSortProducts } from '../../redux/actions/productAction'

const Filters = ({ brands, category }) => {
  const dispatch = useDispatch()
  const sortList = useSelector((state) => state.sort)
  const { sorting } = sortList
  const [value, setValue] = useState(2000)
  const [viewPrice, setViewPrice] = useState(false)
  const [viewBrand, setBrand] = useState(false)
  const [checkedBrand, setCheckedBrand] = useState([])
  const rage = ['filter__category']
  const brand = ['filter__category']
  if (viewPrice) {
    rage.push('filter__category--active')
  }
  if (viewBrand) {
    brand.push('filter__category--active')
  }

  const changePrice = ({ value }) => {
    setValue(value)
  }

  const sortPrice = ({ value }) => {
    setValue(value)
    dispatch({ type: SORT_ADD, payload: {
        sortBy: sorting.sortBy,
        price: value,
        brands: sorting.brands,
      }})
    dispatch(listSortProducts(category))
  }

  const changeRage = () => {
    setViewPrice(!viewPrice)
  }

  const changeBrand = () => {
    setBrand(!viewBrand)
  }

  const submitForm = ( values ) => {
    dispatch({ type: SORT_ADD, payload: {
        sortBy: sorting.sortBy,
        price: sorting.price,
        brands: values,
      }})
    dispatch(listSortProducts(category))
  }

  useEffect(() => {
    submitForm(checkedBrand)
  },[checkedBrand])

  return (
    <div className='filter'>
      <div className={rage.join(' ')}>
        <button className='h5 filter__category__title' onClick={changeRage}>Price <span className='filter__category__arrow'> </span></button>
        <div className='filter__category__rage'>
          <InputRange
            maxValue={2000}
            minValue={0}
            value={value}
            onChangeComplete ={value => sortPrice({ value })}
            onChange={value => changePrice({ value })}/>
        </div>
      </div>
      <div className={brand.join(' ')}>
        <button className='h5 filter__category__title' onClick={changeBrand}>Brand <span className='filter__category__arrow'> </span></button>
        <div className="filter__category__brand">
          <form action="#" className='filter__category__form'>
            {brands.map(tag => (
              <label key={tag.id} className='filter__category__form__item'>
                <input
                  name={tag.name}
                  type="checkbox"
                  value={tag.id}
                  checked={checkedBrand.find(x => x.id === tag.id)}
                  onChange={e => {
                    let checked = checkedBrand
                    if (e.target.checked) {
                      const val = {
                        name: e.target.name,
                        id: e.target.value,
                      }
                      checked.push(val)
                      setCheckedBrand(checked)
                    } else {
                      setCheckedBrand(checked.filter(x => x.id !== e.target.value))
                    }
                    submitForm(checkedBrand)
                  }}
                />
                <span>{tag.name}</span>
              </label>
            ))}
          </form>
        </div>
      </div>
    </div>
  )
}

export default Filters