<template>
  <div>
    <Card>
      <p slot="title">
        <Icon type="mouse"></Icon>
        {{title}}
      </p>
      <Form :model="model" label-position="right" :label-width="100">


        <FormItem label="上架">
          <Select v-model="model.onOffer" clearable style="width:200px">
            <Option v-for="item in onSellList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="用户Id">
          <Select v-model="model.userId" clearable style="width:200px">
            <Option v-for="item in userList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
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
        <FormItem label="分类">
          <!--<Input v-model="model.categoryId"></Input>-->
          <Select v-model="model.categoryId" clearable style="width:200px">
            <Option v-for="item in categoriesList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>


        <FormItem label="学校">
          <!--<Input v-model="model.schoolId"></Input>-->
          <Select v-model="model.schoolId" clearable style="width:200px">
            <Option v-for="item in schoolsList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="省">
          <!--<Input v-model="model.provinceId"></Input>-->
          <Select v-model="model.provinceId" clearable style="width:200px">
            <Option v-for="item in provincersList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>

        <FormItem label="内容">
          <!--<t-quill-editor v-model="model.content" :text="model.content" placeholder="请输入好物描述"></t-quill-editor>-->
          <Input v-model="model.content" type="textarea" :rows="8" placeholder="请输入好物描述"/>
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

            action="//used.beimei2.com/used/v1/uploadApp/"
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
        <FormItem label="经度">
          <Input v-model="model.longitude"></Input>
        </FormItem>
        <FormItem label="纬度">
          <Input v-model="model.latitude"></Input>
        </FormItem>
        <FormItem label="地址详情">
          <Input v-model="model.address"></Input>
        </FormItem>
        <FormItem label="类型">
          <!--<input-number v-model="model.type"></input-number>-->
          <Select v-model="model.type" clearable style="width:200px">
            <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="是否最新">
          <input-number v-model="model.isNew"></input-number>
        </FormItem>
        <FormItem label="交易方式">
          <!--<Input v-model="model.tardeWays"></Input>-->
          <Select v-model="model.tardeWayList" multiple style="width:260px">
            <Option v-for="item in tardeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="noPage">
          <input-number v-model="model.noPage"></input-number>
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
  import {trim, trim2Zero} from '@/libs/util.js';
  import articles from '@/model/articles';
  import InputNumber from "iview/src/components/input-number/input-number";
  import tWebUploader from "../../components/web-uploader/t-web-uploader.vue";
  import tQuillEditor from "../../components/t-quill-editor/t-quill-editor.vue";
  import {
    getSystemUser,
    getUserInfo,
  } from '@/api/user';
  import {
    listCategories, listSchools, listProvinces

  } from '@/api/categories'

  /**
   * Info:
   * Created by wangyifan on 2018-12-11 12:05:35
   */
  export default {
    name: 'articlesNew',
    components: {InputNumber, tQuillEditor},
    data() {
      return {
        onSellList: [
          {
            value: '0',
            label: '上架'
          },
          {
            value: '1',
            label: '下架'
          },
        ],
        onSell: '',//选中上架与否的值
        userList: [],//选择创建人列表
        preUserList: [],
        createUser: '', //选中的创建人
        categoriesList: [],//选择分类列表
        checkedCategories: '',
        schoolsList: [],
        provincersList: [],
        tardeList: [{
          value: 1,
          label: "自取"
        }, {
          value: 2,
          label: "送货上门"
        }, {
          value: 3,
          label: "邮寄",
        }],
        typeList: [{
          value: 0,
          label: "出售"
        }, {
          value: 1,
          label: "求购"
        },],
        title: '',
        model: { onOffer: 2,
          views: 2,
          collect: 2,
          likes: 2},
        ruleValidate: {},
        defaultList: [],
        picDefaulList: [],
        imgName: '',
        visible: false,
        uploadList: [],
      }
    },
    watch: {},
    computed: {},
    methods: {
      getSystemUser() {
        getSystemUser().then((res) => {
          console.log(555)
          var array = [];
          res.data.body.map((x) => {
            array.push({
              value: x.id,
              label: x.nickname
            })
          })
          this.userList = array;
          console.log(this.preUserList)
        }).catch(err => {
        })
      },
      getCategoriesList() {
        listCategories().then((res) => {
          console.log(555)
          let that = this;
          var array = [];
          res.data.body.categoriesList.map((x) => {
            array.push({
              value: x.id,
              label: x.name
            })
          })
          that.categoriesList = array;
        }).catch(err => {
        })
      },
      getSchoolsList() {
        listSchools().then((res) => {
          console.log(555)
          let that = this;
          var array = [];
          res.data.body.schoolsList.map((x) => {
            array.push({
              value: x.id,
              label: x.name
            })
          })
          that.schoolsList = array;
        }).catch(err => {
        })
      },
      getProvincersList() {
        listProvinces().then((res) => {
          console.log(555)
          let that = this;
          var array = [];
          res.data.body.provincesList.map((x) => {
            array.push({
              value: x.id,
              label: x.name
            })
          })
          that.provincersList = array;
        }).catch(err => {
        })
      },
      view(id) {
        var _this = this;
        articles.view(id, {
          success: function (data) {
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
      // 新增or更新
      insertOrUpdate() {
        var _this = this;
        var id = this.$route.params.id;
        if (trim(id)) {
          articles.update(_this.model, {
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
          _this.model.tardeWay = _this.model.tardeWayList.toString();
          _this.model.images= _this.uploadList;
          console.log(_this.model)
          delete  _this.model.tardeWayList;
          articles.insert(_this.model, {
            success: function (data) {
              if (data.code == 200) {
                _this.$Message.success({
                  content: '保存成功!',
                  onClose: function () {
                    _this.goBack();
                  }
                });
              } else {
                _this.$Message.error({
                  content: data,
                  onClose: function () {
                  }
                });
              }

            }
          });
        }
      },
      goBack() {
        this.$router.push({path: '/articles/list', name: 'articlesList'});
      },
      handleView(name) {
        this.imgName = name;
        this.visible = true;
      },
      handleRemove(file) {
        console.log(file);
        const fileList = this.$refs.upload.fileList;
        this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
//        var arr = this.uploadList;
//        arr.pop(file);
//        this.uploadList = arr
      },
      handleSuccess(res, file) {
        console.log(4343434)
        console.log(this.$refs.upload.fileList)
        console.log(file)
        file.url = res.body;
        file.name = res.body;
        file.path = res.body;
//        var arr = this.uploadList;
//        arr.push(file);
//        this.uploadList = arr
      },
      handleFormatError(file) {
        this.$Notice.warning({
          title: 'The file format is incorrect',
          desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
        });
      },
      handleMaxSize(file) {
        this.$Notice.warning({
          title: 'Exceeding file size limit',
          desc: 'File  ' + file.name + ' is too large, no more than 2M.'
        });
      },
      handleBeforeUpload() {
        const check = this.uploadList.length < 10;
        if (!check) {
          this.$Notice.warning({
            title: 'Up to 9 pictures can be uploaded.'
          });
        }
        return check;
      }
    },

    mounted() {
      setTimeout(() => {
        this.$nextTick(() => {
          this.uploadList = this.$refs.upload.fileList;
        });
      }, 1000);
    },
    created() {
      var id = this.$route.params.id;
      console.log("dss")
      this.getSystemUser();
      this.getCategoriesList();
      this.getSchoolsList();
      this.getProvincersList();
      if (trim(id)) {
        this.title = '更新';
        this.view(id);
      } else {
        this.title = '新建';
      }
    }

  }
</script>
<style>
  .demo-upload-list {
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
    box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
    margin-right: 4px;
  }

  .demo-upload-list img {
    width: 100%;
    height: 100%;
  }

  .demo-upload-list-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, .6);
  }

  .demo-upload-list:hover .demo-upload-list-cover {
    display: block;
  }

  .demo-upload-list-cover i {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
</style>
