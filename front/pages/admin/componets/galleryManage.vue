<template>
    <section class="gallery-manage">
        <h1 class="title">相册管理</h1>
        <div class="editor">
            <Button to="/admin/edit/galleryManage/addGallery" size="large" type="info">添加相册</Button>
        </div>

        <ul class="list">
            <li class="list-item" v-if="galleryAll.length" v-for="(item, index) in galleryAll" :key="index">
                <gallery-card :galleryItem="item" :galleryIndex="index" @removeGalleryOne="removeGalleryOne" gallery-conf="?imageView2/1/w/600/h/600/interlace/1/q/75|imageslim"></gallery-card>
            </li>
        </ul>
        <is-remove :is-showlog="isShowRemove" @onChange="showRemove">
            <h3>确定要删除{{removeGalleryInfo.title}}吗？</h3>
            <p>注意：此项操作不可逆，删除后照片一并删除</p>
            <Button size="default" type="warning" @click="galleryRemove">确定</Button>
            <Button size="default" style="margin-left: 8px" @click="showRemove">取消</Button>
        </is-remove>
    </section>
</template>

<script>
    import galleryCard from './plug/galleryCard'
    import isRemove from './plug/modal'
    import { mapState, mapActions } from 'vuex'
    export default {
		name: "galleryManage",
        components: {
			galleryCard, isRemove
        },
        data () {
		    return {
		    	// galleryAll: [],
                isShowRemove: false,
                removeGalleryInfo: {
                	index: 0,
                    id: '',
                    title: ''
                }
            }
        },
        methods: {
            ...mapActions('galleryModule', ['getAllGallery', 'delGallery']),
            showRemove(){
				this.isShowRemove = !this.isShowRemove;
			},
            removeGalleryOne(id, index, title){
            	if(id) {
            		this.removeGalleryInfo = { id, index, title }
            		this.showRemove()
                }
            },
            async galleryRemove() {
                await this.delGallery({
                    id: this.removeGalleryInfo.id,
                    index: this.removeGalleryInfo.index
                })
                this.$Notice.success({
                    title: `删除${this.removeGalleryInfo.title}成功！`
                })
                this.showRemove()
            }
        },
        computed : {
            ...mapState('galleryModule', {
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
    .editor
        width 100%
        display flex
        justify-content flex-end
    .title
        text-align center
        padding 15px 0
    .list
        display flex
        justify-content space-around
        flex-wrap wrap
        list-style-type none
        .list-item
            margin 10px

</style>
