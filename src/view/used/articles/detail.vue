<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="mouse"></Icon>
                详情
            </p>
            <Form :model="model" label-position="right" :label-width="200">

                <FormItem label="id">
                    <input-number v-model="model.id"></input-number>
                </FormItem>
                <FormItem label="状态">
                    <input-number v-model="model.status"></input-number>
                </FormItem>
                <FormItem label="上架">
                    <input-number v-model="model.onOffer"></input-number>
                </FormItem>
                <FormItem label="用户Id">
                    <Input v-model="model.userId"></Input>
                </FormItem>
                <FormItem label="浏览量">
                    <input-number v-model="model.views"></input-number>
                </FormItem>
                <FormItem label="收藏量">
                    <input-number v-model="model.collect"></input-number>
                </FormItem>
                <FormItem label="留言量">
                    <input-number v-model="model.messages"></input-number>
                </FormItem>
                <FormItem label="点赞量">
                    <input-number v-model="model.likes"></input-number>
                </FormItem>
                <FormItem label="分类Id">
                    <Input v-model="model.categoryId"></Input>
                </FormItem>
                <FormItem label="学校Id">
                    <Input v-model="model.schoolId"></Input>
                </FormItem>
                <FormItem label="省Id">
                    <Input v-model="model.provinceId"></Input>
                </FormItem>
                <FormItem label="内容">
              <t-quill-editor v-model="model.content" :text="model.content" placeholder="请输入好物描述"></t-quill-editor>
            </FormItem>
                <FormItem label="商品图">

                  <div class="demo-upload-list" v-for="item in uploadList">
                    <template v-if="item.status === 'finished'">
                      <img :src="item.url">
                      <div class="demo-upload-list-cover">
                        <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                        <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                      </div>
                    </template>
                    <template v-else>
                      <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                    </template>
                  </div>
                  <Upload
                    ref="upload"
                    :show-upload-list="false"
                    :default-file-list="defaultList"
                    :on-success="handleSuccess"
                    :format="['jpg','jpeg','png']"
                    :max-size="2048"
                    :on-format-error="handleFormatError"
                    :on-exceeded-size="handleMaxSize"
                    :before-upload="handleBeforeUpload"
                    multiple
                    type="drag"
                    action="//jsonplaceholder.typicode.com/posts/"
                    style="display: inline-block;width:58px;">
                    <div style="width: 58px;height:58px;line-height: 58px;">
                      <Icon type="ios-camera" size="20"></Icon>
                    </div>
                  </Upload>
                  <Modal title="View Image" v-model="visible">
                    <img :src="imgName" v-if="visible" style="width: 100%">
                  </Modal>















              </FormItem>
                <FormItem label="价格">
                    <Input v-model="model.price"></Input>
                </FormItem>
                <FormItem label="手机">
                    <Input v-model="model.phone"></Input>
                </FormItem>
                <FormItem label="微信号">
                    <Input v-model="model.wechat"></Input>
                </FormItem>
                <FormItem label="formId">
                    <Input v-model="model.formId"></Input>
                </FormItem>
                <FormItem label="经度">
                    <Input v-model="model.longitude"></Input>
                </FormItem>
                <FormItem label="纬度">
                    <Input v-model="model.latitude"></Input>
                </FormItem>
                <FormItem label="地址详情">
                    <Input v-model="model.address"></Input>
                </FormItem>
                <FormItem label="海报">
                    <Input v-model="model.circleImg"></Input>
                </FormItem>
                <FormItem label="二维码">
                    <Input v-model="model.shareImg"></Input>
                </FormItem>
                <FormItem label="promotionAt">
                    <Input v-model="model.promotionAt"></Input>
                </FormItem>
                <FormItem label="刷新时间">
                    <Input v-model="model.refreshAt"></Input>
                </FormItem>
                <FormItem label="创建时间">
                    <Input v-model="model.createdAt"></Input>
                </FormItem>
                <FormItem label="跟新时间">
                    <Input v-model="model.updatedAt"></Input>
                </FormItem>
                <FormItem label="类型">
                    <input-number v-model="model.type"></input-number>
                </FormItem>
                <FormItem label="是否最新">
                    <input-number v-model="model.isNew"></input-number>
                </FormItem>
                <FormItem label="交易方式">
                    <Input v-model="model.tardeWay"></Input>
                </FormItem>
                <FormItem label="noPage">
                    <input-number v-model="model.noPage"></input-number>
                </FormItem>
                <FormItem label="学校">
                    <Input v-model="model.schoolName"></Input>
                </FormItem>
                <FormItem label="分类">
                    <Input v-model="model.categoryName"></Input>
                </FormItem>
                <FormItem label="省">
                    <Input v-model="model.probinceName"></Input>
                </FormItem>
            </Form>
            <Row style="padding-top: 10px" type="flex" justify="center">
                <span @click="goBack" style="margin: 0 10px;"><Button icon="back">返回</Button></span>
            </Row>
        </Card>
      <Spin size="large" fix v-if="spinShow"></Spin>
    </div>

</template>

<script>
import {trim2Zero} from '@/libs/util';
import articles from '@/model/articles';
import InputNumber from "iview/src/components/input-number/input-number";
import tWebUploader from "../../components/web-uploader/t-web-uploader.vue";
import tQuillEditor from "../../components/t-quill-editor/t-quill-editor.vue";

/**
 * Info:
 * Created by wangyifan on 2018-12-11 12:05:35
 */
export default {
  name: 'articlesDetail',
  components: { InputNumber, tQuillEditor, tWebUploader },
  data () {
        return {
          spinShow: true,
          defaultList:[],
          picDefaulList:[],
          imgName: '',
          visible: false,
          uploadList: [],
          model: {}
      }
  },
  watch: {},
  computed: {},
  methods: {
    view (id) {

      var _this = this;
      articles.view(id, {
        success: function (data) {
          var arrays=[];
          data.imgs.forEach(function(value, index, array) {

            arrays.push({url:value.img,name:value.img});

          });

          console.log(arrays)
          _this.picDefaulList=arrays;
          this.defaultList =arrays
          console.log( _this.picDefaulList)

         _this.spinShow=false;
          _this.model = Object.assign({}, _this.model, {
            id: trim2Zero(data.id),
            status: trim2Zero(data.status),
            onOffer: trim2Zero(data.onOffer),
            userId: trim2Zero(data.userId),
            views: trim2Zero(data.views),
            collect: trim2Zero(data.collect),
            messages: trim2Zero(data.messages),
            likes: trim2Zero(data.likes),
            categoryId: trim2Zero(data.categoryId),
            schoolId: trim2Zero(data.schoolId),
            provinceId: trim2Zero(data.provinceId),
            content: trim2Zero(data.content),
            price: data.price,
            defaultList: data.imgs,
            phone: data.phone,
            wechat: data.wechat,
            formId: data.formId,
            longitude: data.longitude,
            latitude: data.latitude,
            address: data.address,
            circleImg: data.circleImg,
            shareImg: data.shareImg,
            promotionAt: data.promotionAt,
            refreshAt: data.refreshAt,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            type: trim2Zero(data.type),
            isNew: trim2Zero(data.isNew),
            tardeWay: data.tardeWay,
            noPage: trim2Zero(data.noPage),
            schoolName: data.schoolName,
            categoryName: data.categoryName,
            probinceName: data.probinceName
          });
        }
      });
    },
      goBack() {
          this.$router.push({path: '/articles/list',name:'articlesList'});
      },

    handleView (name) {
      this.imgName = name;
      this.visible = true;
    },
    handleRemove (file) {
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
    },
    handleSuccess (res, file) {
      file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
      file.name = '7eb99afb9d5f317c912f08b5212fd69a';
    },
    handleFormatError (file) {
      this.$Notice.warning({
        title: 'The file format is incorrect',
        desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
      });
    },
    handleMaxSize (file) {
      this.$Notice.warning({
        title: 'Exceeding file size limit',
        desc: 'File  ' + file.name + ' is too large, no more than 2M.'
      });
    },
    handleBeforeUpload () {
      const check = this.uploadList.length < 10;
      if (!check) {
        this.$Notice.warning({
          title: 'Up to five pictures can be uploaded.'
        });
      }
      return check;
    }
  },
  mounted () {
    setTimeout(() => {
      this.defaultList = this.picDefaulList;
      this.$nextTick(() => {
        this.uploadList = this.$refs.upload.fileList;
      });
    }, 2000);
  },

  created: function () {
    var id = this.$route.params.id;
    this.view(id);
  }
}
</script>

<style>
  .demo-upload-list{
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 4px;
  }
  .demo-upload-list img{
    width: 100%;
    height: 100%;
  }
  .demo-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
  }
  .demo-upload-list:hover .demo-upload-list-cover{
    display: block;
  }
  .demo-upload-list-cover i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
</style>
