<template>
    <div class="from">
        <h2 class="title">冰空的作品展示管理登录</h2>
        <iForm ref="formInline" :model="formInline" :rules="ruleInline">
            <FormItem prop="user">
                <iInput type="text" size="default" v-model="formInline.user" placeholder="用户名">
                    <Icon type="md-person" slot="prepend"></Icon>
                </iInput>
            </FormItem>
            <FormItem prop="password">
                <iInput type="password" size="default" v-model="formInline.password" placeholder="密码">
                    <Icon type="md-lock" slot="prepend"></Icon>
                </iInput>
            </FormItem>
            <FormItem>
                <iButton type="success" size="default" long @click="login">提交</iButton>
            </FormItem>
            <a href="/">点击此处返回首页</a>
        </iForm>
    </div>

</template>

<script>
	import { Form,FormItem,Input,Icon,Button } from 'iview'
	export default {
		name: "my-form",
		components:{
			iForm:Form,
			FormItem,
			iInput:Input,
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
				this.axios({
                    url: '/admin/v0/login',
                    method: 'POST',
                    data: {
                    	user: this.formInline.user,
					    password: this.formInline.password
                    }
                })
					.then(data=>{
						if(data.data.status === 1){
							localStorage.setItem('admin',this.formInline.user);
							this.$store.dispatch('setToken',{
								token: data.data.data
							});
							this.$Notice.success({
								title:'成功登陆'
							});
							console.log('成功');
							this.$router.push('/admin/edit/write');
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
