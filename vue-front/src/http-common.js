import axios from 'axios'

export default axios.create({
  baseURL: 'http://192.168.0.76:8082/api/',
  headers: {
    'Content-type': 'application/json'
  }
})
