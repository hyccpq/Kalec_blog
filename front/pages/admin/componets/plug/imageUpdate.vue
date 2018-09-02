<template>
    <div>
        <div @click="fileSelect">
            点击添加照片
        </div>
        <input type="file" ref="fileUpdate" v-show="false" multiple @change="addUpdateImage">
    </div>
</template>

<script>
	export default {
		name: "imageUpdate",
        methods: {
			fileSelect() {
				this.$refs.fileUpdate.click()
            },
            addUpdateImage(ev) {
				let files = ev.target.files
                this.$emit('updateImageList', files)
            }
        }
	}
</script>

<style scoped>

</style>