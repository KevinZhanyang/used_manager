<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="mouse"></Icon>
                详情
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
                <FormItem label="createId">
                    <Input v-model="model.createId"></Input>
                </FormItem>
                <FormItem label="createTime">
                    <Input v-model="model.createTime"></Input>
                </FormItem>
                <FormItem label="updateId">
                    <Input v-model="model.updateId"></Input>
                </FormItem>
                <FormItem label="updateTime">
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
import {trim2Zero} from '@/libs/util';
import video from '@/model/video';
import InputNumber from "iview/src/components/input-number/input-number";

/**
 * Info:视频
 * Created by wangyifan on 2018-11-24 12:40:32
 */
export default {
    name: 'videoDetail',
  components: {InputNumber},
  data () {
        return {
          model: {}
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
      goBack() {
          this.$router.push({path: '/video/list',name:'videoList'});
      }
  },
  created: function () {
    var recId = this.$route.params.recId;
    this.view(recId);
  }
}
</script>
