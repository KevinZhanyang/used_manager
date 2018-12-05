<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="mouse"></Icon>
                详情
            </p>
            <Form :model="model" label-position="right" :label-width="100">
                <FormItem label="音频名称">
                    <Input v-model="model.name"></Input>
                </FormItem>
                <FormItem label="简介">
                    <t-quill-editor v-model="model.intro" :text="model.intro" placeholder="请输入简介"></t-quill-editor>
                </FormItem>
                <FormItem label="url">
                    <t-web-uploader format="mp3" accept="audio/*"
                        :show-upload-list="false" @on-success="handleD"
                        @on-error="handleError" @on-format-error="handleFormatErr"
                        @on-remove="handleRemove" ref="upload">
                        <span slot="uploadBtn">
                            <div>
                                <Button icon="ios-cloud-upload-outline" >上传音频</Button>
                            </div>
                        </span>
                        <span slot="tip">
                            <input v-if="model.url" type="text" v-model="model.url" style="width:500px" readonly>
                        </span>
                    </t-web-uploader>
                </FormItem>
                <FormItem label="belongTo">
                    <Input v-model="model.belongTo"></Input>
                </FormItem>
                <FormItem label="belongToId">
                    <Input v-model="model.belongToId"></Input>
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
              <FormItem label="二维码">
                <input-number v-model="model.qrCode"></input-number>
                <img v-if="model.qrCode" :src="model.qrCode"/>
              </FormItem>
                <FormItem label="播放次数">
                    <input-number v-model="model.playNum"></input-number>
                </FormItem>
                <FormItem label="创建人ID">
                    <Input v-model="model.createId"></Input>
                </FormItem>
                <FormItem label="创建时间">
                    <Input v-model="model.createTime"></Input>
                </FormItem>
                <FormItem label="更新人ID">
                    <Input v-model="model.updateId"></Input>
                </FormItem>
                <FormItem label="更新时间">
                    <Input v-model="model.updateTime"></Input>
                </FormItem>
            </Form>
            <Row style="padding-top: 10px" type="flex" justify="center">
                <span @click="goBack" style="margin: 0 10px;"><Button icon="back">返回</Button></span>
            </Row>
        </Card>
    </div>
</template>

<script>
import { trim2Zero } from '@/libs/util'
import audio from '@/model/audio'
import tQuillEditor from '../../components/t-quill-editor/t-quill-editor.vue'
import tWebUploader from '../../components/web-uploader/t-web-uploader.vue'

/**
 * Info:音频
 * Created by wangyifan on 2018-11-24 12:40:32
 */
export default {
  name: 'audioDetail',
  components: { tQuillEditor, tWebUploader },
  data () {
    return {
      model: {
        cover: '',
        intro: '',
        url:''
      }
    }
  },
  watch: {},
  computed: {},
  methods: {
    view (id) {
      var _this = this
      audio.view(id, {
        success: function (data) {
          _this.model = Object.assign({}, _this.model, {
            recId: data.recId,
            name: data.name,
            url: data.url,
            intro: data.intro,
            cover: data.cover,
            qrCode: data.qrCode,
            belongTo: data.belongTo,
            belongToId: data.belongToId,
            playNum: trim2Zero(data.playNum),
            createId: data.createId,
            createTime: data.createTime,
            updateId: data.updateId,
            updateTime: data.updateTime
          })
        }
      })
    },
    goBack () {
      this.$router.push({ path: '/audio/list', name: 'audioList' })
    },
    handleD: function (file, fileList) {
      var _this = this
      // 获取文件类型
      _this.uploadList = fileList.slice(0, 1)
      _this.model = Object.assign({}, _this.model, {
        url: file['url']
      })
    },
    handleFormatErr: function (file) {
      this.$Message.error({
        content:
          '文件 ' + file.name + ' 格式不正确，请上传 mp3 格式的音频。'
      })
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
    this.view(recId)
  }
}
</script>
