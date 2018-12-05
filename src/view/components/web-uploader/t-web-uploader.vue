<style scoped>
    .upload-btn {
        position: relative;
        display: inline;
    }
</style>

<template>
    <div class="ivu-upload">
      <div v-if="android" @click="mobileUpload">
        <slot name="uploadBtn">
          <i-button type="text">
            <Icon type="android-upload" style="font-size:20px;color:#fdbc3e;"></Icon>
          </i-button>
        </slot>
      </div>
        <div v-else :class="classes" @drop.prevent="onDrop" @dragover.prevent="dragOver = true"
             @dragleave.prevent="dragOver = false">
            <div id="wrapper" class="sl-cf">
                <div :id="randomId" class="upload-btn">
                    <slot name="uploadBtn">
                        <i-button type="text" style="font-size:14px;color:#fdbc3e;border-color:#fdbc3e;">
                            <Icon type="android-upload" style="font-size:20px;"></Icon>
                            上传附件
                        </i-button>
                    </slot>
                </div>
            </div>
        </div>
        <slot name="tip">
            <Row>
                建议上传文件不超过10M
            </Row>
        </slot>
        <slot name="files">
            <ul class="ivu-upload-list" style="line-height: 1;" v-if="showUploadList">
                <li v-for="(file, index) in fileList" :class="fileCls(file)" :key="index" @click="handleClick(file)">
                    <span @click="handlePreview(file)">
                        <Icon :type="formatType(file)"></Icon> {{ file.name }}
                    </span>
                    <Icon type="ios-close-empty" class="ivu-upload-list-remove" v-show="file.status === 'finished'"
                          @click.native="removeFile(index)"></Icon>
                    <transition name="fade">
                        <i-progress v-if="file.status === 'uploading'" :stroke-width="2" style="line-height: 1;"
                                    :percent="parsePercentage(file.percentage)"
                                    :status="file.status === 'finished' && file.showProgress ? 'success' : 'normal'"></i-progress>
                    </transition>
                </li>
            </ul>
        </slot>
        <!--<i-button type="text" v-if="mobile">-->
        <!--<Icon type="android-upload" style="font-size:20px;color:#fdbc3e;"></Icon>-->
        <!--</i-button>-->
    </div>
</template>

<script>
/* eslint-disable no-console */

/**
     * TODO 需要小蒋配合做移动端上传回调
     * 为了不污染现有项目代码 该组件用t-web-uploader命名
     * Created by shirongqiu on 2018/4/26.
     */
import WebUploader from 'webuploader'
import configs from '@/config/config'
import {trim} from '@/libs/util'

export default {
  name: 't-web-uploader',
  components: {},
  data () {
    return {
      randomId: `filePicker_${Math.random() * 100000000000000000}`,
      wul_uploader: null,
      currentFile: null,
      fileList: [],
      dragOver: false,
      percentage: 0,
      fileObject: {
        uid: '',
        name: '',
        ext: '',
        type: '',
        status: '',
        percentage: 0,
        firstImg: '',
        num: -1,
        originName: '',
        size: 0,
        url: ''
      }
      // uploadLoading: false,
      // stopBtn: true
    }
  },
  props: {
    callBackName: {
      type: String,
      default () {
        return ''
      }
    },
    mobileType: {
      type: Number,
      validator: function (value) {
        return [0, 1, 2].indexOf(value) >= 0
      },
      default () {
        return 2
      }
    },

    android: {
      type: Boolean,
      default () {
        return false
      }
    },
    // 是否显示文件列表 默认显示
    showUploadList: {
      type: Boolean,
      default () {
        return true
      }
    },

    // 允许的文件后缀，不带点，多个用逗号分割。
    format: {
      type: String,
      default () {
        // jpg,jpeg,png,pdf,mp4,avi.mp3
        return ''
      }
    },

    accept: {
      type: String,
      default () {
        return ''
      }
    },

    // 是否开启分片上传  默认开启
    chunked: {
      type: Boolean,
      default () {
        return true
      }
    },

    // 分片大小设置
    chunkSize: {
      type: Number,
      default () {
        return 512 * 10240
      }
    },

    // 分片上传重试次数
    chunkRetry: {
      type: Number,
      default () {
        return 1
      }
    },

    // 上传文件大小限制
    sizeLimit: {
      type: Number,
      default () {
        return 209715200000
      }
    },

    // 上传文件数量限制
    countLimit: {
      type: Number,
      default () {
        return 5
      }
    },

    // 上传服务器地址
    server: {
      type: String,
      default () {
        return `${configs.WEB_UPLOADER_URL}`
      }
    },

    // 禁掉全局的拖拽功能。这样不会出现图片拖进页面的时候，把图片打开。
    disableGlobalDnd: {
      type: Boolean,
      default: function () {
        return true
      }
    },

    // 拖拽还是选择
    type: {
      type: String,
      validator: function (value) {
        return ['select', 'drag'].indexOf(value) >= 0
      },
      default: 'select'
    },

    // 默认文件列表
    defaultFileList: {
      type: Array,
      default: function () {
        return []
      }
    },

    // 暂时注掉  防止以后需要支持多文件上传
    multiple: {
      type: Boolean,
      default: function () {
        return false
      }
    }
  },
  computed: {
    classes () {
      return [
        'ivu-upload',
        {
          'ivu-upload-select': this.type === 'select',
          'ivu-upload-drag': this.type === 'drag',
          'ivu-upload-dragOver': this.type === 'drag' && this.dragOver
        }
      ]
    }
  },
  watch: {
    defaultFileList (list) {
      list.forEach(item => {
        item.status = 'finished'
      })
      this.fileList = Array.apply([], list)
    }
  },
  methods: {
    mobileUpload () {
      if (this.android) {
        const windowName = `t_web_upload_${this.randomId}`
        window[windowName] = this.$root
        try {
          android.uploadFiles(this.mobileType, this.countLimit, windowName, this.callBackName, trim(this.accept) == '' ? 'all' : this.accept)
        } catch (e) {
          this.$Message.error('不支持微信中使用！')
        }
      }
    },
    /**
             * 获取当前上传列表中的文件
             * @returns {Array|*}
             */
    getFileList () {
      return this.fileList
    },
    // 绑定事件
    wul_init () {
      var _this = this
      _this.wul_uploader.on('beforeFileQueued', function (file) {
        if (!_this.multiple) {
          _this.clearFiles()
        }
        _this.currentFile = file
      })

      // 提示只能选择一个文件
      _this.wul_uploader.on(
        'filesQueued',
        function (files) {
          if (files.length == 0) return false
          if (files.length > 1 && !_this.multiple) {
            _this.$Message.error({
              content: '未提供多文件上传服务。'
            })
            for (var i = 0; i < files.length; i++) {
              _this.wul_uploader.cancelFile(files[i])
            }
            _this.wul_uploader.cancelFile(_this.currentFile)
            _this.wul_uploader.reset()
          } else {
            if (_this.fileList.length == _this.countLimit) {
              _this.$Message.error({
                content: '已经达到上传文件限制数量'
              })
              _this.wul_uploader.cancelFile(_this.currentFile)
            } else {
              var uid = files[0]['source'].uid
              // 此时往需要上传的文件列表中添加文件
              var file = {
                uid: uid,
                name: files[0].name,
                type: files[0].type,
                ext: files[0].ext,
                status: 'ready',
                percentage: 0
              }
              _this.fileObject = file
              _this.fileList.push(_this.fileObject)
            }
          }
        }
      )

      // 文件校验格式和大小
      // on-format-error on-exceeded-size
      _this.wul_uploader.on(
        'error',
        function (type) {
          // debugger
          if (type == 'Q_EXCEED_SIZE_LIMIT') {
            _this.$emit('on-exceeded-size', _this.currentFile)
          }
          if (type == 'Q_TYPE_DENIED') {
            _this.$emit('on-format-error', _this.currentFile)
          }
          if (type == 'F_EXCEED_SIZE') {
            _this.$emit('on-exceeded-size', _this.currentFile)
          }
          if (type == 'DUPLICATE') {
            // _this.$emit('on-exceeded-size', _this.currentFile);
            _this.$Message.error({
              content: '文件重复上传'
            })
          }
          _this.wul_uploader.cancelFile(_this.currentFile)
        }
      )

      // 每次切片上传完成之后的判断
      _this.wul_uploader.on('uploadAccept', function (object, ret) {
        // flag返回1更新fileObject内容
        if (ret['completeFlag'] == 1) {
          var files = _this.wul_uploader.getFiles()
          if (!_this.multiple) files = files.slice(0, 1)
          if (files.length == 0) return
          _this.fileObject.firstImg = ret['firstImg']
          _this.fileObject.num = ret['num']
          _this.fileObject.originName = ret['originName']
          _this.fileObject.size = ret['size']
          _this.fileObject.url = ret['url']
        }
      })

      // before-upload
      // eslint-disable-next-line no-unused-vars
      _this.wul_uploader.on('uploadBeforeSend', function (object,
        data,
        headers) {
        // 第一个切片上传前执行
        if (!data.chunk || data.chunk == 0) {
          _this.$emit('before-upload')
        }
      })

      // 上传进度
      _this.wul_uploader.on(
        'uploadProgress',
        function (file, percentage) {
          _this.percentage = percentage * 100
          _this.fileObject.status = 'uploading'
          _this.fileObject.percentage = _this.percentage
        }
      )

      // 上传完成 on-success
      // eslint-disable-next-line no-unused-vars
      _this.wul_uploader.on('uploadSuccess', function (file, response) {
        _this.fileObject.status = 'finished'
        _this.$emit('on-success', _this.fileObject, _this.fileList)
      })

      // 上传失败钩子  on-error
      _this.wul_uploader.on('uploadError', function (file, reason) {
        _this.$emit('on-error', _this.fileObject, reason)
      })
    },

    option (key, val) {
      if (!this.android) {
        this.wul_uploader.option(key, val)
        const options = this.wul_uploader.options
        this.wul_uploader.destroy() // 注销uploader
        this.wul_uploader = WebUploader.create(options)
        this.wul_init()
      }
    },

    // 移除文件
    removeFile (index) {
      this.fileList.splice(index, 1)
      const file = this.getFiles()[index]
      if (file && !this.android) {
        this.wul_uploader.removeFile(file, true)
      }
      this.$emit('on-remove', index)
    },

    // 获取文件集合
    getFiles () {
      if (!this.android) {
        return this.wul_uploader.getFiles()
      }
    },

    // 清除文件集合
    clearFiles () {
      var _this = this
      if (!this.android) {
        var files = _this.getFiles()
        files.map(function (item) {
          _this.wul_uploader.removeFile(item, true)
        })
      }
      this.fileList.splice(0, this.fileList.length)
    },

    change () {
      this.option('accept', {
        title: 'Images',
        extensions: 'gif, jpg, jpeg, bmp, png'
      })
    },

    /**
             * icon格式化
             * @param file
             * @return {string}
             */
    formatType (file) {
      var format =
                    file.name
                      .split('.')
                      .pop()
                      .toLocaleLowerCase() || ''
      var type = 'document'
      if (['gif', 'jpg', 'jpeg', 'png', 'bmp', 'webp'].indexOf(format) > -1) {
        type = 'image'
      }
      if (
        ['mp4', 'm3u8', 'rmvb', 'avi', 'swf', '3gp', 'mkv', 'flv'].indexOf(
          format
        ) > -1
      ) {
        type = 'ios-film'
      }
      if (['mp3', 'wav', 'wma', 'ogg', 'aac', 'flac'].indexOf(format) > -1) {
        type = 'ios-musical-notes'
      }
      if (['doc', 'txt', 'docx', 'pages', 'epub', 'pdf'].indexOf(format) > -1) {
        type = 'document-text'
      }
      if (['numbers', 'csv', 'xls', 'xlsx'].indexOf(format) > -1) {
        type = 'stats-bars'
      }
      if (['keynote', 'ppt', 'pptx'].indexOf(format) > -1) {
        type = 'ios-videocam'
      }
      return type
    },

    /**
             * 进度条格式化
             * @param val
             * @return {Number}
             */
    parsePercentage (val) {
      return parseInt(val, 10)
    },

    onDrop (e) {
      this.dragOver = false
      if (!this.android) {
        this.uploadFiles(e['dataTransfer'].files)
      }
    },

    fileCls (file) {
      return [
        'ivu-upload-list-file',
        {
          'ivu-upload-list-file-finish': file.status === 'finished'
        }
      ]
    },

    // 预览
    handlePreview (file) {
      this.$emit('on-file-preview', file)
    },

    handleClick (file) {
      this.$emit('on-file-click', file)
    },

    wul_initCreate () {
      let _this = this
      if (!this.android) {
        if (typeof (_this.wul_uploader) === 'object' && _this.wul_uploader !== null) {
          try {
            _this.wul_uploader.destroy()
          } catch (e) {
            console.log(e)
          }
        }
        _this.wul_uploader = WebUploader.create({
          // swf文件路径
          // swf: `${env === 'production' ? '/reading-h5/dist' : ''}/plugins/webuploader-0.1.5/Uploader.swf`,
          // 文件接收服务端。
          server: _this.server,
          // 定义选择按钮
          pick: {
            id: `#${_this.randomId}`,
            multiple: false
          },
          // 自动上传
          auto: true,
          // 禁止浏览器打开文件
          disableGlobalDnd: _this.disableGlobalDnd,
          // 添加截图功能
          paste: '#wrapper',
          // 定义拖动面板
          dnd: '#wrapper',
          // 分片上传
          chunked: _this.chunked,
          // 分片大小为2M
          chunkSize: _this.chunkSize,
          // 分片上传失败重试次数
          chunkRetry: _this.chunkRetry,
          // 图片不做压缩
          compress: false,
          // 队列设置10个,为了选择多个文件的时候能提示
          fileNumLimit: 10,
          // 提前准备好下一个文件
          prepareNextFile: true,
          // 限制单个文件大小
          fileSingleSizeLimit: _this.sizeLimit,
          // 线程数
          threads: 3,
          // 限制格式
          accept: {
            title: 'access',
            extensions: _this.format,
            mimeTypes: _this.accept
          }
        })
        _this.wul_init()
      }
    }
  },
  mounted () {
    this.wul_initCreate()
  },

  beforeDestroy () {
    if (this.wul_uploader != null && !this.android) {
      this.wul_uploader.destroy()
    }
  }
}
</script>
