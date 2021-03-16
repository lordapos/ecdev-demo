import axios from 'axios'

let url = ''
if (process.env.NODE_ENV === 'production') {
  url = '/'
} else {
  url = 'http://localhost:5000'
}

export default axios.create({
  baseURL: url,
})