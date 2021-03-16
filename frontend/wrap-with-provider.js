import React from 'react'
import store from './src/redux/store'
import { Provider } from 'react-redux'

const WrapProvider = ({ element }) => {
  return <Provider store={store}>{element}</Provider>
}
export default WrapProvider