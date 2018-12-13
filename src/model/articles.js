import axios from '@/libs/api.request'

/**
 * Info:
 * Created by wangyifan on 2018-12-11 12:05:35
 *
 * id : number //
 * status : number //0pass|1firbiden
 * onOffer : number //0出售中|1下架
 * userId : key //用户ID
 * views : number //浏览数
 * collect : number //收藏数量
 * messages : number //留言数
 * likes : number //赞数量
 * categoryId : key //category
 * schoolId : key //学校ID
 * provinceId : key //学校ID
 * content :  //内容
 * price : string //价格
 * phone : string //价格
 * wechat : string //微信号码
 * formId : string //价格
 * longitude : string //经度
 * latitude : string //纬度
 * address : string //价格
 * circleImg : string //发到朋友圈的图片
 * shareImg : string //发到朋友圈的图片
 * promotionAt : string //刷新时间|用于排名
 * refreshAt : string //刷新时间|用于排名
 * createdAt : string //
 * updatedAt : string //
 * type : number //
 * isNew : number //
 * tardeWay : string //
 * noPage : number //
 * schoolName : string //
 * categoryName : string //
 * probinceName : string //
 *
 */
export default {
  // 新增
  insert (model, callbackObj) {
    axios.request({url:'/used/v1/articles/biz', data:model, method:'post'})
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
    axios.request({url:'/used/v1/articles', params:param})
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
    axios.request({url:'/used/v1/articles/' + id}).then((resp) => {
      var body = resp['data']
      var code = resp['status']
      if (code === 200) {
        if (callbackObj && callbackObj.success) {
          callbackObj.success(body.body)
        } else {
          Message.success('查询成功!')
        }
      } else {
        if (callbackObj && callbackObj.error) {
          callbackObj.error(body.body)
        } else {
          Message.error('查询失败[' + body + ']!')
        }
      }
    })
  },
  // 根据主键删除
  deleteBy (id, callbackObj) {
    axios.request({url:'/used/v1/articles/' + id,method:'delete'}).then((resp) => {
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
    axios.request({url:'/used/v1/articles/' + model.id, data:model,method:'put'})
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
