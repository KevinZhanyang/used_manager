<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="mouse"></Icon>
                {{title}}
            </p>
            <Form :model="model" label-position="right" :label-width="100">
                {% for field in fields %}
                <FormItem label="${field.name}$">{% if field.type == 'string' || field.type == 'key' %}
                    <Input v-model="model.${field.name}$"></Input>{% else %}
                    <input-number v-model="model.${field.name}$"></input-number>{% endif %}
                </FormItem>{% endfor %}
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
import ${objName}$ from '@/model/${fileName}$';

    /**
 * Info: ${tableComment}$
 * Created by ${author}$ on ${createDate}$
 */
export default {
    name: '${objName}$New',
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
      ${objName}$.view(id, {
        success: function (data) {
          _this.model = Object.assign({}, _this.model, {{% for field in fields %}{% if field.type == 'string' %}
            ${field.name}$: data.${field.name}${% else %}
            ${field.name}$: trim2Zero(data.${field.name}$){% endif %}{% if !loop.last %},{% endif %}{% endfor %}
          });
        }
      });
    },
    // 新增or更新
    insertOrUpdate () {
      var _this = this;
        var ${pk}$ = this.$route.params.${pk}$;
      if (trim(${pk}$)) {
        ${objName}$.update(_this.model, {
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
        ${objName}$.insert(_this.model, {
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
          this.$router.push({path: '/${fileName}$/list',name:'${objName}$List'});
      }
  },
  created: function () {
    var ${pk}$ = this.$route.params.${pk}$;
    if (trim(${pk}$)) {
        this.title = '更新';
      this.view(${pk}$);
    }else{
        this.title = '新建';
    }
  }
}
</script>
