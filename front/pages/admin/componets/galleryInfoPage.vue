<style scoped lang="stylus">
.gallery-info
    .gallery-title
        text-align center
    .list
        display flex
        .item
            margin 5px
            cursor pointer
            .item-card
                width: 300px
                height: 300px
                overflow hidden
                font-size 15px
                >*
                    height: 100%;
</style>

<template>
    <section class="gallery-info">
        <h1 class="gallery-info-title">{{$route.params.title}}相册 照片编辑</h1>
        <ul class="list">
            <li class="item" v-for="(item, index) in imagesListInfo.images"
                :key="index">
                <Card class="item-card" :padding="0">
                    <image-card :img-uri="imagesListInfo.url + '/' + item.imagePath"
                                :font-size="15"
                                :update-time="item.updateTime"
                                :image-name="item.imageName"
                                :image-desc="item.imageDesc"
                    />
                    <!--<img :src="imagesListInfo.url + '/' + item.imagePath" alt="" width="300">-->
                </Card>

            </li>
            <li class="item">
                <Card class="item-card" :padding="0" >
                    <addImg></addImg>
                </Card>
            </li>
        </ul>


    </section>
</template>

<script>
    import { mapActions, mapState } from 'vuex'
    import addImg from './plug/addImg'
    import imageCard from './plug/imageCard'
    import {Card} from 'iview'
	export default {
		name: "galleryInfoPage",
        components: {
			addImg, Card, imageCard
        },
        data() {
			return {
                updateImagesInfo: [],
            }
        },
        computed: {
            ...mapState({
                imagesListInfo: state => state.imagesListInfo
            }),
        },
        methods: {
            ...mapActions(['getImageList']),
        },
        mounted () {
			this.getImageList(this.$route.params.id)
        }
	}
</script>

