<template>
  <div id="index-content">
    <loading :onLoading="onLoading"></loading>
    <el-nav @onChange="changeLog" @log-out="closeShowLog" :show-log="showLog" :username="username" class="my-nav" @showSideBox="showSideBox"></el-nav>
    <login-form :is-showlog="isShowlog" @onChange="changeLog">
      <!--<on-form @has-log="hasLog"></on-form>-->暂只允许站长<a href="/admin">登录</a>
    </login-form>
    <cover-image class="cover"></cover-image>
    <div class="all-content">

      <div class="left-content">
        <transition name="router-transition" mode="out-in">
          <router-view class="router"></router-view>
        </transition>
      </div>
      <abstract class="right-content" :class="{'right-open' : isShowSideBox}"></abstract>
    </div>
    <my-footer class="content-footer"></my-footer>
  </div>
</template>

<script>
import abstract from './plug/abstract'
import myFooter from './plug/footer'
import coverImage from './plug/coverImage'
import elNav from '../components/plug/nav'
import loginForm from '../components/plug/login'
// import onForm from '../components/plug/form'
import loading from './plug/Loading'
import {mapState} from 'vuex'
export default {
  name: "index",
  components:{
    abstract,
    myFooter,
    coverImage,
    elNav,
    loginForm,
    // onForm,
    loading
  },
  data(){
    return {
      isShowlog:false,
      showLog:false,
      username:'',
      isShowSideBox:false,
      transitionName:'side-right'
    }
  },
  computed:{
    ...mapState({
      onLoading:state => state.onLoading
    })
  },
  methods:{
    showSideBox(){
      this.isShowSideBox = !this.isShowSideBox;
      // console.log(this.isShowSideBox);
    },
    closeSideBox(){
      this.isShowSideBox = false;
    },
    changeLog(){
      this.isShowlog = !this.isShowlog;
    },
    closeShowLog(){
      this.showLog = false;
      location.reload();
    },
    hasLog(){
      this.username = localStorage.getItem('admin');
      if(this.username){
        this.showLog = true;
        this.isShowlog = false;
      } else {
        localStorage.clear();
      }
    },
  },
  mounted(){
    this.hasLog();

  }
}
</script>

<style scoped>
  .router {
    /*position: absolute;*/
    width: inherit;
    transition: all .4s ease;
  }
  .router-transition-enter{
    opacity: 0;
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
  }
  .router-transition-leave-active{
    opacity: 0;
    -webkit-transform: translate(-100%, 0);
    transform: translate(-100% 0);
  }
</style>

<style scoped lang="stylus">
#index-content
  padding-top 60px
.all-content
  width 1100px
  min-height 800px
  margin 0 auto
  display flex
  align-items flex-start
  .left-content
    width 768px
    margin-right 20px
    min-height 200px
@media screen and (max-width: 1118px)
  #index-content
    .all-content
      width: 100%
      .left-content
        width 100%
        margin 0
        padding 5px
      .right-content
        position fixed
        left 0
        top 60px
        bottom 0
        -webkit-transform: translateX(-330px)
        -moz-transform: translateX(-330px)
        -ms-transform: translateX(-330px)
        -o-transform: translateX(-330px)
        transform: translateX(-330px)
        -webkit-transition: transform 0.5s
        -moz-transition: transform 0.5s
        -ms-transition: transform 0.5s
        -o-transition: transform 0.5s
        transition: transform 0.5s
        overflow-x hidden
        overflow-y auto

      .right-open
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
</style>
