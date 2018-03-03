<template>
  <ul id="goTop">

    <li class="goTop-to" v-if="showToTop">
      <a @click.prevent="toTop"><div class="goTop-all top-it"></div></a>
    </li>
    <li class="goTop-wechat">
      <div class="goTop-all wechat"></div>
    </li>
  </ul>
</template>

<script>
	export default {
    name: "goTop",
    data() {
      return {
        showToTop: false
      }
    },
    mounted() {
      window.addEventListener('scroll', () => {
        this.showToTop = (document.documentElement.scrollTop + document.body.scrollTop > 400) ? true : false;
      })
    },
    methods: {
      toTop() {
        document.documentElement.scrollTop = document.body.scrollTop = 0;
        // const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
        // if(requestAnimationFrame){
        //   requestAnimationFrame(this.step)
        // } else {
        //   document.documentElement.scrollTop = document.body.scrollTop = 0;
        // }
      },
      step() {
        if (document.documentElement.scrollTop + document.body.scrollTop > 0) {
          if (document.documentElement.scrollTop) {
            document.documentElement.scrollTop -= 500;
          } else {
            document.body.scrollTop -= 500;
          }
          requestAnimationFrame(this.step)
        } else {
          return;
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
.goTop-all
  width 48px
  height: 48px
  margin-bottom 5px
  border-radius 50%
#goTop
  width: 48px
  .goTop-wechat
    background url("../../assets/svg/wechat.svg")
    background-size 100%
  .top-it
    background url("../../assets/svg/upwards-arrow.svg")
    background-size 100%
</style>
