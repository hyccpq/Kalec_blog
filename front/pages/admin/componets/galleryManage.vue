<template>
    <section>
        <ul>
            <li v-if="galleryAll.length" v-for="(item, index) in galleryAll" :key="index">
                {{item}}
            </li>
            <li><router-link to="/admin/edit/galleryManage/addGallery">添加相册</router-link></li>
        </ul>
    </section>
</template>

<script>
	export default {
		name: "galleryManage",
        data () {
		    return {
		    	galleryAll: []
            }
        },
        async mounted () {
			try {
                let res = await this.axios.get('/gallery/v0/adSearchAllGallery')
                    console.log(res);
                this.galleryAll = res.data.data
			} catch (e) {
                console.log(e);
			}
        }
	}
</script>

<style scoped>

</style>