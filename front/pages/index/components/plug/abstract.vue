<template>
  <div id="all">
    <div class="active-cover" v-show="isShow" @click="$emit('closeSide')"></div>
    <div id="abstract" class="right-content" :class="{'right-open' : isShow}">
      <div class="main">
        <div class="my-icon row"></div>
        <div class="my-name row"><router-link to="/">Kalecgos</router-link></div>
        <div class="my-content row">
          <a href="http://weibo.com/kalecgos" title="微博"><div class="some-contents icon1"></div></a>
          <a href="https://github.com/hyccpq" title="GitHub"><div class="some-contents icon2"></div></a>
          <a href="mailto:hyccpq@hotmail.com" title="邮件"><div class="some-contents icon3"></div></a>
          <a href="https://twitter.com/hyccpq" title="Twitter"><div class="some-contents icon4"></div></a>
        </div>
        <div class="my-tag-title row">全部标签</div>
        <ul class="my-tag row">
          <li v-for="(item, key) in tagAndClassicList" :key="key">
            <Tag :tag-name="item.tagName"></Tag>
          </li>
        </ul>
        <div class="my-notice">提示：站长回复请认准<div class="verify"></div>标志</div>
      </div>
      <iAffix :offset-top="120" v-if="isShowToggle">
        <article-toggle class="new-toggle"></article-toggle>
      </iAffix>
    </div>

  </div>

</template>

<script>
  import articleToggle from './articleToggle'
  import { Affix,Icon } from 'iview'
  import Tag from './Tag'
  import { mapState } from 'vuex'
	export default {
		name: "abstract",
    components:{
		  articleToggle,
      iAffix: Affix,
      Icon,
      Tag,
    },
    data(){
		  return {
		    isShowToggle:false,
      }
    },
    props:{
		  isShow:{
		    default:false,
        type:Boolean
      }
    },
    watch:{
		  '$route'(){
        this.isShowToggle = this.$route.params.id  ? true : false;
      }
    },
    computed:{
      ...mapState({
        tagAndClassicList: state => state.tagAndClassicList.tags
      })
    },
    beforeMount(){
		  this.isShowToggle = this.$route.params.id ? true : false;
    },
    preFetch(store){
	    this.isShowToggle = store.state.route.params.id ? true : false;
	    return store.dispatch('getAllTagClassic')
    }
	}
</script>

<style scoped lang="stylus">
#all
  padding 20px 0
  .new-toggle
    width 300px
    border none
    background #fbfbfb
    border-radius 5px
    box-shadow 0 0 2px 2px rgba(27, 31, 35, 0.1)
  .active-cover
    height 100%
    width 100%
    position fixed
    left 0
    top 0
    background rgba(8, 8, 8, 0.47)
    z-index 20
  #abstract
    .main
      width: 300px
      min-height: 700px
      background: #a9a58e
      overflow hidden
      box-shadow 0 0 2px 2px rgba(27, 31, 35, 0.5)
      border-radius 2px
      z-index 50
      margin-bottom 10px
      .row
        display flex
      .my-icon
        width 180px
        height 180px
        -webkit-border-radius 50%
        -moz-border-radius 50%
        border-radius 50%
        background url("../../assets/img/myicon.jpg") center no-repeat
        background-size 120%
        margin 40px auto
      .my-name
        justify-content center
        margin 0 auto
        font-size 1.5em
      .my-tag-title
        justify-content center
      .my-tag
        margin 10px 30px 10px 30px
        flex-wrap wrap
      .my-notice
        color #a43b01
        display flex
        margin 10px 30px 50px 30px
      .my-content
        justify-content space-around
        margin 15px auto
        .some-contents
          margin 5px 0
          width 40px
          height 40px
          background-size 100%
        .icon1
          background url("../../assets/svg/weibo.svg") no-repeat center
        .icon2
          background url("../../assets/svg/github.svg") no-repeat center
        .icon3
          background url("../../assets/svg/email.svg") no-repeat center
        .icon4
          background url("../../assets/svg/twitter.svg") no-repeat center
@media screen and (max-width: 1118px)
  #all
    padding 0
    .new-toggle
      background #a9a58e
      border none
      border-radius 0
    #abstract
      height auto
      overflow auto
      min-height: 300px
      border-radius 0
      background #a9a58e
      .main
        min-height: 500px
        box-shadow none
        margin-top 60px
        .my-tag
          margin 10px 30px
        .my-notice
          color #a43b01
          display flex
          margin 10px 30px 10px 30px
    .right-content
      position fixed
      left 0
      top 0
      bottom 0
      transform: translateX(-310px)
      transition: transform 0.4s
      overflow-x hidden
      overflow-y auto
      z-index 30
    .right-open
      transform: translateX(0px)
      -o-transition: transform 0.4s
      transition: transform 0.4s
</style>
