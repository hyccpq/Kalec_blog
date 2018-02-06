<template>
<div class="from">
  <h2 class="title">冰空的作品展示管理登录</h2>
  <iForm ref="formInline" :model="formInline" :rules="ruleInline">
    <FormItem prop="user">
      <Input type="text" v-model="formInline.user" placeholder="用户名">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password" v-model="formInline.password" placeholder="密码">
        <Icon type="ios-locked-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem>
      <iButton type="success" long @click="login">提交</iButton>
    </FormItem>
    <a href="/">点击此处返回首页</a>
  </iForm>
</div>

</template>

<script>
  import Crypto from 'node-crypto'
  import { Form,FormItem,Input,Icon,Button } from 'iview'
	export default {
		name: "my-form",
    components:{
		  iForm:Form,
      FormItem,
      Input,
      Icon,
      iButton:Button
    },
    data () {
      return {
        formInline: {
          user: '',
          password: ''
        },
        ruleInline: {
          user: [
            { required: true, message: '请填写用户名。', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请填写密码。', trigger: 'blur' },
            { type: 'string', min: 3, message: '密码长度过短！！', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
		  login(){
        let content = this.formInline.password.trim();
        const cp = new Crypto('myapp');
        let password = cp.hex(content);
        this.axios.post('/login',{
          user: this.formInline.user,
          password
        })
          .then(data=>{
            if(data.data.status === 1){
              sessionStorage.setItem('admin',this.formInline.user);
              this.$store.dispatch('setToken',{
                token: data.data.token
              });
              this.$Notice.success({
                title:'成功登陆'
              });
              console.log('成功');
              this.$router.push('/write');
            } else {
              this.$Notice.warning({
                title:data.data.msg
              });

            }
          })
          .catch(e=>{
            console.error(e);
          })
      }
    }
  }
</script>

<style scoped>
.from{
  width: 300px;
  margin: 0 auto;
}
.title{
  margin: 20px auto;
  font-size: 25px;
  text-align: center;
}
</style>
