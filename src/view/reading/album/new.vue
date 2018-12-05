<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="mouse"></Icon>
                {{title}}
            </p>
            <Form :model="model" label-position="right" :label-width="100">
                <FormItem label="栏目名称">
                    <Input v-model="model.name"></Input>
                </FormItem>
              <FormItem label="Slogan">
                <Input v-model="model.slogan"></Input>
              </FormItem>
                <FormItem label="简介">
                    <t-quill-editor v-model="model.intro" :text="model.intro" placeholder="请输入简介"></t-quill-editor>
                </FormItem>
                <FormItem label="类型">
                    <Input v-model="model.type"></Input>
                </FormItem>
                <FormItem label="封面">
                  <t-web-uploader format="jpg,jpeg,bmp,png" accept="image/*"
                  :show-upload-list="false" @on-success="handleDone"
                  @on-error="handleError" @on-format-error="handleFormatError"
                  @on-exceeded-size="handleMaxSize"
                  @on-remove="handleRemove" ref="upload">
                    <span slot="uploadBtn">
                    <div>
                      <Button icon="ios-cloud-upload-outline" >添加封面</Button>
                    </div>
                    </span>
                    <p slot="tip">
                      <img v-if="model.cover" style="width:200px;height:200px" :src="model.cover"/>
                    </p>
                  </t-web-uploader>
                </FormItem>
                <FormItem label="是否展示">
                    <Input v-model="model.status"></Input>
                </FormItem>
                <FormItem label="浏览次数">
                    <input-number v-model="model.visitNum"></input-number>
                </FormItem>
            </Form>
            <Row style="padding-top: 10px" type="flex" justify="center">
                <span @click="insertOrUpdate" style="margin: 0 10px;"><Button type="primary" icon="back">保存</Button></span>
                <span @click="goBack" style="margin: 0 10px;"><Button icon="back">返回</Button></span>
            </Row>
        </Card>
    </div>
</template>

<script>
import { trim, trim2Zero } from '@/libs/util.js'
import album from '@/model/album'
import tWebUploader from '../../components/web-uploader/t-web-uploader.vue'
import tQuillEditor from '../../components/t-quill-editor/t-quill-editor.vue'

/**
 * Info:
 * Created by wangyifan on 2018-11-21 14:41:32
 */
export default {
  name: 'albumNew',
  components: {
    tWebUploader, tQuillEditor
  },
  data () {
    return {
      title: '',
      model: {
        cover: '',
        intro: ''
      },
      ruleValidate: {}
    }
  },
  watch: {},
  computed: {},
  methods: {
    view (id) {
      var _this = this
      album.view(id, {
        success: function (data) {
          _this.model = Object.assign({}, _this.model, {
            recId: data.recId,
            name: data.name,
            slogan: data.slogan,
            intro: data.intro,
            type: data.type,
            cover: data.cover,
            publishStatus: data.publishStatus,
            status: data.status,
            visitNum: trim2Zero(data.visitNum),
            createId: data.createId,
            createTime: data.createTime,
            updateId: data.updateId,
            updateTime: data.updateTime
          })
        }
      })
    },
    // 新增or更新
    insertOrUpdate () {
      var _this = this
      var recId = this.$route.params.recId
      if (trim(recId)) {
        album.update(_this.model, {
          success: function (data) {
            _this.$Message.success({
              content: '更新成功!',
              onClose: function () {
                _this.goBack()
              }
            })
          }
        })
      } else {
        album.insert(_this.model, {
          success: function (data) {
            _this.$Message.success({
              content: '保存成功!',
              onClose: function () {
                _this.goBack()
              }
            })
          }
        })
      }
    },
    goBack () {
      this.$router.push({ path: '/album/list', name: 'albumList' })
    },
    handleDone: function (file, fileList) {
      var _this = this
      // 获取文件类型
      _this.uploadList = fileList.slice(0, 1)
      _this.model = Object.assign({}, _this.model, {
        cover: file['url']
      })
    },
    handleError: function (response, file, fileList) {
      this.$Message.error({
        content: '文件 ' + file.name + ' 上传失败，请重新上传。'
      })
    },
    handleFormatError: function (file) {
      this.$Message.error({
        content:
          '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
      })
    },
    handleMaxSize: function (file) {
      this.$Message.error({
        content: '文件 ' + file.name + ' 太大，不能超过 2M。'
      })
    },
    handleRemove: function (file) {
      var _this = this
      if (this.requestType != 'a') {
        _this.model = Object.assign({}, _this.model, {
          cover: ''
        })
        var fileList = this.$refs.upload.fileList

        var index = fileList.indexOf(file)
        this.$refs.upload.fileList.splice(index, 1)
      }
      _this.uploadList.splice(index, 1)
      _this.model.cover = ''
    }
  },
  created: function () {
    var recId = this.$route.params.recId
    if (trim(recId)) {
      this.title = '更新'
      this.view(recId)
    } else {
      this.title = '新建'
    }
  }
}
</script>
