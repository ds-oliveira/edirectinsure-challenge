import axios from 'axios'

const {
  BACKEND_API_URL: backendUrl = 'http://localhost:3000',
  BACKEND_API_KEY: backendApiKey = 'hDb0Euw9wKYBk6vr26Gr816x7ITSFeE1'
} = process.env

const instance = axios.create({
  baseURL: backendUrl,
  timeout: 1000,
});

const get = ({ endpoint, token = '' }) => instance.get(
  `${backendUrl}${endpoint}`,
  {
    headers: {
      'api_key': backendApiKey,
      token
    }
  }
)

const post = ({ endpoint, params, token = '' }) => instance.post(
  `${backendUrl}${endpoint}`,
  params,
  {
    headers: {
      'api_key': backendApiKey,
      token
    }
  }
)

const put = ({ endpoint, params, token = '' }) => instance.put(
  `${backendUrl}${endpoint}`,
  params,
  {
    headers: {
      'api_key': backendApiKey,
      token
    }
  }
)

module.exports = {
  get,
  post,
  put
}