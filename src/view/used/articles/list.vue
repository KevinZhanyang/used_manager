<template>
  <div>
    <Card>
      <p slot="title">
        <Icon type="mouse"></Icon>
        列表
      </p>

      <Row>
        <Input v-model="param.id" placeholder="请输入id搜搜..." style="width: 200px"/>
        <span @click="list" style="margin: 0 10px;"><Button type="primary" icon="search">搜索</Button></span>
        <span  style="margin: 0 10px;"> <i-switch size="large" v-model="switch1" @on-change="change">
        <span slot="open">求购</span>
        <span slot="close">出售</span>
        </i-switch></span>
        <span  style="margin: 0 10px;"> <i-switch size="large" v-model="switch2" @on-change="changeSellerStatus">
        <span slot="open">下架</span>
        <span slot="close">上架</span>
        </i-switch></span>
        <Button v-if="showDelete" @click="modal2 = true" type="warning">批量删除</Button>
        <Modal v-model="modal2" width="360">
          <p slot="header" style="color:#f60;text-align:center">
            <Icon type="ios-information-circle"></Icon>
            <span>确认删除？</span>
          </p>
          <div style="text-align:center">
            <p>本次将删除 {{deleteItems.length}} 条帖子</p>
            <p>Will you delete it?</p>
          </div>
          <div slot="footer">
            <Button type="error" size="large" long :loading="modal_loading" @click="del">Delete</Button>
          </div>
        </Modal>


      </Row>
      <Row class="margin-top-10">
        <Table height="600" :loading="lodding" stripe border large :data="itemList" :columns="tableHeader"  @on-selection-change='selectionClick'></Table>
      </Row>
      <Row style="padding-top: 10px" type="flex" justify="center">
        <Page :total="pageInfo.totalNum" :current="pageInfo._curr"
              :page-size="pageInfo._limit" :show-total=true :show-sizer="true" @on-page-size-change="pageSizeChange"
              @on-change="onPageChange"></Page>
      </Row>
    </Card>
  </div>
</template>

<script>
  import articles from '@/model/articles';
  import expandRow from '@/components/tables/table-expand.vue';
  import store from '@/store';
  /**
   *
   * Created by wangyifan on 2018-12-11 12:05:35
   */
  export default {
    name: 'articlesList',
    components: {expandRow},
    data() {
      return {
        showDelete:false,
        modal2:false,
        modal_loading: false,
        itemList: [],
        deleteItems:[],
        switch1: false,
        switch2:false,
        tableHeader: [
          {
            type: 'selection',
            width: 80,
            align: 'center'
          },
          {
            key: 'id',
            title: 'id',
            width: 100,
            align: 'center'
          },
          {
            key: 'nickname',
            title: '用户',
            width: 150,
            align: 'center'
          },
          {
            key: 'status',
            title: '状态',
            width: 150,
            align: 'center'
          },
          {
            key: 'onOffer',
            title: '上架',
            width: 150,
           align: 'center'
          },
          {
            key: 'content',
            title: '内容',
            width: 250,
            align: 'center'
          },
          {
            key: 'views',
            title: '浏览量',
            width: 150,
            align: 'center'
          },
          {
            key: 'collect',
            title: '收藏量',
            width: 150,
            align: 'center'
          },
          {
            key: 'messages',
            title: '留言量',
            width: 150,
            align: 'center'
          },
          {
            key: 'likes',
            title: '点赞量',
            width: 150,
            align: 'center'
          },
          {
            key: 'categoryId',
            title: '分类Id',
            width: 150,
            align: 'center'
          },
          {
            key: 'schoolId',
            title: '学校Id',
            width: 150,
            align: 'center'
          },
          {
            key: 'provinceId',
            title: '省Id',
            width: 150,
            align: 'center'
          },

          {
            key: 'schoolName',
            title: '学校',
            width: 150,
            align: 'center'
          },
          {
            key: 'categoryName',
            title: '分类',
            width: 150,
            align: 'center'
          },
          {
            key: 'probinceName',
            title: '省',
            width: 150,
            align: 'center'
          },

          {
            key: 'price',
            title: '价格',
            width: 150,
            align: 'center'
          },
          {
            key: 'phone',
            title: '手机',
            width: 150,
            align: 'center'
          },
          {
            key: 'wechat',
            title: '微信号',
            width: 150,
            align: 'center'
          },
//      {
//        key: 'formId',
//          title: 'formId'
//      },
          {
            key: 'longitude',
            title: '经度',
            width: 150,
            align: 'center'
          },
          {
            key: 'latitude',
            title: '纬度',
            width: 150,
            align: 'center'
          },
          {
            key: 'address',
            title: '地址详情',
            width: 150,
            align: 'center'


          },
          {
            key: 'circleImg',
            title: '海报',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('img', {
                  attrs: {
                    src: "https://used-america.oss-us-west-1.aliyuncs.com/"+params.row.circleImg
                  },
                  style: {
                    width: '40px',
                    height: '40px'
                  }
                }),
              ]);
            }
          },
          {
            key: 'shareImg',
            title: '二维码',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('img', {
                  attrs: {
                    src: params.row.shareImg
                  },
                  style: {
                    width: '40px',
                    height: '40px'
                  }
                }),
              ]);
            }
          },
          {
            key: 'promotionAt',
            title: 'promotionAt',
            width: 180,
            align: 'center'
          },
          {
            key: 'refreshAt',
            title: '刷新时间',
            width: 180,
            align: 'center'
          },
          {
            key: 'createdAt',
            title: '创建时间',
            width: 180,
            align: 'center'
          },
          {
            key: 'updatedAt',
            title: '更新时间',
            width: 180,
            align: 'center'
          },
          {
            key: 'type',
            title: '类型',
            width: 150,
            align: 'center'
          },
//      {
//        key: 'isNew',
//          title: '是否最新'
//      },
          {
            key: 'tardeWay',
            title: '交易方式',
            width: 150,
            align: 'center'
          },
          {
            renderHeader: (h, params) => {
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
            key: 'action',
            width: 180,
            fixed: 'right',
            align: 'center',
            render: (h, params) => {
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
                      placement: "bottom-end"
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
        param: {},
        lodding:false,
        pageInfo: {
          _curr: 1,
          _limit: 10,
          totalNum: 0,
          pageSizeOpts: [10, 20, 30, 40]
        }
      }
    },
    watch: {},
    computed: {},
    methods: {
      change(status) {
        this.switch1=status;
        this.pageInfo={
          _curr: 1,
          _limit: 10,
          totalNum: 0,
          pageSizeOpts: [10, 20, 30, 40]
        }
        this.list();
      },
      changeSellerStatus(status){
        this.switch2=status;
        this.pageInfo={
          _curr: 1,
          _limit: 10,
          totalNum: 0,
          pageSizeOpts: [10, 20, 30, 40]
        }
        this.list();
      },
      list() {

        var _this = this;
        _this.lodding = true;
        var qData = {
          perPageNum: _this.pageInfo._limit,
          currentPageIndex: _this.pageInfo._curr
        };
        if(_this.switch1){
          _this.param.type=1
        }else {
          delete  _this.param.type
        }
        console.log(878787);
        console.log(_this.switch2);
        if(_this.switch2){
          _this.param.onOffer=1
        }else {
          delete  _this.param.onOffer
        }
        qData = Object.assign({}, qData, _this.param);

        articles.query(qData, {
          success: function (data) {
            console.log(11);
            console.log(data);
            _this.pageInfo.totalNum = data.body.totalNum;
            _this.itemList = data.body['articlesList'];
            _this.lodding=false;
          }
        });
      },
      view(p) {
        console.log(111);
        console.log(p);
        this.$router.push({path: '/articles/detail', name: 'articlesDetail', params: {id: p.row.id,type: '2'}});
      },
      add() {
        this.$router.push({path: '/articles/new', name: 'articlesNew', params: {type: '1'}});
      },
      edit(p) {
//        this.$router.push({path: '/articles/new', name: 'articlesNew', params: {id: p.row.id}});
      },
      deleteBy(p) {
        var _this = this;
        var id = p.row.id;
        console.log(p.row);
        console.log(store.state.user);
        if(!_this.showDelete&&p.row.userId!=store.state.user.userId){
          _this.$Message.warning('这不是你的帖子哦');
          return false;
        }

        articles.deleteBy(id, {
          success: function (data) {
            _this.list();
            _this.$Message.success('删除成功!');
          }
        });
      },
      del () {
        this.modal_loading = true;
        console.log(6565);
        console.log(this.deleteItems);
        var _this = this;
        _this.modal_loading=true;
        if(this.deleteItems.length==0){
          _this.modal_loading=false;
          _this.modal2=false;
          _this.$Message.warning('请选择要删除的帖子!');
          return false;
        }
        articles.deleteALl(this.deleteItems, {
          success: function (data) {
            _this.modal_loading=false;
            _this.modal2=false;
            _this.list();
            _this.deleteItems=[];
            _this.$Message.success('删除成功!');
          }
        });
      },
      deleteALl(p) {
        console.log(6565);
        var _this = this;
        _this.modal_loading=true;
        if(!this.deleteItems||this.deleteItems.lentgh==0){
          _this.$Message.warning('请选择要删除的帖子!');
          return false;
        }
        articles.deleteALl(this.deleteItems, {
          success: function (data) {
            _this.modal_loading=false;
            _this.list();
            _this.$Message.success('删除成功!');
          }
        });
      },
      onPageChange(_curr) {
        this.pageInfo._curr = _curr;
        this.list();
      },
      pageSizeChange(_limit) {
        this.pageInfo._limit = _limit;
        this.list();
      },
      selectionClick(arr){

        this.deleteItems=arr;
      }
    },
    created: function () {
      var showDelete=false

      store.state.user.access.map((x)=>{
        if(x=="super_admin"){
          showDelete=true;
        }

      })
      this.showDelete=showDelete;
      this.list();
    }
  }
</script>
