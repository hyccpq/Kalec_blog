<template>
  <div id="all">
    <div class="active-cover" v-show="isShow" @click="$emit('closeSide')"></div>
    <div id="abstract" class="right-content" :class="{'right-open' : isShow}">
      <!--<div style="width: 300px;height: 50px;"></div>-->

      <!--<audio :src="src_music" controls></audio>-->
      <iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=300 height=52 src="//music.163.com/outchain/player?type=3&id=1367121473&auto=1&height=32"></iframe>
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
        <li v-for="item in tagAndClassicList">
            <Tag :tag-name="item.tagName"></Tag>
        </li>
      </ul>
      <div class="my-notice">提示：站长回复请认准<div class="verify"></div>标志</div>
      <Affix :offset-top="120" v-if="isShowToggle">
        <article-toggle class="new-toggle"></article-toggle>
      </Affix>
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
      Affix,
      Icon,
      Tag
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
    mounted(){
		  this.isShowToggle = this.$route.params.id ? true : false;
    }
	}
</script>

<style scoped lang="stylus">
#all
  .active-cover
    height 100%
    width 100%
    position fixed
    left 0
    top 0
    background rgba(8, 8, 8, 0.47)
    z-index 20
  #abstract
    width: 300px
    min-height: 700px
    background: #a9a58e
    overflow hidden
    box-shadow -2px 2px 2px rgba(27, 31, 35, 0.58)
    z-index 50
    .new-toggle
      width 300px
      border 1px solid #f0e5e7
      border-radius 5px
      background white
    .row
      display flex
    .my-icon
      width 180px
      height 180px
      -webkit-border-radius 50%
      -moz-border-radius 50%
      border-radius 50%
      background url("../../assets/img/F3CB98926ED3625BBD7EAECDACD31AFF.jpg") center no-repeat
      background-size 120%
      margin 20px auto
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
      margin 10px 30px 300px 30px
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
    #abstract
      height 100%
      overflow auto
      min-height: 300px
      .my-tag
        margin 10px 30px
      .new-toggle
        background #a9a58e
        border none
        border-radius 0
        margin-bottom 80px
      .my-notice
        color #a43b01
        display flex
        margin 10px 30px 10px 30px
    .right-content
      position fixed
      left 0
      top 60px
      bottom 0
      transform: translateX(-300px)
      transition: transform 0.5s
      overflow-x hidden
      overflow-y auto
    .right-open
      transform: translateX(0px)
      -o-transition: transform 0.5s
      transition: transform 0.5s
</style>
