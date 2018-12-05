import axios from '@/libs/api.request'

/**
 * Info: 音频
 * Created by wangyifan on 2018-11-26 19:33:31
 *
 * recId : string //
 * name : string //
 * url : string //
 * intro : string //
 * cover : string //封面图片URL
 * belongTo : string //album 专辑，book书籍
 * belongToId : string //专辑或书籍主键
 * playNum : number //
 * createId : string //
 * createTime : string //
 * updateId : string //
 * updateTime : string //
 * 
 */
export default {
  // 新增
  insert (model, callbackObj) {
    axios.request({url:'/reading/v1/audio', data:model, method:'post'})
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
    axios.request({url:'/reading/v1/audio', params:param})
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
    axios.request({url:'/reading/v1/audio/' + id}).then((resp) => {
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
    axios.request({url:'/reading/v1/audio/' + id,method:'delete'}).then((resp) => {
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
    axios.request({url:'/reading/v1/audio/' + model.recId, data:model,method:'put'})
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
