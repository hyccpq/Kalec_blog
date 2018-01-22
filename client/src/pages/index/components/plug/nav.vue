<template>
  <Menu mode="horizontal" :theme="'dark'" id="nav" @on-select="onSelect">
    <MenuItem name="-1" class="nav-menu-button">
      <div><Icon class="icon-menu" type="navicon-round" size="25"></Icon></div>
    </MenuItem>
    <MenuItem name="0" class="nav-title">
      <div style="height: 60px; color: aqua ">冰空的作品展示</div>
    </MenuItem>
    <div class="set-center"></div>
    <Row type="flex" justify="end" class="code-row-bg">
      <MenuItem name="1">
          <router-link to="/index">
            <div><Icon type="ios-home-outline"></Icon>
          首页</div>
          </router-link>
      </MenuItem>
      <MenuItem name="2">
          <div><Icon type="ios-photos-outline"></Icon>
          相册</div>
      </MenuItem>
      <Submenu name="3">
          <template slot="title">
              <Icon type="ios-pricetags-outline"></Icon>
              分类
          </template>
          <MenuGroup title="使用">
              <MenuItem name="3-1">新增和启动</MenuItem>
              <MenuItem name="3-2">活跃分析</MenuItem>
              <MenuItem name="3-3">时段分析</MenuItem>
          </MenuGroup>
          <MenuGroup title="留存">
              <MenuItem name="3-4">用户留存</MenuItem>
              <MenuItem name="3-5">流失用户</MenuItem>
          </MenuGroup>
      </Submenu>
      <MenuItem name="4" v-if="!showLog"><div @click.prevent="open">
        <Icon type="log-in"></Icon>&nbsp;&nbsp;
        登陆 </div></MenuItem>

      <Submenu v-if="showLog" name="5">
          <template slot="title">
              <Icon type="ios-pricetags-outline"></Icon>
               {{username}}
          </template>
          <MenuGroup title="管理">
              <MenuItem name="5-1"><router-link to="/admin"><div>管理</div></router-link></MenuItem>
          </MenuGroup>
        <MenuGroup title="操作">
              <MenuItem name="5-4"><div @click="logOut">登出</div></MenuItem>
              <MenuItem name="5-5"><div>关于</div></MenuItem>
          </MenuGroup>
      </Submenu>
      <MenuItem name="6"><Icon type="log-in"></Icon> 关于我 </MenuItem>
    </Row>

    </Menu>
</template>

<script>
  export default {
    name: "my-nav",
    props:{
      showLog:{
        type:Boolean,
        default:false
      },
      username:{
        type:String,
        default:''
      }
    },
    data () {
      return {
        theme1: 'light',
      }
    },
    // computed:{
    //   ...mapState({
    //     tagList: state => state.indexPageList.tagList
    //   })
    // },
    methods:{
      onSelect(name){
        if(name === '-1'){
          this.$emit('showSideBox');
        }
      },
      open(){
        this.$emit('onChange');
      },
      logOut(){
        localStorage.clear();

        this.$emit('log-out');
      },

    }
  }
</script>

<style scoped lang="stylus">
#nav
  .nav-menu-button
    display: none;
  .set-center
    display none
@media screen and (max-width: 1118px)
  #nav
    display flex
    justify-content space-between
    align-items center
    .nav-menu-button
      display: block
      align-self flex-start
    .set-center
      display block
      width: 58px
      visibility hidden
    .code-row-bg
      display none
</style>
