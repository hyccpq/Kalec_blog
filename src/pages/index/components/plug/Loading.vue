<template>
  <transition name="bounce">
  <div class="svg-shade" v-if="onLoading">
    <div class="loads-content">
      <div class="preloader">
        <div class="preloader-box">
          <div>L</div>
          <div>O</div>
          <div>A</div>
          <div>D</div>
          <div>I</div>
          <div>N</div>
          <div>G</div>
        </div>
      </div>
    </div>

  </div>
</transition>
</template>

<script>
	export default {
		name: "loading",
    props:{
		  onLoading:{
		    type:Boolean,
        default:false
      }
    },
    data(){
		  return {

      }
    }
	}
</script>

<style scoped lang="stylus">
  /*.bounce-enter-active {*/
    /*-webkit-animation: bounce-in .5s;*/
    /*-o-animation: bounce-in .5s;*/
    /*animation: bounce-in .5s;*/
  /*}*/
  .bounce-leave-active {
    -webkit-animation: bounce-in 1s reverse;
    -o-animation: bounce-in 1s reverse;
    animation: bounce-in 1s reverse;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
      opacity: 0;
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
  .preloader {
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    z-index: 10;
  }

  .preloader > .preloader-box {
    position: absolute;
    width: 345px;
    height: 30px;
    top: 50%;
    left: 50%;
    margin: -15px 0 0 -150px;
    -webkit-perspective: 200px;
  }

  .preloader .preloader-box > div {
    position: relative;
    width: 30px;
    height: 30px;
    background: #CCC;
    float: left;
    text-align: center;
    line-height: 30px;
    font-family: Verdana;
    font-size: 20px;
    color: #FFF;
  }

  .preloader .preloader-box > div:nth-child(1) {
    background: #3366FF;
    margin-right: 15px;
    -webkit-animation: movement 600ms ease 0ms infinite alternate;
  }
  .preloader .preloader-box > div:nth-child(2) {
    background: #3366FF;
    margin-right: 15px;
    -webkit-animation: movement 600ms ease 75ms infinite alternate;
  }
  .preloader .preloader-box > div:nth-child(3) {
    background: #3366FF;
    margin-right: 15px;
    -webkit-animation: movement 600ms ease 150ms infinite alternate;
  }

  .preloader .preloader-box > div:nth-child(4) {
    background: #3366FF;
    margin-right: 15px;
    -webkit-animation: movement 600ms ease 225ms infinite alternate;
  }

  .preloader .preloader-box > div:nth-child(5) {
    background: #3366FF;
    margin-right: 15px;
    -webkit-animation: movement 600ms ease 300ms infinite alternate;
  }

  .preloader .preloader-box > div:nth-child(6) {
    background: #3366FF;
    margin-right: 15px;
    -webkit-animation: movement 600ms ease 375ms infinite alternate;
  }

  .preloader .preloader-box > div:nth-child(7) {
    background: #3366FF;
    margin-right: 15px;
    -webkit-animation: movement 600ms ease 450ms infinite alternate;
  }

  .preloader .preloader-box > div:nth-child(8) {
    background: #3366FF;
    -webkit-animation: movement 600ms ease 525ms infinite alternate;
  }

  @-webkit-keyframes movement {
    from {
      -webkit-transform: scale(1.0) translateY(0px) rotateX(0deg);
      box-shadow: 0 0 0 rgba(0,0,0,0);
    }
    to {
      -webkit-transform: scale(1.5) translateY(-25px) rotateX(45deg);
      box-shadow: 0 25px 40px rgba(0,0,0,0.4);
      background: #3399FF;
    }
  }
</style>

<style scoped lang="stylus">
.svg-shade
  z-index 2000
  width 100%
  height 100%
  position fixed
  left 0
  top 0
  .loads-content
    position fixed
    left 0
    right 0
    top 0
    bottom 0
    margin auto

</style>
