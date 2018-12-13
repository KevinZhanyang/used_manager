<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="mouse"></Icon>
                详情
            </p>
            <Form :model="model" label-position="right" :label-width="100">

                <FormItem label="id">
                    <input-number v-model="model.id"></input-number>
                </FormItem>
                <FormItem label="status">
                    <input-number v-model="model.status"></input-number>
                </FormItem>
                <FormItem label="name">
                    <Input v-model="model.name"></Input>
                </FormItem>
                <FormItem label="provinceId">
                    <Input v-model="model.provinceId"></Input>
                </FormItem>
                <FormItem label="createdAt">
                    <input-number v-model="model.createdAt"></input-number>
                </FormItem>
                <FormItem label="updatedAt">
                    <input-number v-model="model.updatedAt"></input-number>
                </FormItem>
                <FormItem label="createId">
                    <Input v-model="model.createId"></Input>
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
import schools from '@/model/schools';
import InputNumber from "iview/src/components/input-number/input-number";

/**
 * Info:partner
 * Created by wangyifan on 2018-12-12 10:22:33
 */
export default {
    name: 'schoolsDetail',
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
      schools.view(id, {
        success: function (data) {
          _this.model = Object.assign({}, _this.model, {
            id: trim2Zero(data.body.id),
            status: trim2Zero(data.body.status),
            name: data.body.name,
            provinceId: trim2Zero(data.body.provinceId),
            createdAt: trim2Zero(data.body.createdAt),
            updatedAt: trim2Zero(data.body.updatedAt),
            createId: trim2Zero(data.body.createId)
          });
        }
      });
    },
      goBack() {
          this.$router.push({path: '/schools/list',name:'schoolsList'});
      }
  },
  created: function () {
    var id = this.$route.params.id;
    this.view(id);
  }
}
</script>
