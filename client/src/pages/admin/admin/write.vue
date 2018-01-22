<template>
  <div>
    <Collapse v-model="indexs"  accordion>
      <Panel name="1">
        添加相关信息
        <div slot="content" style="margin: 20px auto;">
          <Form ref="subInfo" :model="subInfo" :label-width="80">
            <!--文章标题-->
            <FormItem label="标题" prop="标题">
              <Input v-model="subInfo.title" placeholder="输入你的标题"></Input>
            </FormItem>
            <!--日期-->
            <!--标签-->
            <FormItem label="标签" prop="标签">
              <Row>
                <Col span="22">
                  <Select v-model="selectTagName" multiple>
                    <Option v-for="item in tagList" :value="JSON.stringify(item)" :key="item.tagId">{{ item.tagName }}</Option>
                  </Select>
                </Col>
                <Col span="2" ><Button type="info" @click="changeAdd">添加</Button></Col>
              </Row>

            </FormItem>
            <!--分类-->
            <FormItem label="分类" prop="分类">
              <Select v-model="subInfo.classic" placeholder="选择你的分类">
                <Option v-for="(classItem,key) in classList" :key="key" :value="classItem">{{classItem}}</Option>
              </Select>
            </FormItem>
            <!--简介-->
            <FormItem label="简介" prop="简介内容">
              <Input v-model="subInfo.abstract" type="textarea" :autosize="{minRows: 6,maxRows: 6}"
                     placeholder="请输入简介"></Input>
            </FormItem>
            <!--封面图-->
            <!--上传文件-->
          </Form>
        </div>
      </Panel>
      <Panel name="2">
        上传图片或文件
        <div slot="content">
          <Upload
            ref="upload"
            :show-upload-list="true"
            :default-file-list="defaultList"
            :on-success="handleSuccess"
            :max-size="5096"
            :multiple="true"
            :on-exceeded-size="handleMaxSize"
            type="drag"
            name="articleImage"
            action="../api/upload">
            <div style="padding: 20px 0">
              <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
              <p>点击或者拖动到此处上传</p>
            </div>
          </Upload>
        </div>
      </Panel>
      <Panel name="3">
        编辑文章
        <div slot="content">
          <mavon-editor ref="md" @imgAdd="$imgAdd" @imgDel="$imgDel"
            :ishljs = "true" style="height: 800px;" v-model="markdown" default_open="edit"></mavon-editor>
          {{subInfo.markdown}}
        </div>
      </Panel>
    </Collapse>
    <Button type="primary" :loading="loading" icon="checkmark-round" @click="toLoading" style="margin: 30px auto;" long>
        <span v-if="!loading">提交</span>
        <span v-else>Loading...</span>

    </Button>
    <add-tag :isShowlog="isTagAdd" @onChange="changeAdd">
      <Form :label-width="80">
        <FormItem label="新标签">
          <Input v-model="addTagValue" placeholder="请输入新标签"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="addTag">添加</Button>
          <Button type="ghost" style="margin-left: 8px" @click="changeAdd">取消</Button>
        </FormItem>
      </Form>
    </add-tag>
  </div>
</template>

<script>
  import { mavonEditor } from 'mavon-editor';
  import 'mavon-editor/dist/css/index.css'
  import addTag from '../../index/components/plug/login'
  import $http from 'axios'
  // import MarkdownIt from 'markdown-it'
  export default {
    name: "write",
    components:{
      mavonEditor,
      addTag
    },
    data() {
      return {
        indexs: '1',
        loading: false,
        isTagAdd: false,
        tagList: [],
        defaultList:[],
        selectTagName:[],
        classList: ['技术','生活','梦想','其他'],
        addTagValue:'',
        img_file:{},
        markdown:'',
        subInfo: {
          time: '',//~
          title: '',//
          author: '',//
          classic: '',//
          tag: [],//
          imgUrl: 'null',
          content: 'test',//~
          markdown: 'null',//~
          abstract: ''//~
        }
      }
    },
    computed:{
      issueTime(){
        return new Date();
      },
      getTag(){
        return this.selectTagName.map(item => JSON.parse(item));
      }
    },
    methods:{
      toLoading(){
        this.loading = true;
        this.subInfo.time=this.issueTime;
        this.subInfo.author = localStorage.getItem('admin');
        this.subInfo.tag=this.getTag;
        this.getHtml();
        for(let key in this.subInfo){
          if(!this.subInfo[key]){
            this.$Notice.error({
              title: key + '为空，不能提交'
            });
            this.loading = false;
            return;

          }
        }
        this.axios('addArticle',{
          method:'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          data: this.subInfo
        })
          .then(data => {
            if(data.data.status === 1){
              this.$Message.info('保存成功');
              console.log(this.subInfo);
            } else {
              this.$Message.warning(data.data.msg);
            }
            this.loading = false;
          })
          .catch(data => {
            console.error('error');
          })
      },
      getHtml(){

        let htmlContent = document.getElementsByClassName('v-show-content-html')[0].innerText;
        console.log(htmlContent);
        this.subInfo.content = htmlContent;
      },
      addTag() {
        let n = this.tagList.length;
        this.tagList.push({
          tagId: n+1,
          tagName: this.addTagValue
        });
        this.addTagValue = '';
        this.changeAdd();
        console.log(this.tagList);
      },
      changeAdd(){
        this.isTagAdd = !this.isTagAdd;
      },
      $imgAdd(pos,$file){
        let formData = new FormData();
        console.log($file);
        console.log(pos);
        // let xhr = new XMLHttpRequest();
        formData.append("articleImage",$file);
        $http('../api/upload',{
          method:'POST',
          data:formData,
          headers:{
            'Content-Type':'multipart/form-data'
          }
        }).then((res)=>{
          console.log(res.data);
          const imgUrl = `http://localhost:8081/${res.data.data.filePath}`;
          this.$refs.md.$imgUpdateByUrl(pos,imgUrl);
          this.$refs.md.$img2Url(pos,imgUrl);
          this.$refs.md.$refs.toolbar_left.$imgUpdateByFilename(pos,imgUrl);
        }).catch(err => {
          console.log(err);
        })
      },
      $imgDel(pos){
        delete this.img_file[pos]
      },
      handleSuccess(res,file){
        if(res.status === 1){
          let url = `${window.location.protocol}//localhost:3000/uploads/${res.data.fileName}`;
          this.subInfo.imgUrl = url;
          file.name = res.data.fileName;
          file.url = url;
          console.log(res.data);
          this.$Notice.info({
            title:'上传成功',
          })
        } else {
          this.$Notice.warning({
            title:'上传失败',
            desc:res.msg
          })
        }
      },
      handleMaxSize(){
        this.$Notice.warning({
          title:'文件必须小于5M',
          desc:`文件${file.name}超过5M`
        })
      }
    },
    mounted () {
      this.axios.get('searchAllTags')
        .then(data => {
          if(data.data.status === 1){
            this.tagList = data.data.data
          }
        })
        .catch(err => {
          console.warn(err);
        })
    }
  }
</script>

<style scoped>

</style>
