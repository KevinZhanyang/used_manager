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
                <span @click="insertOrUpdate" style="margin: 0 10px;"><Button type="primary" icon="back">保存</Button></span>
                <span @click="goBack" style="margin: 0 10px;"><Button icon="back">返回</Button></span>
            </Row>
        </Card>
    </div>
</template>

<script>
import {trim,trim2Zero} from '@/libs/util.js';
import schools from '@/model/schools';

    /**
 * Info: partner
 * Created by wangyifan on 2018-12-12 10:22:33
 */
export default {
    name: 'schoolsNew',
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
      schools.view(id, {
        success: function (data) {
          _this.model = Object.assign({}, _this.model, {
            id: trim2Zero(data.id),
            status: trim2Zero(data.status),
            name: data.name,
            provinceId: trim2Zero(data.provinceId),
            createdAt: trim2Zero(data.createdAt),
            updatedAt: trim2Zero(data.updatedAt),
            createId: trim2Zero(data.createId)
          });
        }
      });
    },
    // 新增or更新
    insertOrUpdate () {
      var _this = this;
        var id = this.$route.params.id;
      if (trim(id)) {
        schools.update(_this.model, {
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
        schools.insert(_this.model, {
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
          this.$router.push({path: '/schools/list',name:'schoolsList'});
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
