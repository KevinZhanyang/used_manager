import axios from 'axios'
import store from '@/store'
import {getToken} from '@/libs/util'
import { Message } from 'iview'//引入message提示
axios.defaults.withCredentials = true
// import { Spin } from 'iview'
const addErrorLog = errorInfo => {
  const { statusText, status, request: { responseURL } } = errorInfo
  let info = {
    type: 'ajax',
    code: status,
    mes: statusText,
    url: responseURL
  }
  if (!responseURL.includes('save_error_logger')) store.dispatch('addErrorLog', info)
}

class HttpRequest {
  constructor (baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
  }
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'ACCESS-TOKEN': getToken()
      }
    }
    return config
  }
  destroy (url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  interceptors (instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      // 添加全局的loading...
      if (config.url.includes('/used/v1/authentication/form')) {
        // 判断是否是登录请求，如果存在的话，则每个http header都加上token
        config.headers.Authorization = `Basic YXBwaWQ6c2VjcmV0`
      }
      if (!Object.keys(this.queue).length) {
        // Spin.show() // 不建议开启，因为界面不友好
      }
      this.queue[url] = true
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      if (url.indexOf('/authentication/form') != -1) { // 判断是否是登录请求
        Message.success('登录成功')//首页提示
      }
      this.destroy(url)
      const { data, status } = res
      return { data, status }
    }, error => {
      console.log(url)
      console.log(11)
      if (url.indexOf('/authentication/form') != -1) { // 判断是否是登录请求
          Message.error('用户名或密码输入错误！')//首页提示
      }
      this.destroy(url)
      let errorInfo = error.response
      if (!errorInfo) {
        const { request: { statusText, status }, config } = JSON.parse(JSON.stringify(error))
        errorInfo = {
          statusText,
          status,
          request: { responseURL: config.url }
        }
      }
      addErrorLog(errorInfo)
      return Promise.reject(error)
    })
  }
  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest
