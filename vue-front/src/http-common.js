import axios from 'axios'

export default axios.create({
  baseURL: 'http://212.128.144.150:3333/api/',
  headers: {
    'Content-type': 'application/json'
  }
})
