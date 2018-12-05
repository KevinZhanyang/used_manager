<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="mouse"></Icon>
                {{title}}
            </p>
            <Form :model="model" label-position="right" :label-width="100">

                <FormItem label="recId">
                    <Input v-model="model.recId"></Input>
                </FormItem>
                <FormItem label="name">
                    <Input v-model="model.name"></Input>
                </FormItem>
                <FormItem label="url">
                    <Input v-model="model.url"></Input>
                </FormItem>
                <FormItem label="belongTo">
                    <Input v-model="model.belongTo"></Input>
                </FormItem>
                <FormItem label="belongToId">
                    <Input v-model="model.belongToId"></Input>
                </FormItem>
                <FormItem label="playNum">
                    <input-number v-model="model.playNum"></input-number>
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
import {trim,trim2Zero} from '@/libs/util.js';
import video from '@/model/video';

    /**
 * Info: 视频
 * Created by wangyifan on 2018-11-24 12:40:32
 */
export default {
    name: 'videoNew',
  components: {},
    data () {
        return {
            title : '',
            model: {},
            ruleValidate: {}
        }
    },
  watch: {},
  computed: {},
  methods: {
    view (id) {
      var _this = this;
      video.view(id, {
        success: function (data) {
          _this.model = Object.assign({}, _this.model, {
            recId: data.recId,
            name: data.name,
            url: data.url,
            intro: data.intro,
            cover: data.cover,
            belongTo: data.belongTo,
            belongToId: data.belongToId,
            playNum: trim2Zero(data.playNum),
            createId: data.createId,
            createTime: data.createTime,
            updateId: data.updateId,
            updateTime: data.updateTime
          });
        }
      });
    },
    // 新增or更新
    insertOrUpdate () {
      var _this = this;
        var recId = this.$route.params.recId;
      if (trim(recId)) {
        video.update(_this.model, {
          success: function (data) {
            _this.$Message.success({
              content: '更新成功!',
              onClose: function () {
                  _this.goBack();
              }
            });
          }
        });
      } else {
        video.insert(_this.model, {
          success: function (data) {
            _this.$Message.success({
              content: '保存成功!',
              onClose: function () {
                _this.goBack();
              }
            });
          }
        });
      }
    },
      goBack() {
          this.$router.push({path: '/video/list',name:'videoList'});
      }
  },
  created: function () {
    var recId = this.$route.params.recId;
    if (trim(recId)) {
        this.title = '更新';
      this.view(recId);
    }else{
        this.title = '新建';
    }
  }
}
</script>
