<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="mouse"></Icon>
                {{title}}
            </p>
            <Form :model="model" label-position="right" :label-width="100">

                <FormItem label="id">
                    <input-number v-model="model.id"></input-number>
                </FormItem>
                <FormItem label="status">
                    <input-number v-model="model.status"></input-number>
                </FormItem>
                <FormItem label="isPartner">
                    <input-number v-model="model.isPartner"></input-number>
                </FormItem>
                <FormItem label="isTester">
                    <input-number v-model="model.isTester"></input-number>
                </FormItem>
                <FormItem label="scores">
                    <input-number v-model="model.scores"></input-number>
                </FormItem>
                <FormItem label="wechat">
                    <Input v-model="model.wechat"></Input>
                </FormItem>
                <FormItem label="openid">
                    <Input v-model="model.openid"></Input>
                </FormItem>
                <FormItem label="avatar">
                    <Input v-model="model.avatar"></Input>
                </FormItem>
                <FormItem label="nickname">
                    <Input v-model="model.nickname"></Input>
                </FormItem>
                <FormItem label="gender">
                    <Input v-model="model.gender"></Input>
                </FormItem>
                <FormItem label="country">
                    <Input v-model="model.country"></Input>
                </FormItem>
                <FormItem label="province">
                    <Input v-model="model.province"></Input>
                </FormItem>
                <FormItem label="city">
                    <Input v-model="model.city"></Input>
                </FormItem>
                <FormItem label="phone">
                    <Input v-model="model.phone"></Input>
                </FormItem>
                <FormItem label="createdAt">
                    <input-number v-model="model.createdAt"></input-number>
                </FormItem>
                <FormItem label="updatedAt">
                    <input-number v-model="model.updatedAt"></input-number>
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
import users from '@/model/users';

    /**
 * Info:
 * Created by wangyifan on 2018-12-13 17:03:14
 */
export default {
    name: 'usersNew',
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
      users.view(id, {
        success: function (data) {
          data = data.body
          _this.model = Object.assign({}, _this.model, {
            id: trim2Zero(data.id),
            status: trim2Zero(data.status),
            isPartner: trim2Zero(data.isPartner),
            isTester: trim2Zero(data.isTester),
            scores: trim2Zero(data.scores),
            wechat: data.wechat,
            openid: data.openid,
            avatar: data.avatar,
            nickname: data.nickname,
            gender: data.gender,
            country: data.country,
            province: data.province,
            city: data.city,
            phone: data.phone,
            createdAt: trim2Zero(data.createdAt),
            updatedAt: trim2Zero(data.updatedAt)
          });
        }
      });
    },
    // 新增or更新
    insertOrUpdate () {
      var _this = this;
        var id = this.$route.params.id;
      if (trim(id)) {
        users.update(_this.model, {
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
        users.insert(_this.model, {
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
          this.$router.push({path: '/users/list',name:'usersList'});
      }
  },
  created: function () {
    var id = this.$route.params.id;
    if (trim(id)) {
        this.title = '更新';
      this.view(id);
    }else{
        this.title = '新建';
    }
  }
}
</script>
