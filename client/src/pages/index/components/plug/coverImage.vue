<template>
<div>
  <video autoplay loop class="cover" v-if="isShowVideo">
    <source src="../../assets/img/12.mp4">
    <div class="title">
      <h1>Kalec的网络日志</h1>
      <h3>漂浮的灵魂1</h3>
    </div>

  </video>
  <div class="cover" v-if="!isShowVideo">

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
    mounted(){
		  let width =  document.documentElement.clientWidth || document.body.clientWidth
      if(width > 768){
		    this.isShowVideo = true;
      }
    }
	}
</script>

<style scoped lang="stylus">
.cover
  width: 100%
  height: 500px
  min-height: 200px
  object-fit fill-opacity
  background url("../../assets/img/17E69EF5-ACFE-4B02-B26F-16A2093A1A3A.png") no-repeat center
  background-size 100%
  display flex
  align-items center
  justify-content center
  .title
    text-align center
    color white
    h1
      margin 5px 0
@media screen and (max-width: 1118px)
  .cover
    width: 100%
    height: 110px
    min-height: 110px

</style>
