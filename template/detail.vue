<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="mouse"></Icon>
                详情
            </p>
            <Form :model="model" label-position="right" :label-width="100">
                {% for field in fields %}
                <FormItem label="${field.name}$">{% if field.type == 'string' || field.type == 'key' %}
                    <Input v-model="model.${field.name}$"></Input>{% else %}
                    <input-number v-model="model.${field.name}$"></input-number>{% endif %}
                </FormItem>{% endfor %}
            </Form>
            <Row style="padding-top: 10px" type="flex" justify="center">
                <span @click="goBack" style="margin: 0 10px;"><Button icon="back">返回</Button></span>
            </Row>
        </Card>
    </div>
</template>

<script>
import {trim2Zero} from '@/libs/util';
import ${objName}$ from '@/model/${fileName}$';
import InputNumber from "iview/src/components/input-number/input-number";

/**
 * Info:${tableComment}$
 * Created by ${author}$ on ${createDate}$
 */
export default {
    name: '${objName}$Detail',
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
      ${objName}$.view(id, {
        success: function (data) {
          _this.model = Object.assign({}, _this.model, {{% for field in fields %}{% if field.type == 'string' %}
            ${field.name}$: data.${field.name}${% else %}
            ${field.name}$: trim2Zero(data.${field.name}$){% endif %}{% if !loop.last %},{% endif %}{% endfor %}
          });
        }
      });
    },
      goBack() {
          this.$router.push({path: '/${fileName}$/list',name:'${objName}$List'});
      }
  },
  created: function () {
    var ${pk}$ = this.$route.params.${pk}$;
    this.view(${pk}$);
  }
}
</script>
