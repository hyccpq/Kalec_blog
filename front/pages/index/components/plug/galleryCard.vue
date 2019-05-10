<template>
    <Card class="card-all" :padding="0">
        <router-link :to="`/admin/edit/galleryPage/${galleryId}/${title}`" class="cover-link">
            <div class="cover-image">
                <div class="cover" v-if="imgPath">
                    <img v-lazy="baseUrl + imgPath" :alt="title" />
                </div>
                <div class="none-cover cover" v-if="!imgPath">
                    <Icon :size="35" type="md-information-circle"/>
                    <span>暂无封面</span>
                </div>
            </div>
        </router-link>
    </Card>
</template>

<script>
    import {Card, Icon} from 'iview'

    export default {
        name: "galleryCard",
        components: {
            Card, Icon
        },
        props: {
            title: {
                type: String,
                require: true
            },
            baseUrl: {
                type: String,
                require: true
            },
            imgPath: {
                type: String
            },
            galleryId: {
                type: String,
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
                width: 100%
                height cover-height

                .cover
                    width: 100%
                    height 100%
                    display flex
                    justify-content center
                    align-items center
                    img
                        max-height 100%
                        max-width 100%

                .none-cover
                    font-size 1.5rem
                    text-align center
                    height cover-height
                    line-height cover-height
                    background-color: #e8eaec;

                    > *
                        vertical-align middle
</style>
