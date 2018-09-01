<template>
    <div id="write">
        <div class="write-content write-contents-1">
            <h3>编辑文章</h3>
            <Form ref="subInfo" :model="subInfo" :label-width="0" class="content">
                <!--文章标题-->
                <FormItem label="文章标题" prop="文章标题">
                    <Input size='default' v-model="subInfo.title" placeholder="输入你的标题"></Input>
                </FormItem>
                <mavon-editor ref="md" @imgAdd="$imgAdd" @imgDel="$imgDel"
                              :ishljs = "true" v-model="subInfo.markdown" default_open="edit" class="editor"></mavon-editor>
            </Form>
        </div>
        <div class="container">
            <div class="write-content write-contents-2">
                <h3>添加相关信息</h3>
                <div slot="content" style="margin: 20px auto;">
                    <Form ref="subInfo" :model="subInfo" :label-width="0">

                        <!--日期-->
                        <FormItem label="发布日期" prop="发布日期">
                            <DatePicker size="default" :transfer="true" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="更改发布时间" style="width: 200px" v-model="selectDate"></DatePicker>
                        </FormItem>
                        <!--标签-->
                        <FormItem label="标签" prop="标签">{{selectTagName}}
                            <Select transfer size="default" v-model="selectTagName" :multiple="true" :value="selectTagName">
                                <Option v-for="(item,key) in tagList" :value="item.tagName" :key="key">
                                    {{ item.tagName }}
                                </Option>
                            </Select>
                            <Button size="default" type="info" @click="changeAdd">添加标签</Button>

                        </FormItem>
                        <!--分类-->
                        <FormItem label="分类" prop="分类">
                            <Select transfer size="default" v-model="subInfo.classic" placeholder="选择你的分类">
                                <Option v-for="(classItem,key) in classicList" :key="key" :value="classItem ? classItem : ''">
                                    {{classItem}}
                                </Option>
                            </Select>
                            <Button size="default" type="info" @click="changeAddClassic">添加分类</Button>
                        </FormItem>
                        <!--封面图-->
                        <!--上传文件-->
                        <Button size="default" type="primary" :loading="loading" icon="checkmark-round" @click="toLoading" style="margin: 30px auto;">
                            <span v-if="!loading">提交日志</span>
                            <span v-else>Loading...</span>

                        </Button>
                    </Form>
                </div>
            </div>
            <div class="write-content write-contents-3">
                <h3>填写简介或上传文件图片</h3>
                <div slot="content">
                    <Form ref="subInfo" :model="subInfo" :label-width="0">
                        <!--简介-->
                        <FormItem label="简介" prop="简介内容">
                            <Input size="default" v-model="subInfo.abstract" type="textarea" :autosize="{minRows: 6,maxRows: 6}"
                                   placeholder="请输入简介"></Input>
                        </FormItem>

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
                            action="/api/admin/v0/upload">
                            <div style="padding: 20px 0">
                                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                                <p>点击或者拖动到此处上传</p>
                            </div>
                        </Upload>
                    </Form>
                </div>
            </div>
        </div>


        <add-tag :isShowlog="isTagAdd" @onChange="changeAdd" >
            <Form :label-width="0" class="add-tags">
                <FormItem label="新标签">
                    <Input size="default" v-model="addTagValue" placeholder="请输入新标签"></Input>
                </FormItem>
                <FormItem>
                    <Button size="default" type="primary" @click="addTag">添加</Button>
                    <Button size="default" style="margin-left: 8px" @click="changeAdd">取消</Button>
                </FormItem>
            </Form>
        </add-tag>
        <add-classic :isShowlog="isClassicAdd" @onChange="changeAddClassic" >
            <Form :label-width="0" class="add-tags">
                <FormItem label="新分类">
                    <Input size="default" v-model="addClassicValue" placeholder="请输入新分类"></Input>
                </FormItem>
                <FormItem>
                    <Button size="default" type="primary" @click="addClassic">添加</Button>
                    <Button size="default" style="margin-left: 8px" @click="changeAddClassic">取消</Button>
                </FormItem>
            </Form>
        </add-classic>
    </div>
</template>

<script>
	import { Form,FormItem,Input,Button,Upload,Select,Option,Row,Col,Icon,DatePicker } from 'iview'
	import { mavonEditor } from 'mavon-editor';
	import add from './plug/modal'
	import $http from 'axios'
	// import MarkdownIt from 'markdown-it'
	export default {
		name: "write",
		components:{
			mavonEditor,
			addTag:add,
			addClassic:add,
			Form,FormItem,Input,Button,Upload,Select,Option,Row,Col,Icon,DatePicker
		},
		data() {
			return {
				indexs: '1',
				loading: false,
				isTagAdd: false,
				isClassicAdd:false,
                newClassic: '',
                newTagList: [],
				tagList: [],
				classicList:[],
				defaultList:[],
				selectTagName:[],
				selectDate:'',
				// classList: ['技术','生活','梦想','其他'],
				addTagValue:'',
				addClassicValue:'',
				img_file:{},
				markdown:'',
				subInfo: {
					time: '',//~
					title: '',//
					author: '',//
					classic: '',//
					tag: [],//
					imgUrl: 'null',
					content: '',//~
					markdown: '',//~
					abstract: ''//~
				}
			}
		},
		computed:{
			issueTime(){
				return new Date();
			},
			getTag(){
				return this.selectTagName.map(item => {
					for(let i = 0;i< this.tagList.length;i++){
						if(this.tagList[i].tagName == item){
							return this.tagList[i]
						}
					}
				});
			}
		},
		methods:{

			toLoading(){
				this.loading = true;
				this.subInfo.author = localStorage.getItem('admin');
				this.subInfo.tag=this.getTag;
				if(this.selectDate){
					this.subInfo.time = this.selectDate;
				} else {
					this.subInfo.time=this.subInfo.time?this.subInfo.time:this.issueTime;
				}
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
				if(!this.$route.params.id){

					Promise.all([this.addArticle(), this.updateNewTagOrClassic()])
						.then(([data, updateInfo]) => {
							console.log(data);
							if(data.data.status === 1){
								this.$Notice.info({title:'保存成功'});
								console.log(updateInfo);
							} else {
								this.$Notice.warning({title:data.data.msg});
							}
						})
						.then(()=>{
							this.loading = false
                            this.$router.push('/admin/edit/articleManage')
						})
						.catch(err => {
							console.error(err);
						})
				} else {
					this.subInfo.id = this.$route.params.id;
					Promise.all([this.updateArticle(), this.updateNewTagOrClassic()])
						.then(([data, updateInfo]) => {
							console.log(data);
							if(data.data.status === 1){
								this.$Notice.info({title:'修改成功'});
								console.log(updateInfo);
							} else {
								this.$Notice.warning({title:data.data.msg});
							}

						})
						.then(()=>{
							this.loading = false;
							this.$router.push('/admin/edit/articleManage')
						})
						.catch(err => {
							console.error('抱歉，出错了');
						})
				}

			},
			updateArticle() {
				return this.axios('/admin/v0/editArticle',{
					method:'PUT',
					headers:{
						'Content-Type': 'application/json'
					},
					data: this.subInfo
				})
			},
			addArticle(){
				return this.axios('/admin/v0/addArticle',{
					method:'POST',
					headers:{
						'Content-Type': 'application/json'
					},
					data: this.subInfo
				})
			},
			updateNewTagOrClassic() {
				let data = {
					tag: []
                }
				if(this.subInfo.classic === this.newClassic) data.classic = this.newClassic;
				for (let i = 0; i < this.subInfo.tag.length; i++) {
					for (let j = 0; j < this.newTagList.length; j++) {
                        if(this.subInfo.tag[i].tagId === this.newTagList[j].tagId) {
                        	data.tag.push(this.newTagList[j])
                        }
					}
				}
				return this.axios('/admin/v0/addTagOrClassic',{
					method:'POST',
					headers:{
						'Content-Type': 'application/json'
					},
					data
				})
			},
			getHtml(){
				let artContent = document.querySelector('.v-show-content');
				Array.from(artContent.querySelectorAll('h1,h2,h3,h4,h5,h6')).forEach((value, index) => {
					value.id = `T-${value.localName}-${index}`;
					value.insertAdjacentHTML('beforebegin',`<a class="anchor" id="${value.localName}-${index}"></a>`);
				});
				let htmlContent = artContent.innerHTML;
				this.subInfo.content = htmlContent;
			},
			addTag() {
				if(this.addTagValue){
					let n = this.tagList.length;
					let newTag = {
						tagId: n+3,
						tagName: this.addTagValue
					}
					this.tagList.push(newTag);
					this.newTagList.push(newTag)
					this.$Notice.success({
						title:`成功添加新标签:${this.addTagValue}`
					});
					this.addTagValue = '';
				} else {
					this.$Notice.warning({
						title:'新标签不能为空'
					})
				}
				this.changeAdd();
				console.log(this.tagList);
			},
			changeAdd(){
				this.isTagAdd = !this.isTagAdd;
			},
			addClassic(){
				if(this.addClassicValue){
					this.classicList.push(this.addClassicValue);
					this.newClassic = this.addClassicValue;
					this.$Notice.success({
						title:`成功添加新分类:${this.addClassicValue}`
					});
					this.addClassicValue = '';
				} else {
					this.$Notice.warning({
						title:'新的分类不能为空'
					})
				}
				this.changeAddClassic();
				console.log(this.classicList);
			},
			changeAddClassic(){
				this.isClassicAdd = !this.isClassicAdd;
			},
			$imgAdd(pos,$file){
				let formData = new FormData();
				console.log($file);
				console.log(pos);
				// let xhr = new XMLHttpRequest();
				formData.append("articleImage",$file);
				$http('/api/admin/v0/upload',{
					method:'POST',
					data:formData,
					headers:{
						'Content-Type':'multipart/form-data'
					}
				}).then((res)=>{
					console.log(res.data);
					const imgUrl = `${window.location.protocol}//${location.hostname}:${location.port}/${res.data.data.filePath}`;
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
					let url = `${window.location.protocol}//${location.hostname}:${location.port}/uploads/${res.data.fileName}`;
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
					title:'文件必须小于10M',
					desc:`文件${file.name}超过10M`
				})
			}
		},
		created () {
			this.axios.get('/public/searchAllTags')
				.then(res => {
					if(res.data.status === 1){
						console.log(res.data.data);
						this.tagList = res.data.data.tag;
						this.classicList = res.data.data.classic;
					}
				})
				.catch(err => {
					console.warn(err);
				});

			let id = this.$route.params.id;
			if(id){
				this.axios.get('/admin/v0/searchAdArticle',{
					params:{
						id
					}
				}).then(res => {
					if(res.data.status ===1){
						console.log(res.data.data);
						let data = res.data.data;
						for(let item in this.subInfo){
							this.subInfo[item] = data[item];
						}
						this.selectDate = data.time;
						this.subInfo.tag.forEach(item => {
							this.selectTagName.push(item.tagName);
						});
						console.warn(this.selectTagName);
					} else {
						this.$Notice.warning({
							title:'数据获取失败'
						})
					}
				}).catch(err=> {
					console.log(err);
				})
			}
		}
	}
</script>

<style scoped lang="stylus">
    #write
        height 100%
        display flex
        flex-wrap wrap
        .add-tags
            width: 260px
        .write-content
            border 1px dashed rgba(255, 227, 180, 0.7)
            padding 5px
            background #ffffff
            h3
                text-align center
        .write-contents-1
            width: 75%
            .content
                height 100%
                .editor
                    height 87%
        .container
            width: 25%
            display flex
            flex-wrap wrap
            .write-content
                width: 100%
            .write-contents-2
                order 1
            .write-contents-3
                order 2
    @media screen and (max-width: 767px)
        #write
            .write-contents-1
                width 100%
                .content
                    .editor
                        height 500px
            .container
                width 100%
                .write-contents-2
                    order 2
                .write-contents-3
                    order 1
</style>
