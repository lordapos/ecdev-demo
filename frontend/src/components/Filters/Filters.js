import React, { useEffect, useState } from 'react'
import InputRange from 'react-input-range'
import './_filter.scss'
import { useDispatch, useSelector } from 'react-redux'
import { SORT_ADD } from '../../redux/actions/actionTypes'
import { listProducts } from '../../redux/actions/productAction'

const Filters = ({ brands }) => {
  const dispatch = useDispatch()
  const sortList = useSelector((state) => state.sort)
  const { sorting } = sortList
  const [value, setValue] = useState(20000)
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
    dispatch(listProducts('sort'))
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
    dispatch(listProducts('sort'))
  }

  useEffect(() => {
    submitForm(checkedBrand)
  },[checkedBrand])

  return (
    <div className='filter'>
      <div className={rage.join(' ')}>
        <h5 className='filter__category__title' onClick={changeRage}>Price <span className='filter__category__arrow'> </span></h5>
        <div className='filter__category__rage'>
          <InputRange
            maxValue={20000}
            minValue={0}
            value={value}
            onChangeComplete ={value => sortPrice({ value })}
            onChange={value => changePrice({ value })}/>
                    </div>
      </div>
      <div className={brand.join(' ')}>
        <h5 className='filter__category__title' onClick={changeBrand}>Brand <span className='filter__category__arrow'> </span></h5>
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
                      submitForm(checkedBrand)
                    } else {
                      setCheckedBrand(checked.filter(x => x.id !== e.target.value))
                    }
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