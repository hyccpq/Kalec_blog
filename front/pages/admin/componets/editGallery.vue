<template>
    <section class="section-edit">
        <h1 class="title">{{$route.params.id ? `编辑${$route.params.title}` : '添加'}}相册</h1>
        <Form ref="formValidate" :model="formValidate" :rules="ruleCustom" :label-width="80">
            <FormItem label="相册名称" prop="title">
                <Input v-model="formValidate.title" size="default" placeholder="输入相册名称"></Input>
            </FormItem>
            <FormItem label="相册描述" prop="description">
                <Input v-model="formValidate.description" type="textarea" size="default"
                       :autosize="{minRows: 5,maxRows: 15}" placeholder="输入相册描述"></Input>
            </FormItem>
            <FormItem label="相册加密">
                <i-switch v-model="formValidate.isPwd" size="large">
                    <span slot="open">On</span>
                    <span slot="close">Off</span>
                </i-switch>
            </FormItem>
            <FormItem label="加密密码" prop="title" v-if="formValidate.isPwd">
                <Input v-model="formValidate.password" type="password" size="default" placeholder="输入相册密码"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')" size="default" v-if="!$route.params.id">
                    提交
                </Button>
                <Button type="primary" @click="handleUpdate('formValidate')" size="default" v-else>更新</Button>
                <Button @click="handleReset('formValidate')" style="margin-left: 8px" size="default">重置</Button>
            </FormItem>
        </Form>
    </section>
</template>

<script>
    import {mapActions, mapState} from 'vuex'
    import {addOneGallery, editOneGallery} from '../util/adApi'
    import {FormItem, Form, Button, Input, Switch} from 'iview'

    export default {
        name: "editGallery",
        components: {
            FormItem,
            Form,
            Button,
            Input,
            ISwitch: Switch
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
                defIsPwd: false,
                formValidate: {
                    title: '',
                    description: '',
                    author: '',
                    id: '',
                    isPwd: false,
                    password: ''
                },
                ruleCustom: {
                    title: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    description: [
                        {validator: validatePass, trigger: 'blur'}
                    ]
                }
            }
        },
        async mounted() {
            let {id, index} = this.$route.params
            if (this.$route.params.id) {
                if (!this.galleryAll.length) {
                    // await this.$store.dispatch('getAllGallery')
                    await this.getAllGallery()
                }
                let {title, description, author, _id, isPwd} = this.galleryAll[index]
                this.defIsPwd = isPwd
                this.formValidate = {title, description, author, id: _id, switch: isPwd}
            }
        },
        computed: {
            ...mapState('galleryModule', {
                galleryAll: state => state.galleryAll
            })
        },
        methods: {
            ...mapActions('galleryModule', [
                'getAllGallery'
            ]),
            handleUpdate(name) {
                this.$refs[name].validate(async (valid) => {
                    if (valid) {
                        await editOneGallery(this.formValidate)
                        this.$Notice.success({
                            title: '更新成功'
                        });
                        this.$router.push('/admin/edit/galleryManage')
                    } else {
                        this.$Notice.error({
                            title: '提交失败，请按要求提交'
                        });
                    }
                })
            },
            handleSubmit(name) {
                this.$refs[name].validate(async (valid) => {
                    if (valid) {
                        let author = window.localStorage.getItem('admin')
                        this.formValidate.author = author === 'hyccpq' ? 'Kalecgos' : author
                        let data = this.formValidate
                        await addOneGallery(data)
                        this.$Notice.success({title: '提交成功'});
                        this.$router.push('/admin/edit/galleryManage')
                    } else {
                        this.$Notice.error({
                            title: '提交失败，请按要求提交'
                        });
                    }
                })
            },
            handleReset(name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>

<style scoped lang="stylus">
    .section-edit
        width 100%
        max-width 768px

        .title
            text-align center
            padding 15px 0

    /*@media screen and (max-width: 767px)*/
    /*    .section-edit*/
    /*        width */

</style>
