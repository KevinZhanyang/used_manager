import axios from '@/libs/api.request'

export const login = ({ userName, password }) => {
  const data = {
    username: userName,
    password
  }
  return axios.request({
    url: '/used/v1/authentication/form',
    data,
    method: 'post'
  })
}

export const getUserInfo = (token) => {
  return axios.request({
    url: '/used/v1/currentUser',
    method: 'get'
  })
}

export const logout = (token) => {
  return axios.request({
    url: '/used/v1/authentication/logout',
    method: 'get'
  })
}

export const getUnreadCount = () => {
  return axios.request({
    url: '/used/v1/message/count',
    method: 'get'
  })
}

export const getMessage = () => {
  return axios.request({
    url: '/used/v1/message/init',
    method: 'get'
  })
}

export const getContentByMsgId = msg_id => {
  return axios.request({
    url: '/used/v1/message/content',
    method: 'get',
    params: {
      msg_id
    }
  })
}

export const hasRead = msg_id => {
  return axios.request({
    url: '/used/v1/message/has_read',
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const removeReaded = msg_id => {
  return axios.request({
    url: '/used/v1/message/remove_readed',
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const restoreTrash = msg_id => {
  return axios.request({
    url: '/used/v1/message/restore',
    method: 'post',
    data: {
      msg_id
    }
  })
}
