<template>
    <div>
        <iMenu mode="horizontal" theme="dark" id="nav"
               :class="isShowNavBgc && !isShowSideBox ? 'nav-show-blur': 'all-nav'" @on-select="onSelect">
            <iMenuItem name="-1" class="nav-menu-button">
                <Icon class="icon-menu" type="md-menu" size="24" color="#343739"></Icon>
            </iMenuItem>
            <iMenuItem name="0" class="nav-title">
                <div>{{title}}</div>
            </iMenuItem>
            <div class="set-center"></div>
            <Row type="flex" justify="end" class="code-row-bg">
                <iMenuItem name="1" class="nav-menu-text">
                    <router-link to="/index">
                        <div>
                            <Icon type="md-home"></Icon>
                            首页
                        </div>
                    </router-link>
                </iMenuItem>
                <iMenuItem name="2" class="nav-menu-text">
                    <div>
                        <Icon type="md-photos"></Icon>
                        相册
                    </div>
                </iMenuItem>
                <Submenu name="3" class="nav-menu-text">
                    <template slot="title">
                        <Icon type="md-pricetag"></Icon>
                        分类
                    </template>
                    <iMenuItem :name="`3-${item}`" v-for="(item , i) in tagAndClassicList" :key="i">{{item}}</iMenuItem>

                </Submenu>
                <iMenuItem name="4" class="nav-menu-text">
                    <div @click.prevent="open">
                        <Icon type="md-log-in"></Icon>&nbsp;&nbsp;
                        登陆
                    </div>
                </iMenuItem>
                <iMenuItem name="6" class="nav-menu-text">
                    <Icon type="md-person"></Icon>
                    关于我
                </iMenuItem>
            </Row>

        </iMenu>
    </div>
</template>

<script>
    import {Menu, Row, Icon, MenuItem, Submenu} from 'iview'
    import {mapState} from 'vuex'
    import { BLOG_TITLE } from "../../../../utils/util";

    export default {
        name: "my-nav",
        components: {
            iMenu: Menu,
            Row,
            Icon,
            iMenuItem: MenuItem,
            Submenu
        },
        props: {
            username: {
                type: String,
                default: ''
            },
            isShowSideBox: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
              title: BLOG_TITLE,
                theme1: 'light',
                height: 0,
                isShowNavBgc: true
            }
        },
        mounted() {
            window.addEventListener('scroll', this.windScroll)
            // window.onscroll = () => {
            //
            // }
        },
        destroyed() {
            window.removeEventListener('scroll', this.windScroll)
        },
        computed: {
            ...mapState({
                tagAndClassicList: state => state.tagAndClassicList.classic
            })
        },
        methods: {
            windScroll() {
                this.height = document.documentElement.scrollTop || document.body.scrollTop
                // console.log(this.height)
                this.isShowNavBgc = (this.height <= 0)
            },
            onSelect(name) {
                if (name === '-1') {
                    this.$emit('showSideBox');
                }
                // console.log(name);
                if (name === '0') {
                    this.$router.push('/index');
                }
                if (name.split('-')[0] == 3) {
                    this.$router.push(`/classic/${name.split('-')[1]}/1`)
                }
                if (name === '2') {
                    this.$Notice.warning({
                        title: '抱歉',
                        desc: '施工中，敬请期待~'
                    })
                }
            },
            open() {
                this.$emit('onChange');
            }
        }
    }
</script>

<style scoped lang="stylus">


    #nav
        width: 100%;
        background: rgba(0, 0, 0, 0.50)
        transition .5s

        .nav-title
            height: 60px
            color: #2bc9ff
            text-shadow: 0 0.02rem white, 0.02rem 0 white, -0.02rem 0 white, 0 -0.02rem white;
            font-size 1rem
            font-weight bolder

        .nav-menu-button
            display: none;

        .set-center
            display none

    @media screen and (max-width: 1118px)
        #nav
            background: rgba(230, 230, 230, 0.75)
            display flex
            justify-content space-between
            align-items center

            .nav-title
                color: #191919
            .nav-menu-button
                display: flex

                .icon-menu
                    justify-self center
                    align-self center
                    /*height 36px*/

            .set-center
                display block
                width: 70px
                visibility hidden

            .code-row-bg
                display none

    #nav.nav-show-blur
        position relative
        //overflow hidden
        background-color: transparent;
    #nav.nav-show-blur::after
        position absolute
        content ''
        top 0
        bottom 0
        left 0
        right 0
        z-index -1
        background: url("../../assets/img/cover-s.jpg") no-repeat top center
        background-size: cover;
        filter blur(15px)
</style>
