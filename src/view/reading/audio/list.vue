<template>
  <div>
    <Card>
      <p slot="title">
        <Icon type="mouse"></Icon>
        列表
      </p>
       <Row>
        <Input v-model="param.name" placeholder="请输入音频名称搜索..." style="width: 200px" />
        <span @click="list" style="margin: 0 10px;"><Button type="primary" icon="search">搜索</Button></span>
      </Row>
      <Row class="margin-top-10">
        <Table stripe border :data="itemList" :columns="tableHeader"></Table>
      </Row>
      <Row style="padding-top: 10px" type="flex" justify="center">
        <Page :total="pageInfo.totalNum" :current="pageInfo._curr"
              :page-size="pageInfo._limit" :show-total=true :show-sizer="true" @on-page-size-change="pageSizeChange" @on-change="onPageChange"></Page>
      </Row>
    </Card>
  </div>
</template>

<script>
import audio from '@/model/audio'

/**
 * 音频
 * Created by wangyifan on 2018-11-24 12:40:32
 */
export default {
  name: 'audioList',
  components: {},
  data () {
    return {
      itemList: [],
      tableHeader: [
        {
          key: 'name',
          title: '成语故事名称'
        },
        // {
        //   key: 'belongTo',
        //     title: 'belongTo'
        // },
        // {
        //   key: 'belongToId',
        //     title: 'belongToId'
        // },
        {
          key: 'playNum',
          title: '播放次数'
        },
        {
          key: 'createId',
          title: '创建人Id'
        },
        {
          key: 'createTime',
          title: '创建时间'
        },
        {
          key: 'updateId',
          title: '更新人ID'
        },
        {
          key: 'updateTime',
          title: '更新时间'
        },
        {
          renderHeader: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
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
                },
                '新增'
              )
            ])
          },
          key: 'action',
          width: 180,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
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
                },
                '查看'
              ),
              h(
                'Button',
                {
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
                },
                '编辑'
              ),
              h(
                'Poptip',
                {
                  props: {
                    title: '确认删除吗？',
                    confirm: true,
                    width: 200,
                    placement: 'top-end'
                  },
                  on: {
                    'on-ok': () => {
                      this.deleteBy(params)
                    }
                  }
                },
                [
                  h(
                    'Button',
                    {
                      props: {
                        type: 'error',
                        size: 'small'
                      }
                    },
                    '删除'
                  )
                ]
              )
            ])
          }
        }
      ],
      param: {},
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
    list () {
      var _this = this
      var qData = {
        perPageNum: _this.pageInfo._limit,
        currentPageIndex: _this.pageInfo._curr
      }
      qData = Object.assign({}, qData, _this.param)

      audio.query(qData, {
        success: function (data) {
          _this.pageInfo.totalNum = data.totalNum
          _this.itemList = data['audioList']
        }
      })
    },
    view (p) {
      this.$router.push({
        path: '/audio/view',
        name: 'audioDetail',
        params: { recId: p.row.recId }
      })
    },
    add () {
      this.$router.push({ path: '/audio/new', name: 'audioNew', params: {} })
    },
    edit (p) {
      this.$router.push({
        path: '/audio/new',
        name: 'audioNew',
        params: { recId: p.row.recId }
      })
    },
    deleteBy (p) {
      var _this = this
      var id = p.row.recId
      audio.deleteBy(id, {
        success: function (data) {
          _this.list()
          _this.$Message.success('删除成功!')
        }
      })
    },
    onPageChange (_curr) {
      this.pageInfo._curr = _curr
      this.list()
    },
    pageSizeChange (_limit) {
      this.pageInfo._limit = _limit
      this.list()
    }
  },
  created: function () {
    this.list()
  }
}
</script>
