<template>
    <div>
        <header>
            <h2>Kalec's Gallery</h2>
            <div>
                <Breadcrumb>
                    <Breadcrumb-item><router-link to="/"><Icon type="ios-home-outline"></Icon>HOME</router-link></Breadcrumb-item>
                    <Breadcrumb-item>相册首页</Breadcrumb-item>
                </Breadcrumb>
            </div>
        </header>
        <section>
            <Gallery-card :title="'测试标题'" base-url="https://farm6.staticflickr.com/5591" gallery-id="15008867125_68a8ed88cc_m.jpg" img-path="15008867125_68a8ed88cc_m.jpg"></Gallery-card>
        </section>
        <footer>
            <My-footer></My-footer>
        </footer>
    </div>
</template>

<script>
    import {Breadcrumb, BreadcrumbItem, Icon} from 'iview'
    import MyFooter from '../plug/footer'
    import GalleryCard from '../plug/galleryCard'

    export default {
        name: "gallery",
        metaInfo: {
			title: ' Kalec的个人相册',
            titleTemplate: '%s - 冰空的作品展示'
        },
        components: {
            Breadcrumb, BreadcrumbItem, MyFooter, GalleryCard, Icon
        }
    }
</script>

<style scoped>

</style>
