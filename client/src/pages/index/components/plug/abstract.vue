<template>
  <div>
    <div id="abstract">
      <!--<div style="width: 300px;height: 50px;"></div>-->
      <div class="my-icon"></div>
      <div class="my-content">
        <div class="some-contents"><Icon size="30" class="content-icon" type="email"></Icon><p>邮箱：hyccpq@hotmail.com</p></div>
        <div class="some-contents"><Icon size="30" class="content-icon" type="social-github"></Icon><p>GITHUB：github.com/hyccpq</p></div>
        <div class="some-contents"><Icon size="30" class="content-icon" type="social-buffer-outline"></Icon><p>掘金：</p></div>
        <div class="some-contents"><Icon size="30" class="content-icon" type="android-cloud"></Icon><p>微博：</p></div>
      </div>
    </div>
    <Affix :offset-top="120" v-if="isShowToggle">
      <article-toggle class="new-toggle"></article-toggle>
    </Affix>
  </div>

</template>

<script>
  import articleToggle from './articleToggle'
	export default {
		name: "abstract",
    components:{
		  articleToggle
    },
    data(){
		  return {
		    isShowToggle:false
      }
    },
    watch:{
		  '$route'(){
        this.isShowToggle = this.$route.params.id  ? true : false;
      }
    },
    mounted(){
		  this.isShowToggle = this.$route.params.id ? true : false;
    }
	}
</script>

<style scoped lang="stylus">
  .new-toggle
    width 300px
    margin-top 100px
    border 1px solid #f0e5e7
    border-radius 5px
  #abstract
    width: 300px
    height: 800px
    background: #a9a58e
    overflow hidden
    .my-icon
      width 240px
      height 240px
      -webkit-border-radius 50%
      -moz-border-radius 50%
      border-radius 50%
      background url("../../assets/img/logo.png") no-repeat center
      margin 50px auto 0
    .my-content
      .some-contents
        height 30px
        display flex
        margin 10px 30px
        line-height 30px
        .content-icon
          width 30px
          height 30px
</style>
