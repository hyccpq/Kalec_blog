<template>
<div>
  <div class="cover">
    <div class="title">
      <h1>Kalec的网络日志</h1>
      <h3>漂浮的灵魂</h3>
    </div>
  </div>
</div>
</template>

<script>
	export default {
		name: "cover-image",
    data(){
		  return {
		    isShowVideo:false
      }
    },
    // mounted(){
		//   let width =  document.documentElement.clientWidth || document.body.clientWidth
    //   if(width > 768){
		//     this.isShowVideo = true;
    //   }
    // }
	}
</script>

<style scoped lang="stylus">
.cover
  width: 100%
  height: 400px
  min-height: 200px
  object-fit fill-opacity
  background url("../../assets/img/cover.jpg") no-repeat center
  background-size auto 100%
  display flex
  align-items center
  justify-content center
  .title
    text-align center
    color white
    h1
      margin 50px 0
    h3
      margin 50px 0
@media screen and (max-width: 1118px)
  .cover
    width: 100%
    height: 160px
    min-height: 110px
    .title
      text-align center
      color #ccd8f8
      h1
        margin 20px 0
        font-size 1.5em
      h3
        margin 20px 0
</style>
