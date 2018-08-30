<template>
    <div id="admin-layout">
        <ad-nav class="admin-nav" @onChangeMenu="showMenu" @onLogOut="showLogOut"></ad-nav>
        <div class="layout">
            <Menu active-name="1-1" theme="dark" :open-names="['1']" class="layout-menu-left" :class="{'layout-menu-left-open' : isShowMenu}" @on-select="onSelectItem">
                <div class="layout-logo-left">主菜单</div>
                <Submenu name="1">
                    <template slot="title">
                        <Icon type="ios-navigate"></Icon>
                        编辑
                    </template>
                    <MenuItem name="1-1">新文章</MenuItem>
                    <MenuItem name="1-2">文章管理</MenuItem>
                </Submenu>
                <Submenu name="2">
                    <template slot="title">
                        <Icon type="ios-keypad"></Icon>
                        管理
                    </template>
                    <MenuItem name="2-1">统计</MenuItem>
                    <MenuItem name="2-2">日志</MenuItem>
                    <MenuItem name="2-3">账号管理</MenuItem>
                </Submenu>
                <Submenu name="3">
                    <template slot="title">
                        <Icon type="ios-analytics"></Icon>
                        相册管理
                    </template>
                    <MenuItem name="3-1">相册信息编辑</MenuItem>
                    <MenuItem name="3-2">相册管理</MenuItem>
                </Submenu>
            </Menu>


            <div class="layout-content">
                <div class="layout-content-main">
                    <router-view></router-view>
                </div>
                <div class="layout-copy">
                    2016-2018 &copy; 冰空的作品展示
                </div>
            </div>


        </div>
        <log-out :is-showlog="isShowLogOut" @onChange="showLogOut">
            <h3>确定登出？</h3>
            <Button size="default" type="warning" @click="adLogOut">确定</Button>
            <Button size="default" style="margin-left: 8px" @click="showLogOut">取消</Button>
        </log-out>
    </div>
</template>

<script>
	import { Row,Col,Menu,Submenu,MenuItem,Icon } from 'iview'
	import adNav from './plug/nav'
	import logOut from './plug/login'
	export default {
		name: "admin",
		components:{
			Row,Col,Menu,Submenu,MenuItem,Icon,adNav,
			logOut
		},
		data(){
			return {
				isShowMenu: false,
				isShowLogOut: false,
			}
		},
		methods:{
			showMenu(){
				this.isShowMenu = !this.isShowMenu;
			},
			closeMenu(){
				this.isShowMenu = false;
			},
			showLogOut(){
				this.isShowLogOut = !this.isShowLogOut;
			},
			async adLogOut(){
				await this.$store.dispatch('logOut');
				this.showLogOut();
				this.$router.push('/admin/login');
				this.$Notice.success({
					title:'登出成功！'
				})
			},
			onSelectItem(name){
				switch (name) {
                    case '1-1':
                    	this.$router.push('/admin/edit/write');
                    	break
                    case  '1-2':
                    	this.$router.push('/admin/edit/articleManage');
                    	break
                    case '3-1':
                    	this.$router.push('/admin/edit/galleryManage/addGallery')
                        break
                    case '3-2':
                    	this.$router.push('/admin/edit/galleryManage')
                        break
				}

			}
		}
	}
</script>

<style scoped lang="stylus">
    #admin-layout
        .admin-nav
            width: 100%
            position fixed
            top 0
            z-index 2000
        .layout
            padding-top 60px
            box-sizing border-box
            background #f5f7f9
    @media screen and (max-width: 1023px)
        #admin-layout
            .layout
                .layout-menu-left
                    position fixed
                    left 0
                    top 0
                    bottom 0
                    padding-top 60px
                    -webkit-transform: translateX(-240px)
                    -moz-transform: translateX(-240px)
                    -ms-transform: translateX(-240px)
                    -o-transform: translateX(-240px)
                    transform: translateX(-240px)
                    -webkit-transition: transform 0.5s
                    -moz-transition: transform 0.5s
                    -ms-transition: transform 0.5s
                    -o-transition: transform 0.5s
                    transition: transform 0.5s
                    overflow-x hidden
                    overflow-y auto
                .layout-menu-left-open
                    -webkit-transform: translateX(0px)
                    -moz-transform: translateX(0px)
                    -ms-transform: translateX(0px)
                    -o-transform: translateX(0px)
                    transform: translateX(0px)
                    -webkit-transition: transform 0.5s
                    -moz-transition: transform 0.5s
                    -ms-transition: transform 0.5s
                    -o-transition: transform 0.5s
                    transition: transform 0.5s
    @media screen and (max-width: 767px)
        #admin-layout
            .layout
                .layout-content
                    .layout-content-main
                        height auto
</style>

<style scoped lang="stylus">
    #admin-layout {
        height: 100%;
    }
    .layout {
        background: #f5f7f9;
        display: flex;
        height: 100%;
    }

    .layout-content {
        width: 100%;
        min-height: 200px;
        margin: 5px;
        overflow: auto;
        background: #fff;
        border-radius: 4px;
    }

    .layout-content-main {
        height: 95%;
    }

    .layout-copy {
        height: 5%;
        text-align: center;
        line-height: 40px;
        box-sizing: border-box;
        color: #9ea7b4;
    }

    .layout-menu-left {
        background: #464c5b;
        height:100%;
        z-index: 1600;
    }

    .layout-header {
        height: 60px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
    }

    .layout-logo-left {
        width: 90%;
        height: 20px;
        color: #ffe3b4;
        text-align: center;
        margin: 15px auto;
    }
</style>
