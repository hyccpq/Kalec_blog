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
		name: "cover-image"
	}
</script>

<style scoped lang="stylus">
.cover
  width: 100%
  height: 300px
  min-height: 200px
  background url("../../assets/img/cover.jpg") no-repeat center
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
    height: 200px
    min-height: 200px

</style>
