<template>
  <transition name="bounce">
    <div class="svg-shade" v-if="onLoading">
      <div class="loads-content">
        <div class="progress container">
          <span>L</span>
          <span>O</span>
          <span>A</span>
          <span>D</span>
          <span>I</span>
          <span>N</span>
          <span>G</span>
          <span>.</span>
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

  .bounce-leave-active {
    transition: all 1s
  }
  .bounce-leave-to{
    opacity: 0;
  }

  .progress{
    width: 260px
    margin: 0 auto;
  }
  .progress span{
    transition: all 100ms ease;
    background: #4A72DA;
    box-shadow: 10px 20px 30px #434343;
    height: 25px;
    width: 25px;
    display: inline-block;
    border-radius: 50%;
    animation: wave 2s ease  infinite;
    font-size:16px;
    color: #fff;
    line-height: 25px
    text-align: center
  }

  .progress span:nth-child(1){  animation-delay: 0; }
  .progress span:nth-child(2){  animation-delay: 50ms; }
  .progress span:nth-child(3){  animation-delay: 100ms; }
  .progress span:nth-child(4){  animation-delay: 150ms; }
  .progress span:nth-child(5){  animation-delay: 200ms; }
  .progress span:nth-child(6){  animation-delay: 250ms; }
  .progress span:nth-child(7){  animation-delay: 300ms; }
  .progress span:nth-child(8){  animation-delay: 350ms; }

  @keyframes wave{
    0%, 40%, 100% {
      transform: translate(0, 0);
      background-color: #4A72DA;
    }
    10% {
      transform: translate(0, -15px);
      background-color: red;
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
    width: 260px;
    height: 30px;
    margin auto

</style>
