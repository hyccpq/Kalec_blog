<template>
<div class="from">
  <Form ref="formInline" :model="formInline" :rules="ruleInline">
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
      <Button type="primary" @click="login">提交</Button>
    </FormItem>
  </Form>
</div>

</template>

<script>
  import Crypto from 'node-crypto'
  const cp = new Crypto('myapp');
	export default {
		name: "my-form",
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

		    let password = cp.hex(content);
		    console.log(password);
		    this.axios.get('/login',{
		      params:{
		        user: this.formInline.user,
            password
          }
        })
          .then(data=>{
            if(data.data.status === 1){
              localStorage.setItem('admin',this.formInline.user);
              this.$store.dispatch('setToken',{
                token: data.data.token
              });
              this.$Notice.success({
                title:'成功登陆'
              });
              console.log('成功');
              this.$emit('has-log');

            } else {
              this.$Message.warning(data.data.msg)
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
  width: 70%;
  margin: 50px auto;
}
</style>
