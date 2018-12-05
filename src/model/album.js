import axios from '@/libs/api.request'

/**
 * Info: 专辑
 * Created by wangyifan on 2018-11-29 10:43:56
 *
 * recId : string //
 * name : string //
 * intro : string //
 * slogan : string //
 * type : string //1 音频，2视频，3 书籍，4音频+视频，5音频+书籍，6视频+书籍，7音频+视频+书籍
 * cover : string //封面图片URL
 * publishStatus : string //0 未发布，1已发布
 * status : string //0 删除，1正常
 * visitNum : number //
 * createId : string //
 * createTime : string //
 * updateId : string //
 * updateTime : string //
 * 
 */
export default {
  // 新增
  insert (model, callbackObj) {
    axios.request({url:'/reading/v1/album', data:model, method:'post'})
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
    axios.request({url:'/reading/v1/album', params:param})
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
    axios.request({url:'/reading/v1/album/' + id}).then((resp) => {
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
    axios.request({url:'/reading/v1/album/' + id,method:'delete'}).then((resp) => {
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
    axios.request({url:'/reading/v1/album/' + model.recId, data:model,method:'put'})
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
