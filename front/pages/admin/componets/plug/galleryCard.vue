<template>
    <Card class="card-all" :padding="0">
        <router-link :to="`/admin/edit/galleryPage/${galleryItem._id}/${galleryItem.title}`" class="cover-link">
            <div class="cover-image">
                <div class="cover" v-if="galleryItem.coverImgPath"><img class="cover-image-show"
                                                                        :src="galleryItem.url + '/' + galleryItem.coverImgPath + galleryConf"
                                                                        :alt="galleryItem.title"
                ></div>
                <!--                <div class="none-cover cover" v-if="galleryItem.coverImgPath">-->
                <!--                    <img :src="galleryItem.coverImgPath" alt="">-->
                <!--                </div>-->
                <div class="none-cover cover" v-if="!galleryItem.coverImgPath">
                    <Icon :size="35" type="md-information-circle"/>
                    <span>暂无封面</span>

                </div>
            </div>
        </router-link>

        <div class="content">
            <h3 class="cov-title">{{galleryItem.title}}</h3>
            <div class="auth-opert">
                <p class="author">{{galleryItem.author}}</p>
                <Poptip placement="bottom" :transfer="false" class="operating">
                    <Button size="small" type="primary">操作</Button>
                    <div class="api" slot="content">
                        <h3>操作选项</h3>
                        <Button size="small" type="info"
                                :to="`/admin/edit/galleryPage/${galleryItem._id}/${galleryItem.title}`"
                        >
                            上传照片
                        </Button>
                        <Button size="small" type="warning"
                                :to="`/admin/edit/galleryManage/editGallery/${galleryItem._id}/${galleryIndex}/${galleryItem.title}`"
                        >
                            修改相册
                        </Button>
                        <Button size="small"
                                type="success"
                                @click="updateShow(galleryItem._id, galleryItem.show, galleryIndex)"
                                v-if="!galleryItem.show">
                            相册上线
                        </Button>
                        <Button size="small"
                                @click="updateShow(galleryItem._id, galleryItem.show, galleryIndex)"
                                v-else>
                            相册下线
                        </Button>
                        <Button size="small"
                                type="error"
                                @click="deleteGallery(galleryItem._id, galleryIndex, galleryItem.title)">
                            删除相册
                        </Button>
                    </div>
                </Poptip>
                <!--<a href="javascript:void 0">操作</a>-->
            </div>
            <p class="desc">{{galleryItem.description}}</p>

        </div>

    </Card>
</template>

<script>
    import {Card, Icon, Poptip} from 'iview'
    import {mapActions} from 'vuex'

    export default {
        name: "galleryCard",
        components: {
            Card, Icon, Poptip
        },
        props: {
            galleryItem: {
                type: Object,
                default: {}
            },
            galleryIndex: {
                type: Number,
                default: 0
            },
            galleryConf: {
                type: String,
                default: ''
            }
        },
        methods: {
            ...mapActions('galleryModule', ['putGalleryShow']),
            updateShow(id, show, index) {
                show = show === 1 ? 0 : 1
                this.putGalleryShow({id, show, index})
            },
            deleteGallery(id, index, title) {
                this.$emit('removeGalleryOne', id, index, title)
            }
        }
    }
</script>

<style scoped lang="stylus">
    cover-height = 300px
    .card-all
        width cover-height

        .content
            padding 5px 10px

            .auth-opert
                &:after
                    display block
                    content: ''
                    clear: both
                    visibility hidden
                    height 0

                .author
                    float left

                .operating
                    float right

        .cover-link
            color #505a6d

            .cover-image
                overflow hidden
                width: 100%
                height cover-height
                display flex
                justify-content center
                align-items center
                background-color: #e8eaec;

                .cover
                    width: 100%


                .cover-image-show
                    width 100%

                .none-cover
                    font-size 1.5rem
                    text-align center

                    > *
                        vertical-align middle

</style>
