import axios from '@/libs/api.request'

/**
 * Info: 
 * Created by wangyifan on 2018-12-13 17:03:14
 *
 * id : number //
 * status : number //0pass|1forbiden
 * isPartner : number //0非合伙人|1合伙人
 * isTester : number //0试验员|1非
 * scores : number //
 * wechat : string //
 * openid : string //
 * avatar : string //
 * nickname : string //
 * gender : string //
 * country : string //
 * province : string //
 * city : string //
 * phone : string //
 * createdAt :  //
 * updatedAt :  //
 * 
 */
export default {
  // 新增
  insert (model, callbackObj) {
    axios.request({url:'/used/v1/users', data:model, method:'post'})
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
    axios.request({url:'/used/v1/users', params:param})
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
    axios.request({url:'/used/v1/users/' + id}).then((resp) => {
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
    axios.request({url:'/used/v1/users/' + id,method:'delete'}).then((resp) => {
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
    axios.request({url:'/used/v1/users/' + model.id, data:model,method:'put'})
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
