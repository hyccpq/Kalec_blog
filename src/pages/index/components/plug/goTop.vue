<template>
  <ul id="goTop">
    <!--<li class="goTop-wechat">-->
      <!--<div class="goTop-all wechat"></div>-->
    <!--</li>-->
    <transition name="totop-animation">
      <li class="goTop-to" v-if="showToTop">
        <a @click.prevent="toTop"><div class="goTop-all top"></div></a>
      </li>
    </transition>

  </ul>
</template>

<script>
	export default {
		name: "goTop",
    data(){
		  return {
		    showToTop: false
      }
    },
    mounted(){
      window.addEventListener('scroll', () => {
        this.showToTop = (document.documentElement.scrollTop + document.body.scrollTop > 500) ? true : false;
      })
    },
    methods:{
      toTop(){
        document.documentElement.scrollTop = document.body.scrollTop = 0;
      }
    }
	}
</script>

<style scoped lang="stylus">
.totop-animation-enter-active, .totop-animation-leave-active
  transition all .2s
  -webkit-transform: scale(1)
  -moz-transform: scale(1)
  -ms-transform: scale(1)
  -o-transform: scale(1)
  transform: scale(1)
.totop-animation-enter, .totop-animation-leave-to
  -webkit-transform: scale(0)
  -moz-transform: scale(0)
  -ms-transform: scale(0)
  -o-transform: scale(0)
  transform: scale(0)

</style>

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
  .top
    background url("../../assets/svg/upwards-arrow.svg")
    background-size 100%
</style>
