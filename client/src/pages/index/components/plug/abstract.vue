<template>
  <div id="all">
    <div id="abstract">
      <!--<div style="width: 300px;height: 50px;"></div>-->

      <audio :src="src_music" controls></audio>
      <div class="my-icon row"></div>
      <div class="my-name row"><router-link to="/">Kalecgos</router-link></div>
      <div class="my-content row">
        <a href="/" title="微博"><div class="some-contents icon1"></div></a>
        <a href="/" title="GitHub"><div class="some-contents icon2"></div></a>
        <a href="/" title="邮件"><div class="some-contents icon3"></div></a>
        <a href="/" title="Twitter"><div class="some-contents icon4"></div></a>
      </div>
      <div class="my-tag-title row">全部标签</div>
      <ul class="my-tag row">
        <li v-for="item in tagAndClassicList">
            <Tag :tag-name="item.tagName"></Tag>
        </li>
      </ul>
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
        src_music:`http://${location.hostname}:${location.port}/uploads/test.mp3`
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
  .new-toggle
    width 300px
    border 1px solid #f0e5e7
    border-radius 5px
    background white
  #abstract
    width: 300px
    min-height: 700px
    background: #a9a58e
    overflow hidden
    .row
      display flex
    .my-icon
      width 180px
      height 180px
      -webkit-border-radius 50%
      -moz-border-radius 50%
      border-radius 50%
      background #959da5
      margin 20px auto
    .my-name
      justify-content center
      margin 0 auto
      font-size 1.5em
    .my-tag-title
      justify-content center
    .my-tag
      margin 10px 30px 300px 30px
      flex-wrap wrap
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

</style>
