<template>
<div>
  <iMenu mode="horizontal" :theme="'dark'" id="nav" @on-select="onSelect">
    <iMenuItem name="-1" class="nav-menu-button">
      <Icon class="icon-menu" type="android-menu" size="30" color="#1E1E1E"></Icon>
    </iMenuItem>
    <iMenuItem name="0" class="nav-title">
      <div>冰空的作品展示</div>
    </iMenuItem>
    <div class="set-center"></div>
    <Row type="flex" justify="end" class="code-row-bg">
      <iMenuItem name="1">
        <router-link to="/index">
          <div><Icon type="ios-home-outline"></Icon>
            首页</div>
        </router-link>
      </iMenuItem>
      <iMenuItem name="2">
        <div><Icon type="ios-photos-outline"></Icon>
          相册</div>
      </iMenuItem>
      <Submenu name="3">
        <template slot="title">
          <Icon type="ios-pricetags-outline"></Icon>
          分类
        </template>
        <iMenuItem :name="`3-${item}`" v-for="(item , i) in tagAndClassicList" :key="i">{{item}}</iMenuItem>

      </Submenu>
      <iMenuItem name="4">
        <div @click.prevent="open">
          <Icon type="log-in"></Icon>&nbsp;&nbsp;
          登陆
        </div>
      </iMenuItem>
      <iMenuItem name="6"><Icon type="log-in"></Icon> 关于我 </iMenuItem>
    </Row>

  </iMenu>
</div>
</template>

<script>
  import { Menu,Row,Icon,MenuItem,Submenu } from 'iview'
  import { mapState } from 'vuex'
  export default {
    name: "my-nav",
    components:{
      iMenu:Menu,
      Row,
      Icon,
      iMenuItem:MenuItem,
      Submenu
    },
    props:{
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
    computed:{
      ...mapState({
        tagAndClassicList: state => state.tagAndClassicList.classic
      })
    },
    methods:{
      onSelect(name){
        if(name === '-1'){
          this.$emit('showSideBox');
        }
        // console.log(name);
        if(name === '0'){
          this.$router.push('/index');
        }
        if(name.split('-')[0]==3){
          this.$router.push(`/classic/${name.split('-')[1]}/1`)
        }
        if(name === '2'){
          this.$Notice.warning({
            title: '抱歉',
            desc: '施工中，敬请期待~'
          })
        }
      },
      open(){
        this.$emit('onChange');
      }
    }
  }
</script>

<style scoped lang="stylus">
#nav
  -webkit-backdrop-filter blur(5px)
  backdrop-filter blur(5px)
  width: 100%;
  background: rgba(0, 0, 0, 0.50)
  .nav-title
    height: 60px
    color: #00deff
    font-size 18px
  .nav-menu-button
    display: none;
  .set-center
    display none
@media screen and (max-width: 1118px)
  #nav
    background: rgba(230, 230, 230, 0.35)
    display flex
    justify-content space-between
    align-items center
    .nav-title
      color: #191919
    .nav-menu-button
      display: flex
      align-self center
    .set-center
      display block
      width: 58px
      visibility hidden
    .code-row-bg
      display none
</style>
