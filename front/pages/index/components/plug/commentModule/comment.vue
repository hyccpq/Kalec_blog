<template>
    <div id="comment">
        <h2 class="mark-title" v-if="!markId">评论</h2>
        <p class="mark-title" v-if="markId">回复：{{markName}}</p>
        <Form ref="commentInformation" :model="commentInformation" :rules="ruleValidate" :label-width="40">
            <FormItem label="昵称" prop="name" class="comment-item">
                <i-input v-model="commentInformation.user" size="default" placeholder="输入您的昵称" class="comment-information"></i-input>
            </FormItem>
            <FormItem label="邮件" prop="mail" class="comment-item">
                <i-input v-model="commentInformation.email" size="default" placeholder="输入您的e-mail"class="comment-information"></i-input>
            </FormItem>
            <FormItem label="评论" prop="desc" class="comment-item">
                <i-input v-model="commentInformation.content" size="default" type="textarea" :autosize="{minRows: 5,maxRows: 8}" placeholder="输入您的评论"></i-input>
            </FormItem>
            <FormItem label="验证" prop="captCha" class="comment-captcha comment-item">

                <i-input v-model="commentInformation.captChaValue" size="default" @on-focus="isGetCaptcha" placeholder="点此处击获取验证码"></i-input>
                <div v-html="gotCaptCha"></div>
                <div>
                    看不清？<a href="javascript:void(0)" @click="getCaptcha">换一个</a>
                </div>
            </FormItem>
            <FormItem>
                <i-button type="primary" size="default" @click="submitComment">提交</i-button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
	import { Input,Form,FormItem,Button,Row,Col } from 'iview'
    import API from '../../../../../modules/util/api'
	export default {
		name: "comment",
		components:{
			iInput:Input,
			Form,
			FormItem,
			iButton:Button,
			Row,Col
		},
		props:{
			articleId:{
				default:'',
				type:String
			},
			markId:{
				default:'',
				type:String
			},
			markName:{
				default:'',
				type:String
			}
		},
		data(){
			const validatorCaptCha = (rule,value,callback) => {
				this.validateCaptcha(this.commentInformation.captChaValue)
					.then(res => {
						callback()
					}).catch(e => {
						callback(new Error(e.msg))
                })
			};
			const validatorEmail = (rule,value,callback) => {
				this.validateEmail(/^\w+@[a-z0-9]+\.[a-z]+$/,'ig',this.commentInformation.email)
					.then(res => {
						if(!res){
							callback(new Error('邮箱不合法'))
						} else {
							callback();
						}
					})
			};
			return {

				gotCaptCha:'',
				commentInformation:{
					_id:'',
					user:'',
					email:'',
					content:'',
                    captChaValue:''
				},
				ruleValidate: {
					mail: [
						{ validator: validatorEmail, trigger: 'blur' }
					],
					captCha: [
						{ validator: validatorCaptCha, trigger: 'blur' }
					]
				}
			}
		},
		methods:{
			isGetCaptcha(){
				if(!this.gotCaptCha){
					this.getCaptcha();
				}
			},
			getCaptcha(){
				API.getCaptcha(this.$store.commit).then(res => {
					this.gotCaptCha = res
                }).catch(e => {
                	console.log(e);
                })
			},
            validateCaptcha(captChaValue) {
				return API.compressCaptcha({captChaValue})
            },
			validateEmail(rule,decoration,value){
				const reg = new RegExp(rule,decoration);
				let isPass = reg.test(value);
				return new Promise((resolve, reject) => {
					resolve(isPass);
				})
			},
			async submitComment(){
				let emit = 'updateComment';
				this.commentInformation._id = this.articleId;
				if(this.markId){
					emit = 'updateReply';
					this.commentInformation.markId = this.markId;
				}
				for(let key in this.commentInformation){
					if(!this.commentInformation[key]){
						this.$Notice.warning({
							title:`${key}不能为空`
						});
						return;
					}
				}
				let CaptChaPass = await this.validateCaptcha(this.commentInformation.captChaValue)
					.then(res=>{
						return true;
					}).catch(err => {
						this.$Notice.warning({
                            title: err.msg
                        })
						return false
                    });
				let EmailPass = await this.validateEmail(/^\w+@[a-z0-9]+\.[a-z]+$/,'ig',this.commentInformation.email)
					.then(res=>{
						if(!res){
							this.$Notice.warning({
								title:'邮箱格式不正确'
							});
							return false;
						} else {
							return true;
						}
					});
				if(EmailPass && CaptChaPass){
					this.updateMark(emit)
						.then(()=>{
							let saveValue = JSON.stringify({
								user:this.commentInformation.user,
								email:this.commentInformation.email
							});
							if(localStorage.getItem('userInformation') !== saveValue){
								localStorage.setItem('userInformation',saveValue);
							}
							this.gotCaptCha = '';
							this.commentInformation.content = '';
							this.$Notice.success({
								title:'评论成功！谢谢支持~'
							})

						}).catch(e => {
							if(e.status === 0) {

								this.$Notice.warning({
									title: e.msg
								});
								this.getCaptcha()
                            }
					})
				} else {
					this.$Notice.warning({
                        title: '评论失败'
                    })
                }
			},
			updateMark(emit){
				return (this.markId
                    ? API.commitReply(this.commentInformation, this.$store.commit)
                    : API.commitComment(this.commentInformation, this.$store.commit))
					.then(res => this.$emit(emit,res))
			}
		},
		mounted(){
			if(localStorage.getItem('userInformation')){
				this.commentInformation = JSON.parse(localStorage.getItem('userInformation'));
			}
		}
	}
</script>

<style scoped lang="stylus">
    #comment
        border-top 2px solid #ccd8f8
        padding-top 20px
        .mark-title
            text-align center
            margin 10px auto
            font-size 20px
        .comment-item
            margin-bottom 20px
            .comment-information
                width 260px
        .comment-captcha
            width 180px
    @media screen and (max-width: 550px)
        #comment
            .comment-item
                .comment-information
                    width 100%
</style>
