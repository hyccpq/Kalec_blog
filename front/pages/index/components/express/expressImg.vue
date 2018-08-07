<template>
  <div class="img">
    <img src="../../assets/img/mmexport1529483379503.jpg" alt="">
    <!--<img src="../../assets/img/IMG_20180619_095657.jpg" alt="">-->
    <i-button size="default" type="success" @click="goToBack()">《 点击此处返回</i-button>
  </div>

</template>

<script>
  import { Button } from 'iview'
  export default {
    name: "expressImg",
    components:{
      iButton: Button
    },
    methods:{
      goToBack(){
        this.$router.push('/express')
      }
    }
  }
</script>

<style scoped lang="stylus">
  .img
    width 100%
    img
      width: 100%
</style>
