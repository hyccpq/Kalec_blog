<template>
    <div>
        <header>
            <h2>Kalec's Gallery</h2>
            <div>
                <Breadcrumb>
                    <Breadcrumb-item href="/"><Icon type="ios-home-outline"></Icon>HOME</Breadcrumb-item>
                    <Breadcrumb-item href="/components/breadcrumb">相册首页</Breadcrumb-item>
                </Breadcrumb>
            </div>
        </header>
        <section>

        </section>
        <footer>
            <My-footer></My-footer>
        </footer>
    </div>
</template>

<script>
    import {Breadcrumb, BreadcrumbItem} from 'iview'
    import MyFooter from '../plug/footer'

    export default {
        name: "gallery",
        components: {
            Breadcrumb, BreadcrumbItem, MyFooter
        }
    }
</script>

<style scoped>

</style>
