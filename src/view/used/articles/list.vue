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

  /**
   *
   * Created by wangyifan on 2018-12-11 12:05:35
   */
  export default {
    name: 'articlesList',
    components: {expandRow},
    data() {
      return {
        itemList: [],

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
      list() {

        var _this = this;
        _this.lodding = true;
        var qData = {
          perPageNum: _this.pageInfo._limit,
          currentPageIndex: _this.pageInfo._curr
        };
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
        articles.deleteBy(id, {
          success: function (data) {
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
        console.log(arr);
      }
    },
    created: function () {
      this.list();
    }
  }
</script>
