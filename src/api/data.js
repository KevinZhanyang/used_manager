import axios from '@/libs/api.request'

export const getTableData = () => {
  return axios.request({
    url: '/used/v1/get_table_data',
    method: 'get'
  })
}

export const getDragList = () => {
  return axios.request({
    url: '/used/v1/get_drag_list',
    method: 'get'
  })
}

export const errorReq = () => {
  return axios.request({
    url: '/used/v1/error_url',
    method: 'post'
  })
}

export const saveErrorLogger = info => {
  return axios.request({
    url: '/used/v1//save_error_logger',
    data: info,
    method: 'post'
  })
}

export const uploadImg = formData => {
  return axios.request({
    url: 'image/upload',
    data: formData
  })
}

// 查找某一类型的字典列表数据
export const listDict = type => {
  return axios.request({
    url: 'reading/v1/baseSystemParameter/type/' + type,
    method: 'get'
  })
}
