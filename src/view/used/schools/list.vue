<template>
  <div>
    <Card>
      <p slot="title">
        <Icon type="mouse"></Icon>
        列表
      </p>
      <Row>
        <Input v-model="param.id" placeholder="请输入id搜搜..." style="width: 200px" />
        <span @click="list" style="margin: 0 10px;"><Button type="primary" icon="search">搜索</Button></span>
      </Row>
      <Row class="margin-top-10">
        <Table stripe border :loading="lodding" :data="itemList" :columns="tableHeader"></Table>
      </Row>
      <Row style="padding-top: 10px" type="flex" justify="center">
        <Page :total="pageInfo.totalNum" :current="pageInfo._curr"
              :page-size="pageInfo._limit" :show-total=true :show-sizer="true" @on-page-size-change="pageSizeChange" @on-change="onPageChange"></Page>
      </Row>
    </Card>
  </div>
</template>

<script>
  import schools from '@/model/schools';

  /**
   * partner
   * Created by wangyifan on 2018-12-12 10:22:33
   */
  export default {
    name: 'schoolsList',
    components: {},
    data(){
      return {
        lodding:false,
        itemList: [],
        tableHeader:[
      {
        key: 'id',
          title: 'id'
      },
      {
        key: 'status',
          title: 'status'
      },
      {
        key: 'name',
          title: 'name'
      },
      {
        key: 'provinceId',
          title: 'provinceId'
      },
      {
        key: 'createdAt',
          title: 'createdAt'
      },
      {
        key: 'updatedAt',
          title: 'updatedAt'
      },
      {
        key: 'createId',
          title: 'createId'
      },
      {
        renderHeader:(h, params) => {
        return h('div', [
          h('Button', {
            props: {
              type: 'success',
              size: 'small'
            },
            style: {
              marginRight: '5px'
            },
            on: {
              click: () => {
              this.add()
          }
      }
      }, '新增')
      ])
      },
        key:'action',
          width:180,
        align:'center',
        render:(h, params) => {
        return h('div', [
          h('Button', {
            props: {
              type: 'success',
              size: 'small'
            },
            style: {
              marginRight: '5px'
            },
            on: {
              click: () => {
              this.view(params)
          }
      }
      }, '查看'),
        h('Button', {
          props: {
            type: 'primary',
            size: 'small'
          },
          style: {
            marginRight: '5px'
          },
          on: {
            click: () => {
            this.edit(params)
        }
      }
      }, '编辑'),
        h('Poptip', {
          props: {
            title: "确认删除吗？",
            confirm: true,
            width: 200,
            placement: "top-end"
          },
          on: {
            'on-ok': () => {
            this.deleteBy(params)
        }
      }
      },
        [h('Button', {
          props: {
            type: 'error',
            size: 'small'
          }
        }, '删除')])
      ]);
      }
      }],
      param:{},
      pageInfo: {
        _curr: 1,
          _limit: 10,
          totalNum: 0,
          pageSizeOpts: [10, 20, 30, 40]
      }
    }
    } ,
    watch: {},
    computed: {},
    methods: {
      list(){
        var _this = this;
        _this.lodding = true;
        var qData = {
          perPageNum: _this.pageInfo._limit,
          currentPageIndex: _this.pageInfo._curr
        };
        qData = Object.assign({}, qData,_this.param);

        schools.query(qData,{
          success: function (data) {
            console.log(90909090)
            console.log(data);
            _this.lodding = false;
            _this.pageInfo.totalNum = data.body.totalNum;
            _this.itemList = data.body['schoolsList'];
          }
        });
      },
      view(p){
        this.$router.push({path: '/schools/view',name:'schoolsDetail', params:{id: p.row.id}});
      },
      add(){
        this.$router.push({path: '/schools/new',name:'schoolsNew', params:{}});
      },
      edit(p){
        this.$router.push({path: '/schools/new',name:'schoolsNew', params:{id: p.row.id}});
      },
      deleteBy (p) {
        var _this = this;
        var id = p.row.id;
        schools.deleteBy(id, {
          success: function (data) {
            _this.list();
            _this.$Message.success('删除成功!');
          }
        });
      },
      onPageChange (_curr) {
        this.pageInfo._curr = _curr;
        this.list();
      },
      pageSizeChange (_limit) {
        this.pageInfo._limit = _limit;
        this.list();
      }
    },
    created: function () {
      this.list();
    }
  }
</script>
