<template>
    <div class="tag">
      <router-link :to="`/tag/${tagName}/1`" class="tag-link">
        <div class="dot"></div>
        <div>{{tagName}}</div>
      </router-link>
    </div>
</template>

<script>
	export default {
		name: "tag",
    props:{
		  tagName:{
		    type:String,
        default:null
      }
    }
	}
</script>

<style scoped lang="stylus">
.tag
  margin 3px
  border 2px solid rgba(30,30,30,0.3)
  border-radius 3px
  .tag-link
    display flex
    flex-wrap nowrap
    .dot
      width: 14px
      height: 14px
      border-radius 50%
      background #2d8cf0
      margin 5px 5px
    div
      padding 5px 5px
</style>
