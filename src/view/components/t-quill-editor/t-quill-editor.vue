<template>
  <div>
    <Upload ref="upload" :show-upload-list="false" :on-success="handleSuccess" :format="['jpg','jpeg','png','bmp','gif']" :max-size="size" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload" multiple type="drag" :action="uploadurl" class="avatar-uploader">
    </Upload>
    <Row :style="{'min-height':height+67+'px'}">
      <quill-editor :value="text" ref="myQuillEditor" :options="editorOption" @change="onEditorChange($event)" @ready="onEditorReady($event)">
      </quill-editor>
    </Row>
  </div>
</template>
<style scoped>
.avatar-uploader {
  height: 0;
  overflow: hidden;
}
.subContentclass {
  margin-top: 15px;
  margin-right: 5%;
}
.ql-tooltip.ql-editing {
  left: 50% !important;
  transform: translateX(-50%);
}
.ql-toolbar.ql-snow {
  border-top: 0;
  border-left: 0;
  border-right: 0;
}
.ql-toolbar.ql-snow + .ql-container.ql-snow {
  min-height: 250px;
}

.quill-editor { height: 250px; }
</style>
<script>
import toolbarOptions from './quill.editor.config.js'
import { quillEditor } from 'vue-quill-editor'
import config from '@/config/config'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
  name: 't-quill-editor',
  components: {
    quillEditor
  },
  data () {
    return {
      uploadList: [],
      editorOption: {
        placeholder: this.placeholder,
        theme: 'snow', // or 'bubble'
        modules: {
          toolbar: {
            container: toolbarOptions, // 工具栏
            handlers: {
              image: function (value) {
                if (value) {
                  document
                    .querySelector('.avatar-uploader .ivu-upload-input')
                    .click()
                } else {
                  this.quill.format('image', false)
                }
              }
            }
          }
        } // 富文本编辑器配置
      }
    }
  },
  props: {
    uploadurl: {
      // 上传地址
      type: String,
      default: function () {
        return config.UPLOAD_URL;
      }
    },
    placeholder: {
      type: String,
      default: function () {
        return '请在此输入内容...'
      }
    },
    text: {
      // 富文本内容
      type: String,
      default: function () {
        return ''
      }
    },
    size: {
      type: Number,
      default: 10240
    },
    height: {
      type: Number,
      default: 250
    }
  },
  methods: {
    onEditorChange (editor) {
      this.$emit('input', editor.html)
    },
    onEditorReady (editor) {
      this.detailContent = this.text
    },
    handleSuccess (res, file) {
      // res为图片服务器返回的数据
      // 获取富文本组件实例
      let quill = this.$refs.myQuillEditor.quill
      // 如果上传成功
      // 获取光标所在位置
      let length = quill.getSelection().index
      // 插入图片
      quill.insertEmbed(length, 'image', `${res.bizInfo.models[0].url}`)
      // 调整光标到最后
      quill.setSelection(length + 1)

      // file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
      // file.name = '7eb99afb9d5f317c912f08b5212fd69a';
    },
    handleFormatError (file) {
      this.$Message.warning({
        content: '图片格式不符合要求'
        // desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
      })
    },
    handleMaxSize (file) {
      this.$Message.warning({
        content: '建议上传大小不超过10M'
        // desc: 'File  ' + file.name + ' is too large, no more than 2M.'
      })
    },
    handleBeforeUpload () {
      console.log('======================')
      console.log(this.uploadurl)
      const check = this.uploadList.length < 5
      if (!check) {
        this.$Message.warning({
          content: '每次最多上传5张照片！.'
        })
      }
      return check
    }
  },
  computed: {
    editor () {
      return this.$refs.myTextEditor.quillEditor
    }
  }
}
</script>
