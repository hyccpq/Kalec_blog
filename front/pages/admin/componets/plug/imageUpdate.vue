<template>
    <div @dragenter="">
        <Form :model="formData" :label-width="80" label-position="right">
            <FormItem label="照片名称">
                <Input v-model="formData.imageName" placeholder="请输入本组照片名称" size="default" />
            </FormItem>
            <FormItem label="照片描述">
                <Input v-model="formData.imageDesc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入本组照片的描述" size="default" />
            </FormItem>
            <FormItem>
                <Button @click="fileSelect" type="primary" shape="circle" icon="md-add" size="default">
            点击添加照片
                </Button>
            </FormItem>


        </Form>

        <input type="file" ref="fileUpdate" v-show="false" multiple @change="addUpdateImage">
    </div>
</template>

<script>
    import {Input, Form, FormItem} from 'iview'
	export default {
		name: "imageUpdate",
        components: {
			Input, Form, FormItem
        },
        data () {
			return {

				formData: {
					imageName: '',
					imageDesc: ''
                },

            }
        },
        methods: {
			fileSelect() {
				this.$refs.fileUpdate.click()
            },
            addUpdateImage(ev) {
				let files = ev.target.files
                this.$emit('updateImageList', {
                	files,
                    formData: this.formData
                })
            }
        }
	}
</script>

<style scoped>

</style>
