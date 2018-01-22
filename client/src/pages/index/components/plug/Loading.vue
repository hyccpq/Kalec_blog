<template>
  <transition name="bounce">
  <div class="svg-shade" v-if="onLoading">
    <div class="loads-content">
      <svg width="200px"  height="200px"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="lds-wedges" style="background: none;">
        <g transform="translate(50,50)">
          <g transform="scale(0.96)">
            <g transform="translate(-50,-50)">
              <g transform="rotate(160.002 50 50)">
                <animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="0.75s" begin="0s" repeatCount="indefinite"></animateTransform>
                <path d="M50 50L50 0A50 50 0 0 1 100 50Z" fill-opacity="0.9" fill="#30babd"></path>
              </g>
              <g transform="rotate(30.0016 50 50)">
                <animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform>
                <path d="M50 50L50 0A50 50 0 0 1 100 50Z" transform="rotate(90 50 50)" fill-opacity="0.9" fill="#58bd28"></path>
              </g>
              <g transform="rotate(260.001 50 50)">
                <animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="1.5s" begin="0s" repeatCount="indefinite"></animateTransform>
                <path d="M50 50L50 0A50 50 0 0 1 100 50Z" transform="rotate(180 50 50)" fill-opacity="0.9" fill="#f97f1b"></path>
              </g>
              <g transform="rotate(130.001 50 50)">
                <animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="3s" begin="0s" repeatCount="indefinite"></animateTransform>
                <path d="M50 50L50 0A50 50 0 0 1 100 50Z" transform="rotate(270 50 50)" fill-opacity="0.9" fill="#e53b3b"></path>
              </g>
            </g>
          </g>
        </g>
      </svg>
      <p>加载中...</p>
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

<style scoped>
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
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
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
    width 200px
    height 240px
    position fixed
    left 0
    right 0
    top 0
    bottom 0
    margin auto
    text-align center

</style>
