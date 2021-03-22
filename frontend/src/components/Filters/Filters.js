import React, { useState } from 'react'
import InputRange from 'react-input-range'
import { Formik, Form, Field, FieldArray } from 'formik'
import './_filter.scss'

const Filters = ({ brands }) => {
  const [value, setValue] = useState(20000)
  const [viewPrice, setViewPrice] = useState(false)
  const [viewBrand, setBrand] = useState(false)
  const [checkedBrand, setCheckedBrand] = useState('')
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

  const changeRage = () => {
    setViewPrice(!viewPrice)
  }

  const changeBrand = () => {
    setBrand(!viewBrand)
  }

  const tagCollection = brands

  return (
    <div className='filter'>
      <div className={rage.join(' ')}>
        <h5 className='filter__category__title' onClick={changeRage}>Price <span className='filter__category__arrow'> </span></h5>
        <div className='filter__category__rage'>
          <InputRange
            maxValue={20000}
            minValue={0}
            value={value}
            onChange={value => changePrice({ value })}/>
        </div>
      </div>
      <div className={brand.join(' ')}>
        <h5 className='filter__category__title' onClick={changeBrand}>Brand <span className='filter__category__arrow'> </span></h5>
        <div className="filter__category__brand">
          <Formik
            initialValues={{
              search: '',
              tags: [],
            }}
            onSubmit={values => {
              console.log(values)
            }}
            render={({ values }) => (
              <FieldArray
                name="tags"
                render={arrayHelpers => (
                  <div className='filter__category__form'>
                    {tagCollection.map(tag => (
                      <label key={tag.id} className='filter__category__form__item'>
                        <input
                          name="tags"
                          type="checkbox"
                          value={tag}
                          checked={values.tags.includes(tag.id)}
                          onChange={e => {
                            if (e.target.checked) {
                              arrayHelpers.push(tag.id);
                            } else {
                              const idx = values.tags.indexOf(tag.id);
                              arrayHelpers.remove(idx);
                            }
                          }}
                        />
                        <span>{tag.name}</span>
                      </label>
                    ))}
                  </div>
                )}
              />
            )}
          />
        </div>
      </div>
    </div>
  )
}

export default Filters