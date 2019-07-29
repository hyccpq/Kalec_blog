<template>
    <div id="index-content">
        <loading :onLoading="onLoading"></loading>
        <el-nav @onChange="changeLog" class="my-nav" @showSideBox="showSideBox"></el-nav>
        <login-form :is-showlog="isShowlog" @onChange="changeLog" class="goto-notice">
            <!--<on-form @has-log="hasLog"></on-form>-->暂只能站长登录，<a class="goto-admin" href="/admin/" target="_blank">点击登录</a>
        </login-form>
        <cover-image class="cover"></cover-image>
        <section class="all-content">

            <div class="left-section">
                <transition name="router-transition" mode="out-in">
                    <router-view class="router"></router-view>
                </transition>
            </div>
            <abstract :is-show="isShowSideBox" @closeSide="showSideBox"></abstract>
        </section>
        <my-footer class="content-footer"></my-footer>
        <to-top class="content-to-top"></to-top>
    </div>
</template>

<script>
    import toTop from './plug/goTop'
    import abstract from './plug/abstract'
    import myFooter from './plug/footer'
    import coverImage from './plug/coverImage'
    import elNav from '../components/plug/nav'
    import loginForm from '../components/plug/login'
    import loading from './plug/Loading'
    import {Button} from 'iview'
    import {mapState} from 'vuex'

    export default {
        name: "index",
        components: {
            abstract,
            myFooter,
            coverImage,
            elNav,
            loginForm,
            iButton: Button,
            // onForm,
            loading,
            toTop
        },
        data() {
            return {
                isShowlog: false,
                showLog: false,
                username: '',
                isShowSideBox: false,
                transitionName: 'side-right',
                timer: 0
            }
        },
        computed: {
            ...mapState({
                onLoading: state => state.onLoading
            })
        },
        methods: {
            showSideBox() {
                this.isShowSideBox = !this.isShowSideBox;
                //解决移动端滚动穿透问题
                let touchScroll = document.querySelector('html');
                if (this.isShowSideBox) {
                    touchScroll.className = 'touch-move';
                } else {
                    touchScroll.className = '';
                }
            },
            changeLog() {
                this.isShowlog = !this.isShowlog;
            },
            debounce() {
                clearTimeout(this.timer)
                this.timer = setTimeout(() => {
                    this.listenScroll()
                }, 100)
            },
            listenScroll() {
                this.$store.commit('update_scroll_top', this.$getScrollTop())
            }
        },
        preFetch(store) {
            return store.dispatch('getAllTagClassic');
        },
        beforeMount() {
            this.$store.dispatch('getAllTagClassic');
        },
        mounted() {
            this.$Notice.config({
                top: 80,
                duration: 3
            });

            window.addEventListener('scroll', this.debounce)
        },
        beforeDestroy() {
            window.removeEventListener('scroll', this.debounce)
        }
    }
</script>

<style scoped lang="stylus">
    .router {
        /*position: absolute;*/
        width: inherit;
        transition: all .3s ease;
    }

    .router-transition-enter {
        -webkit-transform: translateX(100%);
        transform: translateX(100%);
        opacity 0
    }

    .router-transition-leave-to {
        -webkit-transform: translateX(-100%);
        transform: translateX(-100%);
        opacity 0
    }
</style>

<style scoped lang="stylus">
    #index-content
        background-color: #f5eedd;
        background-attachment: fixed;
        background-image: url('../assets/svg/vectorpaint.svg');

        .content-to-top
            position fixed
            bottom 80px
            right 80px

        .my-nav
            position: fixed
            top: 0
            width: 100%
            z-index: 2000

        .goto-notice
            text-align center

            .goto-admin
                text-decoration underline
                color: blue
                line-height 40px

        .all-content
            width 100%
            min-height 800px
            display flex
            align-items flex-start
            justify-content center
            padding 0 40px

            .left-section
                /*width 1366px*/
                flex 1
                margin 20px 20px 20px 0
                min-height 200px

    @media screen and (min-width: 1920px)
        #index-content
            .all-content
                margin 0 auto
                width 100%
                .left-section
                    flex 0
                    width 1366px
                    padding 0 16px

    // background-color: rgba(100, 100, 100, 0.2);
    @media screen and (max-width: 1118px)

        #index-content
            .content-to-top
                bottom 60px
                right 20px

            .all-content
                width: 100%
                padding 0

                .left-section
                    width 100%
                    margin 0
                    padding 0 16px

</style>
