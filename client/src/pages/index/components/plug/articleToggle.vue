<template>
    <div id="toggle" v-if="hasToggle">
      <p class="toggle-name">文章目录</p>
      <ul class="toggle-cat">
        <li v-for="item in toggle" :class="`toggle-${item.tagName}`"><a :href="item.href">{{item.text}}</a></li>
      </ul>
    </div>
</template>

<script>
  import {mapState} from 'vuex'
	export default {
		name: "article-toggle",
    data(){
		  return {
		    // hasToggle:this.toggle.length!== 0
      }
    },
    computed:{
      ...mapState({
        toggle: state => state.toggle
      }),
      hasToggle(){
        return this.toggle.length !== 0;
      }
    },
  }
</script>

<style scoped lang="stylus">
#toggle
  .toggle-name
    /*text-align center*/
    font-size 1.5em
    color #333333
    padding 10px 20px
    border-bottom 1px solid #f0e5e7
  .toggle-cat
    margin 20px auto
    .toggle-H1
      margin-left 0
    .toggle-H2
      margin-left 20px
    .toggle-H3
      margin-left 40px
    .toggle-H4
      margin-left 60px
    .toggle-H5
      margin-left 80px
    .toggle-H6
      margin-left 100px
</style>
