<template>
    <section>
        <h1>{{$route.params.id ? `编辑${$route.params.title}` : '添加'}}相册</h1>
        <Form ref="formValidate" :model="formValidate" :rules="ruleCustom" :label-width="80">
            <FormItem label="相册名称" prop="title">
                <Input v-model="formValidate.title" size="default" placeholder="输入相册名称"></Input>
            </FormItem>
            <FormItem label="相册描述" prop="description">
                <Input v-model="formValidate.description" type="textarea" size="default" :autosize="{minRows: 2,maxRows: 5}" placeholder="输入相册描述"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')" size="default" v-if="!$route.params.id">提交</Button>
                <Button type="primary" @click="handleUpdate('formValidate')" size="default" v-else>更新</Button>
                <Button @click="handleReset('formValidate')" style="margin-left: 8px" size="default">重置</Button>
            </FormItem>
        </Form>
    </section>
</template>

<script>
    import { mapState } from 'vuex'
    import {FormItem, Form, Button, Input} from 'iview'
	export default {
		name: "editGallery",
        components: {
		    FormItem,
            Form,
            Button,
            Input
        },
        data() {
			const validatePass = (rule, value, callback) => {
				console.log(value);
                if (!value) {
                    callback(new Error('此项不能为空'));
                } else {
                	callback()
                }
            };
			return {
				formValidate: {
                    title: '',
                    description: '',
                    author: '',
                    id: ''
                },
                ruleCustom: {
					title: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    description: [
                        { validator: validatePass, trigger: 'blur' }
                    ]
                }
            }
        },
        async mounted() {
			let { id, index } = this.$route.params
            if(this.$route.params.id) {
                this.formValidate.id = id
                if(!this.galleryAll.length) {
                	await this.$store.dispatch('getAllGallery')
                }
                this.formValidate = this.galleryAll[index]
            }
        },
        computed: {
            ...mapState({
                galleryAll: state => state.galleryAll
            })
        },
        methods: {
			handleUpdate (name) {

            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                	console.log(this, valid);
                    if (valid) {
                    	let author = window.localStorage.getItem('admin')
                        this.formValidate.author = author === 'hyccpq' ? 'Kalecgos' : author
                        let data = this.formValidate
                        this.axios.post('/gallery/v0/editGallery', data).then(res => {
                        	this.$Notice.success({title: '提交成功'});
                        }).catch(e => {
                        	this.$Notice.error({title: '提交失败，请重试'});
                        	console.log(e);
                        })

                    } else {
                        this.$Notice.error({
                            title: '提交失败，请按要求提交'
                        });
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
	}
</script>

<style scoped>

</style>