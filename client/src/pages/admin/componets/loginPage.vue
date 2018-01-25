<template>
<div class="Log-form-fount">
  <my-form class="Log-form"></my-form>
</div>
</template>

<script>
  import myForm from './plug/form'
	export default {
		name: "login",
    components:{
		  myForm
    },
    mounted(){
		  this.$Notice.config({
        top: 80,
        duration: 3
      });
    }
	}
</script>

<style scoped lang="stylus">
.Log-form-fount
  width: 100%
  height: 100%
  display flex
  justify-content center
  align-items center
  background #ffe3b4
</style>
