<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="mouse"></Icon>
                {{title}}
            </p>
            <Form :model="model" label-position="right" :label-width="100">
                <FormItem label="音频名称">
                    <Input v-model="model.name"></Input>
                </FormItem>
                <FormItem label="简介">
                    <t-quill-editor v-model="model.intro" :text="model.intro" placeholder="请输入简介"></t-quill-editor>
                </FormItem>
                <FormItem label="url">
                    <t-web-uploader format="mp3" accept="audio/*"
                        :show-upload-list="false" @on-success="handleD"
                        @on-error="handleError" @on-format-error="handleFormatErr"
                        @on-remove="handleRemove" ref="upload">
                        <span slot="uploadBtn">
                            <div>
                                <Button icon="ios-cloud-upload-outline" >上传音频</Button>
                            </div>
                        </span>
                        <span slot="tip">
                            <input v-if="model.url" type="text" v-model="model.url" style="width:500px" readonly>
                        </span>
                    </t-web-uploader>
                </FormItem>
                <FormItem label="belongTo">
                  <Select v-model="model.belongTo" @on-change='changemodel()'>
                    <Option v-for="item in typeList" :value="item.parameterKey" :key="item.parameterKey">
                      {{item.parameterValue}}
                    </Option>
                  </Select>
                    <!-- <Input ></Input> -->
                </FormItem>
                <FormItem label="belongToId">
                    <Select v-model="model.belongToId" >
                    <Option v-for="item in albumList" :value="item.recId" :key="item.recId">
                      {{item.name}}
                    </Option>
                  </Select>
                    <!-- <Input v-model="model.belongToId"></Input> -->
                </FormItem>
                <FormItem label="封面">
                  <t-web-uploader format="jpg,jpeg,bmp,png" accept="image/*"
                  :show-upload-list="false" @on-success="handleDone"
                  @on-error="handleError" @on-format-error="handleFormatError"
                  @on-exceeded-size="handleMaxSize"
                  @on-remove="handleRemove" ref="upload">
                    <span slot="uploadBtn">
                    <div>
                      <Button icon="ios-cloud-upload-outline" >添加封面</Button>
                    </div>
                    </span>
                    <p slot="tip">
                      <img v-if="model.cover" style="width:200px;height:200px" :src="model.cover"/>
                    </p>
                  </t-web-uploader>
                </FormItem>
              <FormItem label="二维码">
                <input-number v-model="model.qrCode"></input-number>
                <img v-if="model.qrCode" :src="model.qrCode"/>
              </FormItem>
                <FormItem label="播放次数">
                    <input-number v-model="model.playNum"></input-number>
                </FormItem>
                <FormItem label="创建人ID">
                    <Input v-model="model.createId"></Input>
                </FormItem>
                <FormItem label="创建时间">
                    <Input v-model="model.createTime"></Input>
                </FormItem>
                <FormItem label="更新人ID">
                    <Input v-model="model.updateId"></Input>
                </FormItem>
                <FormItem label="更新时间">
                    <Input v-model="model.updateTime"></Input>
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
import { trim, trim2Zero } from "@/libs/util.js";
import { listDict } from "@/api/data";
import audio from "@/model/audio";
import album from "@/model/album";
import tWebUploader from "../../components/web-uploader/t-web-uploader.vue";
import tQuillEditor from "../../components/t-quill-editor/t-quill-editor.vue";

/**
 * Info: 音频
 * Created by wangyifan on 2018-11-24 12:40:32
 */
export default {
  name: "audioNew",
  components: { tQuillEditor, tWebUploader },
  data() {
    return {
      title: "",
      albumList: [], //专辑列表
      model: {
        cover: "",
        intro: "",
        url: ""
      },
      ruleValidate: {},
      typeList: []
    };
  },
  watch: {},
  computed: {},
  mounted() {
    // on-change方法,判断返回的是哪一个album,有传给list,没有给空
    listDict("Audio_Type").then(res => {
      this.typeList = res.data;
    });
  },
  methods: {
    view(id) {
      var _this = this;
      audio.view(id, {
        success: function(data) {
          _this.model = Object.assign({}, _this.model, {
            recId: data.recId,
            name: data.name,
            url: data.url,
            intro: data.intro,
            cover: data.cover,
            qrCode: data.qrCode,
            belongTo: data.belongTo,
            belongToId: data.belongToId,
            playNum: trim2Zero(data.playNum),
            createId: data.createId,
            createTime: data.createTime,
            updateId: data.updateId,
            updateTime: data.updateTime
          });
          _this.listAlbum();
        }
      });
    },
    // 新增or更新
    insertOrUpdate() {
      var _this = this;
      var recId = this.$route.params.recId;
      if (trim(recId)) {
        audio.update(_this.model, {
          success: function(data) {
            _this.$Message.success({
              content: "更新成功!",
              onClose: function() {
                _this.goBack();
              }
            });
          }
        });
      } else {
        audio.insert(_this.model, {
          success: function(data) {
            _this.$Message.success({
              content: "保存成功!",
              onClose: function() {
                _this.goBack();
              }
            });
          }
        });
      }
    },
    goBack() {
      this.$router.push({ path: "/audio/list", name: "audioList" });
    },
    changemodel() {
      // 筛选状态
      if (this.model.belongTo=='album') {
        this.listAlbum();
      } else {
        this.albumList = [];
      }
    },
    listAlbum() {
      var _this = this;
      var qData = {
        perPageNum: 100,
        currentPageIndex: 1
      };

      album.query(qData, {
        success: function(data) {
          _this.albumList = data["albumList"];
        }
      });
    },

    handleD: function(file, fileList) {
      var _this = this;
      // 获取文件类型
      _this.uploadList = fileList.slice(0, 1);
      _this.model = Object.assign({}, _this.model, {
        url: file["url"]
      });
    },
    handleFormatErr: function(file) {
      this.$Message.error({
        content: "文件 " + file.name + " 格式不正确，请上传 mp3 格式的音频。"
      });
    },
    handleDone: function(file, fileList) {
      var _this = this;
      // 获取文件类型
      _this.uploadList = fileList.slice(0, 1);
      _this.model = Object.assign({}, _this.model, {
        cover: file["url"]
      });
    },
    handleError: function(response, file, fileList) {
      this.$Message.error({
        content: "文件 " + file.name + " 上传失败，请重新上传。"
      });
    },
    handleFormatError: function(file) {
      this.$Message.error({
        content:
          "文件 " + file.name + " 格式不正确，请上传 jpg 或 png 格式的图片。"
      });
    },
    handleMaxSize: function(file) {
      this.$Message.error({
        content: "文件 " + file.name + " 太大，不能超过 2M。"
      });
    },
    handleRemove: function(file) {
      var _this = this;
      if (this.requestType != "a") {
        _this.model = Object.assign({}, _this.model, {
          cover: ""
        });
        var fileList = this.$refs.upload.fileList;

        var index = fileList.indexOf(file);
        this.$refs.upload.fileList.splice(index, 1);
      }
      _this.uploadList.splice(index, 1);
      _this.model.cover = "";
    }
  },
  created: function() {
    var recId = this.$route.params.recId;
    if (trim(recId)) {
      this.title = "更新";
      this.view(recId);
    } else {
      this.title = "新建";
    }
  }
};
</script>
