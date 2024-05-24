import axios from 'axios'

export default () => {
  const api = axios.create({
    baseURL: '/api'
  })
  api.interceptors.request.use((request) => {
    return request
  },
  )
  api.interceptors.response.use((response) => {
    if (response.data.code === 200) {
      return Promise.resolve(response)
    }
    return Promise.reject(response)
  }, (error) => {
    let message = error.message
    if (message === 'Network Error') {
      message = '后端网络故障'
    }
    else if (message.includes('timeout')) {
      message = '接口请求超时'
    }
    else if (message.includes('Request failed with status code')) {
      message = `接口${message.substr(message.length - 3)}异常`
    }
    return Promise.reject(error)
  })
  return api
}
