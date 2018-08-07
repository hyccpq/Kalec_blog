<template>
  <div id="comment">
    <h2 class="mark-title" v-if="!markId">站长评论</h2>
    <p class="mark-title" v-if="markId">回复：{{markName}}</p>
    <Form ref="commentInformation" :model="commentInformation" :label-width="40">
      <FormItem label="评论" prop="desc" class="comment-item">
        <i-input size="default" v-model="commentInformation.content" type="textarea" :autosize="{minRows: 5,maxRows: 8}" placeholder="输入您的评论"></i-input>
      </FormItem>
      <FormItem>
        <i-button type="primary" size="default" @click="submitComment">提交</i-button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  import { Input,Form,FormItem,Button,Row,Col } from 'iview'
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

		  return {
		    captChaValue:'',
        gotCaptCha:{},
        commentInformation:{
		      id:'',
		      user:sessionStorage.getItem('admin')==='hyccpq'?'Kalecgos':sessionStorage.getItem('admin'),
          email:'hyccpq@hotmail.com',
          content:'',
          isManage:true
        },
      }
    },
    methods:{
      isGetCaptcha(){
        let hasCaptCha = Object.keys(this.gotCaptCha).length == 0;
        if(hasCaptCha){
          this.getCaptcha();
        }
      },
      getCaptcha(){
        this.axios.get('/getCaptcha')
          .then(res => {
            if(res.data.status === 1){
              this.gotCaptCha = res.data.data
            } else {
              this.$Notice.warning({
                title: res.data.msg
              })
            }
          }).catch(e=>{
          console.log('error');
        })
      },
      validate(rule,decoration,value){
        const reg = new RegExp(rule,decoration);
        let isPass = reg.test(value);
        return new Promise((resolve, reject) => {
          resolve(isPass);
        })
      },
      async submitComment(){
        let url = '/addMark',
          emit = 'updateComment';
        this.commentInformation.id = this.articleId;
        console.log(this.markId);
        if(this.markId){
          url = '/addReply';
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

          this.updateMark(url,emit)
            .then(()=>{
              this.gotCaptCha = {};
              this.commentInformation = {};
              this.$Notice.success({
                title:'评论成功！'
              })

            }).catch(e=>{
            console.log(e);
          })
      },
      updateMark(url,emit){
        return this.axios(url,{
          method:'POST',
          data:this.commentInformation
        })
          .then(res => {
            if(res.data.status === 1){
              this.$emit(emit,res.data.data)
            } else {
              console.log(res.data.msg);
            }
          })
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
