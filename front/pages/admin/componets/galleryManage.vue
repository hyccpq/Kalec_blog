<template>
    <section class="gallery-manage">
        <h1 class="title">相册管理</h1>
        <ul class="list">
            <li v-if="galleryAll.length" v-for="(item, index) in galleryAll" :key="index">
                <gallery-card :galleryItem="item" :galleryIndex="index"></gallery-card>
            </li>
            <li><router-link to="/admin/edit/galleryManage/addGallery">添加相册</router-link></li>
        </ul>
    </section>
</template>

<script>
    import galleryCard from './plug/galleryCard'
    import { mapState, mapActions } from 'vuex'
    export default {
		name: "galleryManage",
        components: {
			galleryCard
        },
        data () {
		    return {
		    	// galleryAll: []
            }
        },
        methods: {
            ...mapActions(['getAllGallery']),

        },
        computed : {
            ...mapState({
                galleryAll: state => state.galleryAll
            })
        },
        async mounted () {
			await this.getAllGallery()
        }
	}
</script>

<style scoped lang="stylus">
.gallery-manage
    height 100%
    width 100%
    .title
        text-align center
        padding 15px 0
    .list
        display flex
        flex-wrap: wrap
        justify-content space-between

</style>