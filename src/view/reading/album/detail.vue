<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="mouse"></Icon>
                详情
            </p>
            <Form :model="model" label-position="right" :label-width="100">
                <FormItem label="栏目名称">
                    <Input v-model="model.name"></Input>
                </FormItem>
              <FormItem label="Slogan">
                <Input v-model="model.slogan"></Input>
              </FormItem>
                <FormItem label="简介">
                    <t-quill-editor v-model="model.intro" :text="model.intro" placeholder="请输入培训项目简介"></t-quill-editor>
                </FormItem>
                <FormItem label="类型">
                    <Input v-model="model.type"></Input>
                </FormItem>
                <FormItem label="是否展示">
                    <Input v-model="model.status"></Input>
                </FormItem>
                <FormItem label="浏览次数">
                    <input-number v-model="model.visitNum"></input-number>
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
import album from '@/model/album'
import InputNumber from 'iview/src/components/input-number/input-number'
import tQuillEditor from '../../components/t-quill-editor/t-quill-editor.vue'

/**
 * Info:
 * Created by wangyifan on 2018-11-21 14:41:32
 */
export default {
  name: 'albumDetail',
  components: { InputNumber, tQuillEditor },
  data () {
    return {
      model: {
        cover: '',
        intro: ''
      }
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
    goBack () {
      this.$router.push({ path: '/album/list', name: 'albumList' })
    }
  },
  created: function () {
    var recId = this.$route.params.recId
    this.view(recId)
  }
}
</script>
