<template>
  <div id="comment">
    <div class="comment-captcha">
      <i-input v-model="captChaValue" @on-focus="isGetCaptcha" @on-blur="validateCaptcha" placeholder="输入验证码"></i-input>
      <div v-html="gotCaptCha.data"></div>
      <p>
        看不清？<a href="#" @click="getCaptcha">换一个</a>
      </p>
    </div>
  </div>
</template>

<script>
  import { Input } from 'iview'
	export default {
		name: "comment",
    components:{
		  iInput:Input
    },
    data(){
		  return {
		    captChaValue:'',
        gotCaptCha:{},
        isPass:false
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
      validateCaptcha(){
        let reg = new RegExp(`^${this.gotCaptCha.text}$`,'i');
        this.isPass = reg.test(this.captChaValue)
      }
    }
	}
</script>

<style scoped>

</style>
