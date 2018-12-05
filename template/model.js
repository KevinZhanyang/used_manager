import axios from '@/libs/api.request'

/**
 * Info: ${tableComment}$
 * Created by ${author}$ on ${createDate}$
 *
 * {% for field in fields %}${field.name}$ : ${field.type}$ //${field.comment}$
 * {% endfor %}
 */
export default {
  // 新增
  insert (model, callbackObj) {
    axios.request({url:'${prePath}$/${objName}$', data:model, method:'post'})
      .then((resp) => {
        var code = resp['status']
        var body = resp['data']
        if (code === 200) {
          if (callbackObj && callbackObj.success) {
            callbackObj.success(body)
          } else {
            Message.success('保存成功!')
          }
        } else {
          if (callbackObj && callbackObj.error) {
            callbackObj.error(body)
          } else {
            Message.error('保存失败[' + body + ']!')
          }
        }
      })
  },
  // 根据条件查询
  query (param, callbackObj) {
    if (!param) {
      param = {}
    }
    axios.request({url:'${prePath}$/${objName}$', params:param})
      .then((resp) => {
        var body = resp['data']
        var code = resp['status']
        if (code === 200) {
          if (callbackObj && callbackObj.success) {
            callbackObj.success(body)
          } else {
            Message.success('查询成功!')
          }
        } else {
          if (callbackObj && callbackObj.error) {
            callbackObj.error(body)
          } else {
            Message.error('查询失败[' + body + ']!')
          }
        }
      })
  },
  // 根据主键查询
  view (id, callbackObj) {
    axios.request({url:'${prePath}$/${objName}$/' + id}).then((resp) => {
      var body = resp['data']
      var code = resp['status']
      if (code === 200) {
        if (callbackObj && callbackObj.success) {
          callbackObj.success(body)
        } else {
          Message.success('查询成功!')
        }
      } else {
        if (callbackObj && callbackObj.error) {
          callbackObj.error(body)
        } else {
          Message.error('查询失败[' + body + ']!')
        }
      }
    })
  },
  // 根据主键删除
  deleteBy (id, callbackObj) {
    axios.request({url:'${prePath}$/${objName}$/' + id,method:'delete'}).then((resp) => {
      var code = resp['status']
      var body = resp['data']
      if (code === 200) {
        if (callbackObj && callbackObj.success) {
          callbackObj.success(body)
        } else {
          Message.success('删除成功!')
        }
      } else {
        if (callbackObj && callbackObj.error) {
          callbackObj.error(body)
        } else {
          Message.error('删除失败[' + body + ']!')
        }
      }
    })
  },
  // 根据主键更新
  update (model, callbackObj) {
    axios.request({url:'${prePath}$/${objName}$/' + model.${pk}$, data:model,method:'put'})
      .then((resp) => {
        var code = resp['status']
        var body = resp['data']
        if (code === 200) {
          if (callbackObj && callbackObj.success) {
            callbackObj.success(body)
          } else {
            Message.success('更新成功!')
          }
        } else {
          if (callbackObj && callbackObj.error) {
            callbackObj.error(body)
          } else {
            Message.error('更新失败[' + body + ']!')
          }
        }
      })
  }
}
